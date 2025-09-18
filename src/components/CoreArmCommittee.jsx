import React from 'react';
import { motion } from 'framer-motion';

const directImageUrls = [
  'https://media.licdn.com/dms/image/v2/D5603AQFry9LVPYT8KA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1701350707711?e=2147483647&v=beta&t=XQiYA8t55JhgA2rpAAaw14rN4f8ZOCZQ-CI0X6WPq1o',
'https://www.moh.gov.et/sites/default/files/2021-09/photo_2021-09-28_11-44-04.jpg',
  'https://media.licdn.com/dms/image/v2/D4E03AQEQJW8iKxSRFg/profile-displayphoto-scale_200_200/B4EZjxRDBTGcAc-/0/1756394435992?e=2147483647&v=beta&t=fIKJGI0Ds_e7lZYFF33uzbFcRP56lszxkq-E6fKj59w',
  'https://www.moh.gov.et/sites/default/files/2021-06/0B1A9978%20-%20Copy.JPG',
'https://www.moh.gov.et/sites/default/files/2024-10/Dr.%20Muluken%20Argaw.jpg',
'https://www.moh.gov.et/sites/default/files/2021-06/0B1A9957%20-%20Copy.JPG',
'https://www.moh.gov.et/sites/default/files/2024-03/yehenew.jpg',
'https://www.moh.gov.et/sites/default/files/2024-03/photo_2023-07-03_10-10-26.jpg',
'https://media.licdn.com/dms/image/v2/D4D03AQHpC8c9j4GPmg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1695112592329?e=1761177600&v=beta&t=ueoy3mdVR-bM7YwhSg8MYDsBv-Ok4SO25FPbsDQCq0g',
'https://media.licdn.com/dms/image/v2/D4E03AQE0w3qavweVwQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1695479892595?e=1761177600&v=beta&t=Sy-8kYmiNLphMQhNsNN-wjLttA9BBxXWK_DM3dLrS0g',
'https://media.licdn.com/dms/image/v2/D4D03AQGfa467VdvrRg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720374018409?e=1761177600&v=beta&t=FSJujiJMWjBybdVZCePuIOKlKtV1HoU5e1GL8891J5Y',
];

const committeeMembers = [
  { 
    name: 'Dr. Mebrhatu M.', 
    position: 'Chief of Staff',
    department: 'Ministry of Health',
    role: 'Provides strategic leadership and oversight for all ministerial initiatives, ensuring alignment with national health goals.',
    imageUrl: directImageUrls[0]
  }, 
  { 
    name: 'Dr. Muluken Balcha', 
    position: 'CEO',
    department: 'Strategic Affairs/SAO',
    role: 'Leads the strategic planning and execution of key health programs and partnerships.',
    imageUrl: directImageUrls[4]
  },
  { 
    name: 'Dr. Tegene Assefa', 
    position: 'CEO',
    department: 'Public Relations - MoH',
    role: 'Manages public communication and media relations to enhance public health awareness and transparency.',
    imageUrl: directImageUrls[1]
  },
  { 
    name: 'Mr. Solomon Ejigu', 
    position: 'LEO',
    department: 'Health Finance System  - MoH',
    role: 'Oversees the financial management and investment in health systems to ensure sustainable funding.',
    imageUrl: directImageUrls[5]
  },
   { 
    name: 'Mr. Eskinder Lakew', 
    position: 'CEO',
    department: 'Basic Service Executive - MoH',
    role: 'Directs the implementation and expansion of essential health services across the country.',
    imageUrl: directImageUrls[3]
  },
    { 
    name: 'Mr. Gemechis Melkamu', 
    position: 'LEO',
    department: 'Digital Health - MoH',
    role: 'Leads the development and integration of digital health solutions to modernize healthcare delivery.',
    imageUrl: directImageUrls[2]
  },
 { 
    name: 'Mr. Yehenew Berhane', 
    position: 'CEO',
    department: 'Procurement Executive. - MoH',
    role: 'Manages the procurement and supply chain for medical equipment, pharmaceuticals, and other essential goods.',
    imageUrl: directImageUrls[6]
  },
  { 
    name: 'Mrs. Rahima Skihur', 
    position: 'Senior Advisor',
    department: 'Misinters\' Office - MoH',
    role: 'Provides expert counsel on key policy decisions and strategic initiatives for the Minister\'s Office.',
    imageUrl: directImageUrls[8]
  },
   { 
    name: 'Mr. Mesoud Mohammed ', 
    position: 'Lead',
    department: 'Strategic Affairs - MoH',
    role: 'Manages critical projects within the Strategic Affairs Office, ensuring goals are met efficiently.',
    imageUrl: directImageUrls[9]
  },
   { 
    name: 'Mr. Assegid Samuel', 
    position: 'LEO',
    department: 'Human Resource Development - MoH',
    role: 'Focuses on building the capacity and skills of the health workforce through training and development programs.',
    imageUrl: directImageUrls[10]
  },
  
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const eachChildVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10, duration: 0.6 } },
};

const CoreArmCommittee = () => {
  return (
    <section id="core-arm-committee" className="py-20 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center min-h-screen relative overflow-hidden" style={{ scrollMarginTop: '80px' }}>
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-pink-200 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900 mb-6 tracking-tight leading-tight">
            Meet the Core ARM Committee
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A distinguished group of leaders and experts, passionately dedicated to steering the ARM Initiative towards its vision. Their combined strategic insight and deep expertise ensure impactful progress.
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {committeeMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105
                         border border-transparent hover:border-blue-300
                         p-8 flex flex-col items-center justify-center
                         bg-gradient-to-br from-white to-gray-50
                         relative overflow-hidden"
              variants={eachChildVariants}
            >
              <div className="absolute inset-0 bg-blue-50 opacity-0 hover:opacity-70 transition-opacity duration-300"></div>

              {/* Enhanced Image Container with 3D effect */}
              <div className="w-36 h-36 rounded-full overflow-hidden mb-6 border-[6px] border-blue-400 shadow-xl transform hover:rotate-0 transition-transform duration-300">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Name with Gradient */}
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-800 mb-1 relative z-10">{member.name}</h3>
              
              {/* Position and Department with Separator */}
              <p className="text-xl font-semibold relative z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">{member.position}</span>
                <span className="text-gray-400 font-normal mx-2">|</span>
                <span className="text-gray-600 font-normal">{member.department}</span>
              </p>
              
              <p className="text-base text-gray-500 mt-4 text-center relative z-10 max-w-xs">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreArmCommittee;