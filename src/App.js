import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa'; // استيراد الأيقونة
import './App.css'; // تأكد من تضمين Tailwind CSS

const App = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [displayedName, setDisplayedName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isNameTyping, setIsNameTyping] = useState(false);
  
  const arabicText = `يشرفا حضوركم الكريم في حفل زفاف عائلة محرم وعائلة عمر

المكان: قاعة وادي القمر، بجوار الجوازات، منوف - المنوفية
`;

  const englishText = `We are honored by your presence at the wedding ceremony of the Moharam and Omar families.

Venue: Zadi Al-Qamar Hall, next to the Passport Office, Monufia - Monuf
`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);
      startTypingEffect();
      startNameTypingEffect();
    }
  };

  const startTypingEffect = () => {
    setIsTyping(true);
    let index = 0;
    const fullText = isArabic() ? arabicText : englishText;

    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 100);
  };

  const startNameTypingEffect = () => {
    setDisplayedName('');
    setIsNameTyping(true);
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < name.length) {
        setDisplayedName((prev) => prev + name[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsNameTyping(false);
      }
    }, 200);
  };

  const isArabic = () => {
    return /^[\u0600-\u06FF\s]+$/.test(name);
  };

  const bookAnimation = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 1, type: "spring", stiffness: 50 } 
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-11/12 max-w-lg transition-transform transform hover:scale-105 laser-effect">
          <h1 className="text-3xl font-bold text-center mb-4 text-black">نتشرف بيك</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اكتب اسمك"
            className="border border-gray-300 p-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <button type="submit" className="bg-black text-white p-2 rounded-md w-full hover:bg-gray-800 transition">
            أرسل
          </button>
        </form>
      ) : (
        <motion.div 
          className="bg-white p-10 rounded-lg shadow-lg w-full h-screen absolute top-0 left-0 flex flex-col items-center justify-center relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={bookAnimation}
        >
          <img
            src="https://egyplans.com/wp-content/uploads/2021/10/%D9%83%D8%B1%D9%88%D8%AA-%D8%B2%D9%88%D8%A7%D8%AC-%D8%AC%D8%A7%D9%87%D8%B2%D8%A9-%D9%84%D9%84%D8%AA%D8%B9%D8%AF%D9%8A%D9%84-1.jpg.webp"
            alt="Wedding Background"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold text-purple-700 mb-2">{isArabic() ? 'دعوة زفاف' : 'Wedding Invitation'}</h1>
            <p className="text-lg text-center text-gray-800 mb-4">{displayedText || (isTyping ? '...' : '')}</p>
            <div className="flex justify-between mb-4 w-full px-16">
              <p className="text-2xl text-purple-600">{isArabic() ? 'عبدالله' : 'Abdullah'}</p>
              <p className="text-2xl text-purple-600">{isArabic() ? 'أسماء' : 'Asma'}</p>
            </div>
            <p className="text-lg text-center text-gray-600 mb-4">{isArabic() ? 'يوم الحفل: 6/11/2024' : 'Date of Ceremony: 6/11/2024'}</p>
            <p className="text-lg text-center text-gray-600 mb-4">{isArabic() ? 'المكان: قاعة وادي القمر، بجوار الجوازات، المنوفية - منوف' : 'Venue: Zadi Al-Qamar Hall, next to the Passport Office, Monufia - Monuf'}</p>

            {/* زر لفتح موقع القاعة على Google Maps */}
            <a 
  href="https://www.google.com/maps/place/%D9%82%D8%A7%D8%B9%D8%A9+%D9%88%D8%A7%D8%AF%D9%8A+%D8%A7%D9%84%D9%82%D9%85%D8%B1%E2%80%AD/@30.4591223,30.9389894,143m/data=!3m1!1e3!4m6!3m5!1s0x14587f53b0275eef:0x222382c21a887d19!8m2!3d30.4591816!4d30.9390017!16s%2Fg%2F11llbcvw0b?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-purple-700 transition"
>
  <FaMapMarkerAlt className="mr-2" /> {/* الأيقونة */}
  <span>{isArabic() ? 'عرض الموقع' : 'View Location'}</span>
</a>


            <p className="mt-4 text-lg text-gray-600">{isArabic() ? 'الاستاز: ' : 'Mr: '} <strong>{name}</strong></p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App;
