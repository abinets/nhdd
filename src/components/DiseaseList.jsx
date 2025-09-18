import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { motion } from 'framer-motion';
import { FaChevronRight, FaChevronDown, FaStar, FaRegStar, FaBars, FaTimes, FaHistory } from 'react-icons/fa';

const CSV_FILE_PATH = '/icd11deaseslist.csv';

// Register the Service Worker for offline functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered: ', registration);
      })
      .catch(registrationError => {
        console.log('Service Worker registration failed: ', registrationError);
      });
  });
}

const DiseaseList = () => {
  const [diseases, setDiseases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [expandedBlocks, setExpandedBlocks] = useState({});
  const [favoriteDiseases, setFavoriteDiseases] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);

  useEffect(() => {
    // Load favorites and search history from local storage on initial render
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteDiseases') || '[]');
    setFavoriteDiseases(storedFavorites);

    const storedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(storedHistory);

    Papa.parse(CSV_FILE_PATH, {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data.filter(d => d.Category);
        setDiseases(data);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }, []);

  const toggleFavorite = (diseaseCode) => {
    const isFavorite = favoriteDiseases.includes(diseaseCode);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favoriteDiseases.filter(code => code !== diseaseCode);
    } else {
      updatedFavorites = [...favoriteDiseases, diseaseCode];
    }
    setFavoriteDiseases(updatedFavorites);
    localStorage.setItem('favoriteDiseases', JSON.stringify(updatedFavorites));
  };

  const updateSearchHistory = (term) => {
    if (term.trim() === '') return;
    const updatedHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, 5); // Keep up to 5 items
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const handleSearchChange = (e) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
  };

  const handleSearchHistoryClick = (term) => {
    setSearchTerm(term);
    setShowHistoryDropdown(false);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const groupDiseasesByHierarchy = (data) => {
    const root = {};
    data.forEach(disease => {
      const code = disease.code;
      const blockL1 = disease.BlockL1_Id;
      const blockL2 = disease.BlockL2_Id;

      let currentLevel = root;
      if (blockL1) {
        if (!currentLevel[blockL1]) {
          currentLevel[blockL1] = { children: {}, details: null };
        }
        currentLevel = currentLevel[blockL1].children;
      }

      if (blockL2) {
        if (!currentLevel[blockL2]) {
          currentLevel[blockL2] = { children: {}, details: null };
        }
        currentLevel = currentLevel[blockL2].children;
      }
      
      if (code) {
        const codeParts = code.split(/[\s./]/).filter(Boolean);
        let fullCode = '';

        codeParts.forEach((part, index) => {
          if (index === 0) {
            fullCode = part;
          } else {
            fullCode += `.${part}`;
          }
          if (!currentLevel[fullCode]) {
            currentLevel[fullCode] = { children: {}, details: null };
          }
          if (index === codeParts.length - 1) {
            currentLevel[fullCode].details = disease;
          }
          currentLevel = currentLevel[fullCode].children;
        });
      }
    });
    return root;
  };

  const filteredDiseases = diseases.filter(disease => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesSearch = (
      (disease.Category && disease.Category.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (disease.code && disease.code.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (disease.synonymous && disease.synonymous.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (disease.BlockL1 && disease.BlockL1.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (disease.BlockL2 && disease.BlockL2.toLowerCase().includes(lowerCaseSearchTerm))
    );
    const isFavorite = favoriteDiseases.includes(disease.code);
    
    // Only return favorites if the showFavorites filter is active
    if (showFavorites) {
      return matchesSearch && isFavorite;
    }
    
    return matchesSearch;
  });

  const toggleChapter = (chapterName) => {
    setExpandedChapters(prevState => ({
      ...prevState,
      [chapterName]: !prevState[chapterName]
    }));
  };

  const toggleBlock = (blockName) => {
    setExpandedBlocks(prevState => ({
      ...prevState,
      [blockName]: !prevState[blockName]
    }));
  };

  const renderHierarchicalList = (nodes) => {
    return Object.keys(nodes).sort().map((code) => {
      const node = nodes[code];
      const hasChildren = Object.keys(node.children).length > 0;
      const isExpanded = hasChildren ? expandedBlocks[code] : true;
      const isSelectable = !!node.details;
      const disease = node.details;
      const isFavorite = disease ? favoriteDiseases.includes(disease.code) : false;

      return (
        <motion.div
          key={code}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4"
        >
          <div
            onClick={() => {
              if (hasChildren) {
                toggleBlock(code);
              } else if (isSelectable) {
                setSelectedDisease(disease);
              }
            }}
            className={`flex items-center p-3 rounded-md transition-colors ${
              isSelectable ? 'cursor-pointer hover:bg-gray-100' : ''
            } ${isExpanded && hasChildren ? 'font-bold' : ''}`}
          >
            {hasChildren && (
              <span className="mr-2 text-gray-500">
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
            <div className="flex-1">
              <span className="font-semibold text-blue-900">{code}</span>
              {isSelectable && disease && (
                <span className="ml-2 text-gray-700">{disease.Category}</span>
              )}
            </div>
            {isSelectable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(disease.code);
                }}
                className="ml-2 text-blue-500 hover:text-blue-400 focus:outline-none"
              >
                {isFavorite ? <FaStar /> : <FaRegStar />}
              </button>
            )}
          </div>
          {hasChildren && isExpanded && (
            <div className="border-l border-gray-300">
              {renderHierarchicalList(node.children)}
            </div>
          )}
        </motion.div>
      );
    });
  };

  const renderDiseaseContent = () => {
    const groupedDiseases = filteredDiseases.reduce((acc, current) => {
      const chapter = current['Chapter Name'];
      const blockId = current.BlockL1_Id;
      const blockName = current.BlockL1;
      const block2Id = current.BlockL2_Id;
      const block2Name = current.BlockL2;
      
      if (!acc[chapter]) {
        acc[chapter] = { blocks: {} };
      }
      if (!acc[chapter].blocks[blockId]) {
        acc[chapter].blocks[blockId] = { name: blockName, block2s: {} };
      }
      if (block2Id && block2Id !== blockId) {
        if (!acc[chapter].blocks[blockId].block2s[block2Id]) {
          acc[chapter].blocks[blockId].block2s[block2Id] = { name: block2Name, diseases: [] };
        }
        acc[chapter].blocks[blockId].block2s[block2Id].diseases.push(current);
      } else {
        if (!acc[chapter].blocks[blockId].diseases) {
          acc[chapter].blocks[blockId].diseases = [];
        }
        acc[chapter].blocks[blockId].diseases.push(current);
      }
      return acc;
    }, {});
    
    return (
      <div className="flex-1 max-w-4xl p-4 md:p-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6 relative">
          <div className="relative flex-1 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search by name, code or synonym..."
              className="w-full p-4 pr-20 text-base border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={handleSearchChange}
              onBlur={() => setTimeout(() => setShowHistoryDropdown(false), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateSearchHistory(searchTerm);
                }
              }}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  updateSearchHistory(searchTerm);
                }}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <FaTimes />
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowHistoryDropdown(!showHistoryDropdown);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <FaHistory />
            </motion.button>
            {showHistoryDropdown && searchHistory.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                {searchHistory.map((historyItem, index) => (
                  <button
                    key={index}
                    onMouseDown={() => handleSearchHistoryClick(historyItem)} // Use onMouseDown to prevent blur event
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    {historyItem}
                  </button>
                ))}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onMouseDown={handleClearHistory} // Use onMouseDown to prevent blur event
                    className="w-full text-center text-sm text-red-500 hover:text-red-700 px-4 py-2 transition-colors"
                  >
                    Clear History
                  </button>
                </div>
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFavorites(!showFavorites)}
            className={`flex items-center justify-center p-4 text-sm font-semibold rounded-xl shadow-md transition-colors duration-300 w-full sm:w-auto ${
              showFavorites ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {showFavorites ? <FaStar className="mr-2" /> : <FaRegStar className="mr-2" />}
            {showFavorites ? 'Show All' : 'My Favorites'}
          </motion.button>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {Object.keys(groupedDiseases).sort().map((chapterName, chapterIndex) => {
            const isChapterExpanded = expandedChapters[chapterName];
            return (
              <motion.div
                key={chapterName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: chapterIndex * 0.1 }}
                whileHover={{ y: -5, x: 5, scale: 1.01 }}
                className="my-4 overflow-hidden shadow-md"
              >
                <div
                  onClick={() => toggleChapter(chapterName)}
                  className="flex items-center justify-between p-6 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-gray-600">
                    <span className="mr-2">{chapterIndex + 1}.</span>{chapterName}
                  </h3>
                  <span className="text-gray-800 transition-transform duration-300 transform">
                    {isChapterExpanded ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                </div>
                {isChapterExpanded && (
                  <div className="bg-white">
                    {Object.keys(groupedDiseases[chapterName].blocks).sort().map(blockId => {
                      const block = groupedDiseases[chapterName].blocks[blockId];
                      const isBlockExpanded = expandedBlocks[blockId];
                      return (
                        <div key={blockId}>
                          <div
                            onClick={() => toggleBlock(blockId)}
                            className="flex items-center justify-between p-4 pl-8 bg-gray-100 cursor-pointer hover:bg-gray-200"
                          >
                            <h4 className="text-base font-medium text-gray-800">
                              <span className="font-semibold text-gray-900">{blockId} - </span>
                              {block.name}
                            </h4>
                            <span className="text-gray-600 transition-transform duration-300 transform">
                              {isBlockExpanded ? <FaChevronDown /> : <FaChevronRight />}
                            </span>
                          </div>
                          {isBlockExpanded && (
                            <div className="p-4 pl-12 bg-white">
                              {/* Render BlockL2s or diseases */}
                              {Object.keys(block.block2s).length > 0 ? (
                                Object.keys(block.block2s).sort().map(block2Id => {
                                  const block2 = block.block2s[block2Id];
                                  const isBlock2Expanded = expandedBlocks[block2Id];
                                  return (
                                    <div key={block2Id}>
                                      <div
                                        onClick={() => toggleBlock(block2Id)}
                                        className="flex items-center p-2 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                                      >
                                        <span className="mr-2 text-gray-500">{isBlock2Expanded ? <FaChevronDown /> : <FaChevronRight />}</span>
                                        <div className="flex-1 text-sm text-gray-800">
                                          <span className="font-semibold">{block2Id} - </span>
                                          <span className="ml-1">{block2.name}</span>
                                        </div>
                                      </div>
                                      {isBlock2Expanded && (
                                        <div className="border-l border-gray-300">
                                          {renderHierarchicalList(groupDiseasesByHierarchy(block2.diseases))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })
                              ) : (
                                renderHierarchicalList(groupDiseasesByHierarchy(block.diseases))
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
          {filteredDiseases.length === 0 && (
            <p className="p-4 text-center text-gray-600">
              No results found.
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderDiseaseDetails = () => {
    if (!selectedDisease) return null;
    const isFavorite = favoriteDiseases.includes(selectedDisease.code);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 max-w-4xl p-8 bg-white rounded-3xl shadow-2xl text-left"
      >
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            {selectedDisease.Category}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFavorite(selectedDisease.code)}
              className="ml-4 text-blue-500 hover:text-blue-400 focus:outline-none"
            >
              {isFavorite ? <FaStar size={28} /> : <FaRegStar size={28} />}
            </motion.button>
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            <strong className="font-semibold text-blue-800">Code:</strong> {selectedDisease.code}
          </p>
          {selectedDisease.Defination && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-800">Definition</h3>
              <p className="text-gray-700 leading-relaxed">{selectedDisease.Defination}</p>
            </div>
          )}
          {selectedDisease.synonymous && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-800">Synonyms</h3>
              <p className="text-gray-700">{selectedDisease.synonymous}</p>
            </div>
          )}
          {selectedDisease['synonymous DSM - 5'] && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-800">DSM-5 Synonyms</h3>
              <p className="text-gray-700">{selectedDisease['synonymous DSM - 5']}</p>
            </div>
          )}
          <div className="mt-6 border-t border-gray-200 pt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                <strong className="font-medium">Chapter:</strong> {selectedDisease['Chapter Name']}
              </p>
              <p className="text-sm text-gray-500">
                <strong className="font-medium">Block:</strong> {selectedDisease.BlockL1}
              </p>
            </div>
            <button
              onClick={() => setSelectedDisease(null)}
              className="px-6 py-3 text-gray-700 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition-colors"
            >
              &larr; Back to List
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="diseaseList" className="py-8 bg-gray-50 min-h-screen text-left">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900">
            NHDD App
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Browse and search the NHDD classification.
          </p>
        </motion.div>
        
        {/* Toggle button for mobile sidebar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden flex items-center p-4 mb-4 rounded-xl shadow-md bg-blue-600 text-white w-full justify-center text-lg font-semibold"
        >
          <FaBars className="mr-2" /> Browse Chapters
        </motion.button>

        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Mobile sidebar overlay */}
          {showSidebar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
              onClick={() => setShowSidebar(false)}
            >
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3 }}
                className="w-64 bg-white rounded-r-3xl shadow-lg p-4 h-full overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-bold text-blue-900">Browse Chapters</div>
                  <button onClick={() => setShowSidebar(false)} className="text-gray-500 hover:text-gray-700"><FaTimes size={24} /></button>
                </div>
                {Object.keys(diseases.reduce((acc, d) => {
                  if (!acc[d['Chapter Name']]) acc[d['Chapter Name']] = d;
                  return acc;
                }, {})).sort().map((chapterName, chapterIndex) => (
                  <div key={chapterName}>
                    <div
                      onClick={() => toggleChapter(chapterName)}
                      className="flex items-center p-2 rounded-md transition-colors cursor-pointer hover:bg-gray-100"
                    >
                      <span className="mr-2">{expandedChapters[chapterName] ? <FaChevronDown /> : <FaChevronRight />}</span>
                      <span className="flex-1 text-sm">{chapterIndex + 1}. {chapterName}</span>
                    </div>
                    {expandedChapters[chapterName] && (
                      <div className="ml-4 border-l border-gray-300">
                        {Object.keys(diseases.filter(d => d['Chapter Name'] === chapterName).reduce((acc, d) => {
                          if (!acc[d.BlockL1]) acc[d.BlockL1] = d;
                          return acc;
                        }, {})).sort().map(blockName => (
                          <div
                            key={blockName}
                            onClick={() => {
                              toggleBlock(blockName);
                              document.getElementById(`${blockName.replace(/\s/g, '-')}`).scrollIntoView({ behavior: 'smooth' });
                              setShowSidebar(false); // Close sidebar on selection
                            }}
                            className="flex items-center p-2 rounded-md transition-colors cursor-pointer hover:bg-gray-100"
                          >
                            <span className="mr-2">{expandedBlocks[blockName] ? <FaChevronDown /> : <FaChevronRight />}</span>
                            <span className="flex-1 text-sm">{blockName}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Desktop sidebar */}
          {selectedDisease ? null : (
            <div className="hidden md:block">
              <div className="w-64 bg-white rounded-3xl shadow-xl p-6">
                <div className="text-xl font-bold text-blue-900 mb-4">Browse Chapters</div>
                {Object.keys(diseases.reduce((acc, d) => {
                  if (!acc[d['Chapter Name']]) acc[d['Chapter Name']] = d;
                  return acc;
                }, {})).sort().map((chapterName, chapterIndex) => (
                  <div key={chapterName}>
                    <div
                      onClick={() => toggleChapter(chapterName)}
                      className="flex items-center p-3 rounded-xl transition-colors cursor-pointer hover:bg-gray-100"
                    >
                      <span className="mr-2">{expandedChapters[chapterName] ? <FaChevronDown /> : <FaChevronRight />}</span>
                      <span className="flex-1 font-medium">{chapterIndex + 1}. {chapterName}</span>
                    </div>
                    {expandedChapters[chapterName] && (
                      <div className="ml-4 border-l border-gray-300">
                        {Object.keys(diseases.filter(d => d['Chapter Name'] === chapterName).reduce((acc, d) => {
                          if (!acc[d.BlockL1]) acc[d.BlockL1] = d;
                          return acc;
                        }, {})).sort().map(blockName => (
                          <div
                            key={blockName}
                            onClick={() => {
                              toggleBlock(blockName);
                              document.getElementById(`${blockName.replace(/\s/g, '-')}`).scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="flex items-center p-2 rounded-md transition-colors cursor-pointer hover:bg-gray-100"
                          >
                            <span className="mr-2">{expandedBlocks[blockName] ? <FaChevronDown /> : <FaChevronRight />}</span>
                            <span className="flex-1 text-sm">{blockName}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedDisease ? renderDiseaseDetails() : renderDiseaseContent()}
        </div>
      </div>
    </section>
  );
};

export default DiseaseList;