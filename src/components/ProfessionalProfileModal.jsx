import React, { useState, useEffect } from 'react';
import FeedbackSlider from './FeedbackSlider';
import SkeletonProfile from './SkeletonProfile';

const dummyData = {
  id: 1,
  name: 'Alex Hales',
  title: 'Startup Legal Advisor, Career Coach',
  featured: true,
  associated: 'associated with Oxford',
  priceRangeLow: 20,
  priceRangeHigh:69,
  currency:'$',
  perQuestion: 'per question',
  rating: 4.2,
  ratingCount: 12,
  languages: ['English', 'Spanish', 'Chinese'],
  country: 'Spain',
  profilePicture: 'https://randomuser.me/api/portraits/men/23.jpg',
  verified: true,
  socialLinks: [
    { type: 'linkedin', url: '#' },
    { type: 'facebook', url: '#' },
    { type: 'instagram', url: '#' },
    { type: 'website', url: '#' },
  ],
  about: [
    'How should I structure my consulting agreement to protect my IP?',
    'How should I structure my consulting agreement to protect my IP?',
    'How should I structure my consulting agreement to protect my IP?',
    'How should I structure my consulting agreement to protect my IP?',
    'How should I structure my consulting agreement to protect my IP?',
  ],
  experience: [
    'How should I structure my consulting agreement to protect my IP?',
    'How should I structure my consulting agreement to protect my IP?',
    'How should I structure my consulting agreement to protect my IP?',
    'How should I structure my consulting agreement to protect my IP?',
  ],
  expertise: Array(12).fill('Business'),
  exampleQuestions: [
    'How should I structure my consulting agreement to protect my IP?',
    'How should I structure my consulting agreement to protect my IP?',
    'How should I structure my consulting agreement to protect my IP?',
    'How should I structure my consulting agreement to protect my IP?',
    'How should I structure my consulting agreement to protect my IP?',
  ],
  deliveryTime: 'Less than 7 days',
  feedback: [
    {
      name: 'John Doe',
      date: '2025/02/01',
      rating: 4.0,
      text: 'The answer is insightful and well-explained. It gave me the clarity I needed to move forward. A bit more detail on the legal implications would’ve made it perfect. Still, really helpful overall!',
    },
    {
      name: 'John shah',
      date: '2025/02/01',
      rating: 4.0,
      text: 'The answer is insightful and well-explained. It gave me the clarity I needed to move forward. A bit more detail on the legal implications would’ve made it perfect. Still, really helpful overall!',
    },
    {
      name: 'John Doe',
      date: '2025/02/01',
      rating: 4.5,
      text: 'The answer is insightful and well-explained. It gave me the clarity I needed to move forward. A bit more detail on the legal implications would’ve made it perfect. Still, really helpful overall!',
    },
  ],
};

const iconMap = {
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M15 0C15.7956 0 16.5587 0.316071 17.1213 0.87868C17.6839 1.44129 18 2.20435 18 3V15C18 15.7956 17.6839 16.5587 17.1213 17.1213C16.5587 17.6839 15.7956 18 15 18H3C2.20435 18 1.44129 17.6839 0.87868 17.1213C0.316071 16.5587 0 15.7956 0 15V3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H15ZM15 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V15C2 15.2652 2.10536 15.5196 2.29289 15.7071C2.48043 15.8946 2.73478 16 3 16H15C15.2652 16 15.5196 15.8946 15.7071 15.7071C15.8946 15.5196 16 15.2652 16 15V3C16 2.73478 15.8946 2.48043 15.7071 2.29289C15.5196 2.10536 15.2652 2 15 2ZM5 7C5.24493 7.00003 5.48134 7.08996 5.66437 7.25272C5.84741 7.41547 5.96434 7.63975 5.993 7.883L6 8V13C5.99972 13.2549 5.90212 13.5 5.72715 13.6854C5.55218 13.8707 5.31305 13.9822 5.05861 13.9972C4.80416 14.0121 4.55362 13.9293 4.35817 13.7657C4.16271 13.6021 4.0371 13.3701 4.007 13.117L4 13V8C4 7.73478 4.10536 7.48043 4.29289 7.29289C4.48043 7.10536 4.73478 7 5 7ZM8 6C8.23419 5.99996 8.46097 6.08213 8.6408 6.23216C8.82062 6.3822 8.94208 6.59059 8.984 6.821C9.18523 6.70431 9.39327 6.59979 9.607 6.508C10.274 6.223 11.273 6.066 12.175 6.349C12.648 6.499 13.123 6.779 13.475 7.256C13.79 7.681 13.96 8.198 13.994 8.779L14 9V13C13.9997 13.2549 13.9021 13.5 13.7272 13.6854C13.5522 13.8707 13.313 13.9822 13.0586 13.9972C12.8042 14.0121 12.5536 13.9293 12.3582 13.7657C12.1627 13.6021 12.0371 13.3701 12.007 13.117L12 13V9C12 8.67 11.92 8.516 11.868 8.445C11.7934 8.35215 11.6905 8.28615 11.575 8.257C11.227 8.147 10.726 8.205 10.393 8.347C9.893 8.561 9.435 8.897 9.123 9.208L9 9.34V13C8.99972 13.2549 8.90212 13.5 8.72715 13.6854C8.55218 13.8707 8.31305 13.9822 8.05861 13.9972C7.80416 14.0121 7.55362 13.9293 7.35817 13.7657C7.16271 13.6021 7.0371 13.3701 7.007 13.117L7 13V7C7 6.73478 7.10536 6.48043 7.29289 6.29289C7.48043 6.10536 7.73478 6 8 6ZM5 4C5.26522 4 5.51957 4.10536 5.70711 4.29289C5.89464 4.48043 6 4.73478 6 5C6 5.26522 5.89464 5.51957 5.70711 5.70711C5.51957 5.89464 5.26522 6 5 6C4.73478 6 4.48043 5.89464 4.29289 5.70711C4.10536 5.51957 4 5.26522 4 5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4Z" fill="#09244B"/>
</svg>
  ),
  facebook: (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_502_8623)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4.00014 10.4605 4.44451 8.95364 5.27979 7.66038C6.11506 6.36712 7.30576 5.34234 8.70901 4.70901C10.1123 4.07568 11.6684 3.8607 13.1908 4.08987C14.7132 4.31904 16.1372 4.98262 17.2918 6.00099C18.4464 7.01936 19.2826 8.34926 19.7002 9.83111C20.1177 11.313 20.0988 12.8838 19.6457 14.3552C19.1926 15.8265 18.3246 17.1359 17.1458 18.1262C15.967 19.1165 14.5275 19.7456 13 19.938V14H15C15.2652 14 15.5196 13.8946 15.7071 13.7071C15.8946 13.5196 16 13.2652 16 13C16 12.7348 15.8946 12.4804 15.7071 12.2929C15.5196 12.1054 15.2652 12 15 12H13V10C13 9.73478 13.1054 9.48043 13.2929 9.29289C13.4804 9.10536 13.7348 9 14 9H14.5C14.7652 9 15.0196 8.89464 15.2071 8.70711C15.3946 8.51957 15.5 8.26522 15.5 8C15.5 7.73478 15.3946 7.48043 15.2071 7.29289C15.0196 7.10536 14.7652 7 14.5 7H14C13.2044 7 12.4413 7.31607 11.8787 7.87868C11.3161 8.44129 11 9.20435 11 10V12H9C8.73478 12 8.48043 12.1054 8.29289 12.2929C8.10536 12.4804 8 12.7348 8 13C8 13.2652 8.10536 13.5196 8.29289 13.7071C8.48043 13.8946 8.73478 14 9 14H11V19.938C9.0667 19.6942 7.28882 18.7533 6 17.2917C4.71119 15.8302 4.00003 13.9486 4 12ZM12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" fill="#09244B"/>
  </g>
  <defs>
    <clipPath id="clip0_502_8623">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_502_8627)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 3C17.3261 3 18.5979 3.52678 19.5355 4.46447C20.4732 5.40215 21 6.67392 21 8V16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21H8C6.67392 21 5.40215 20.4732 4.46447 19.5355C3.52678 18.5979 3 17.3261 3 16V8C3 6.67392 3.52678 5.40215 4.46447 4.46447C5.40215 3.52678 6.67392 3 8 3H16ZM16 5H8C7.20435 5 6.44129 5.31607 5.87868 5.87868C5.31607 6.44129 5 7.20435 5 8V16C5 16.7956 5.31607 17.5587 5.87868 18.1213C6.44129 18.6839 7.20435 19 8 19H16C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7956 19 16V8C19 7.20435 18.6839 6.44129 18.1213 5.87868C17.5587 5.31607 16.7956 5 16 5ZM12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8ZM12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10ZM16.5 6.5C16.7652 6.5 17.0196 6.60536 17.2071 6.79289C17.3946 6.98043 17.5 7.23478 17.5 7.5C17.5 7.76522 17.3946 8.01957 17.2071 8.20711C17.0196 8.39464 16.7652 8.5 16.5 8.5C16.2348 8.5 15.9804 8.39464 15.7929 8.20711C15.6054 8.01957 15.5 7.76522 15.5 7.5C15.5 7.23478 15.6054 6.98043 15.7929 6.79289C15.9804 6.60536 16.2348 6.5 16.5 6.5Z" fill="#09244B"/>
  </g>
  <defs>
    <clipPath id="clip0_502_8627">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
  ),
  website: (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_502_8631)">
    <path d="M11 6C11.2652 6 11.5196 6.10536 11.7071 6.29289C11.8946 6.48043 12 6.73478 12 7C12 7.26522 11.8946 7.51957 11.7071 7.70711C11.5196 7.89464 11.2652 8 11 8H5V19H16V13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11ZM20 3C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V9C21 9.26522 20.8946 9.51957 20.7071 9.70711C20.5196 9.89464 20.2652 10 20 10C19.7348 10 19.4804 9.89464 19.2929 9.70711C19.1054 9.51957 19 9.26522 19 9V6.414L10.707 14.707C10.5184 14.8892 10.2658 14.99 10.0036 14.9877C9.7414 14.9854 9.49059 14.8802 9.30518 14.6948C9.11977 14.5094 9.0146 14.2586 9.01233 13.9964C9.01005 13.7342 9.11084 13.4816 9.293 13.293L17.586 5H15C14.7348 5 14.4804 4.89464 14.2929 4.70711C14.1054 4.51957 14 4.26522 14 4C14 3.73478 14.1054 3.48043 14.2929 3.29289C14.4804 3.10536 14.7348 3 15 3H20Z" fill="#09244B"/>
  </g>
  <defs>
    <clipPath id="clip0_502_8631">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
  ),
  verified: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0202 11.67 21.94C7.5 20.5 4 18 4 13V5.99996C4 5.73474 4.10536 5.48039 4.29289 5.29285C4.48043 5.10532 4.73478 4.99996 5 4.99996C7 4.99996 9.5 3.79996 11.24 2.27996C11.4519 2.09896 11.7214 1.99951 12 1.99951C12.2786 1.99951 12.5481 2.09896 12.76 2.27996C14.51 3.80996 17 4.99996 19 4.99996C19.2652 4.99996 19.5196 5.10532 19.7071 5.29285C19.8946 5.48039 20 5.73474 20 5.99996V13Z" stroke="#36B37E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 12L11 14L15 10" stroke="#36B37E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  star: (
   <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
  <path d="M7.77999 1.9118C7.85335 1.78591 7.95845 1.68145 8.08478 1.60885C8.21112 1.53625 8.35428 1.49805 8.49999 1.49805C8.6457 1.49805 8.78886 1.53625 8.9152 1.60885C9.04153 1.68145 9.14663 1.78591 9.21999 1.9118L11.0833 5.11047L14.702 5.89447C14.8443 5.9254 14.9761 5.9931 15.0841 6.09083C15.1921 6.18855 15.2726 6.31288 15.3176 6.45142C15.3626 6.58996 15.3705 6.73788 15.3405 6.88042C15.3105 7.02296 15.2437 7.15515 15.1467 7.2638L12.68 10.0245L13.0533 13.7078C13.0681 13.8528 13.0445 13.9992 12.9849 14.1323C12.9254 14.2654 12.832 14.3805 12.7141 14.4662C12.5961 14.5519 12.4578 14.6051 12.3128 14.6206C12.1679 14.6361 12.0214 14.6133 11.888 14.5545L8.49999 13.0611L5.11199 14.5545C4.9786 14.6133 4.83212 14.6361 4.68716 14.6206C4.5422 14.6051 4.40385 14.5519 4.2859 14.4662C4.16796 14.3805 4.07457 14.2654 4.01504 14.1323C3.95551 13.9992 3.93193 13.8528 3.94666 13.7078L4.31999 10.0245L1.85332 7.26447C1.75614 7.15582 1.68916 7.02358 1.65907 6.88095C1.62897 6.73832 1.63682 6.59029 1.68182 6.45164C1.72682 6.31299 1.80741 6.18857 1.91553 6.0908C2.02365 5.99303 2.15553 5.92534 2.29799 5.89447L5.91666 5.11047L7.77999 1.9118Z" fill="#FFD700"/>
</svg>
  ),
};

const ProfessionalProfileModal = ({ professionalId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [professional, setProfessional] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProfessional(dummyData);
      setLoading(false);
    }, 200);
  }, [professionalId]);

  if (loading) return <SkeletonProfile />;

  return (
    <div className="fixed inset-0 bg-slate-900/10 z-[1000] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[900px] max-w-[98vw] max-h-[98vh] overflow-y-auto relative">
        <div className=' mb-4'>
<button
          className=" left-6 top-6 text-blue-600 font-medium text-base "
          onClick={onClose}
        >
            <div className='flex items-center text-[#4D5B70]'>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clip-path="url(#clip0_502_8577)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.91083 10.5893C6.7546 10.433 6.66684 10.2211 6.66684 10.0001C6.66684 9.77915 6.7546 9.56723 6.91083 9.41096L11.625 4.69679C11.7019 4.6172 11.7938 4.55371 11.8955 4.51004C11.9972 4.46636 12.1065 4.44338 12.2172 4.44241C12.3278 4.44145 12.4375 4.46254 12.54 4.50444C12.6424 4.54634 12.7354 4.60822 12.8137 4.68646C12.8919 4.7647 12.9538 4.85775 12.9957 4.96016C13.0376 5.06257 13.0587 5.17231 13.0577 5.28296C13.0567 5.39361 13.0338 5.50296 12.9901 5.60463C12.9464 5.7063 12.8829 5.79825 12.8033 5.87512L8.67833 10.0001L12.8033 14.1251C12.9551 14.2823 13.0391 14.4928 13.0372 14.7113C13.0353 14.9298 12.9477 15.1388 12.7932 15.2933C12.6387 15.4478 12.4297 15.5355 12.2112 15.5374C11.9927 15.5393 11.7822 15.4553 11.625 15.3035L6.91083 10.5893Z" fill="#4D5B70"/>
  </g>
  <defs>
    <clipPath id="clip0_502_8577">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>
<span>Back</span>
            </div>
          
        </button>
        </div>
        
        <div className="flex gap-8">
          {/* Left */}
          <div className="w-[260px] flex-shrink-0 flex flex-col items-center">
            <div className="relative mb-2">
              <img
                className="w-[120px] h-[150px] object-cover rounded-xl border-4 border-yellow-400 bg-gray-100"
                src={professional.profilePicture}
                alt={professional.name}
              />
              {professional.featured && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded text-black border-4 border-yellow-400">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-semibold text-slate-900">{professional.name}</span>
              {professional.verified && (
                <span className="flex items-center">{iconMap.verified}</span>
              )}
            </div>
            <div className="text-sm text-slate-700 mb-1 text-center">
              {professional.title} <span className="text-slate-500">• {professional.associated}</span>
            </div>
            <div className="flex gap-3 items-center mb-1 text-sm">
              <span className="text-blue-600 font-semibold">{professional.currency}{professional.priceRangeLow} - {professional.currency}{professional.priceRangeHigh}</span>
              <span className="text-slate-500">{professional.perQuestion}</span>
              <span className="flex items-center gap-1 text-yellow-500 font-medium">
                {iconMap.star} {professional.rating}
                <span className="text-slate-500 ml-1">({professional.ratingCount})</span>
              </span>
            </div>
            <div className="text-xs text-slate-500 mb-2 text-center">
              {professional.languages.join(', ')} <span className="text-slate-500">• {professional.country}</span>
            </div>
            <button className="w-full bg-blue-600 text-white font-medium text-[15px] rounded-lg py-2 mt-2 mb-2">
              Ask a question
            </button>
            <div className="w-full mb-3">
              <span className="text-xs text-slate-500 block mb-1">Social Links</span>
              <div className="flex  items-center justify-between gap-6">
                {professional.socialLinks.map(link => (
                  <a key={link.type} href={link.url} target="_blank" rel="noopener noreferrer">{iconMap[link.type]}</a>
                ))}
              </div>
            </div>
            <div className="mt-2 text-xs  px-4 py-1 self-start mb-2 flex-grow"></div>
  <div className="text-xs text-slate-500 bg-gray-100 rounded-xl px-4 py-1 self-start mb-2 mt-auto">
    Delivery Time: {professional.deliveryTime}
  </div>
          </div>
          {/* Right */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-xl mb-4 p-4">
              <div className="font-semibold text-base text-slate-900 mb-2">About</div>
              <ul className="list-disc pl-5 text-sm text-slate-700">
                {professional.about.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl mb-4 p-4">
              <div className="font-semibold text-base text-slate-900 mb-2">Professional Experience</div>
              <ul className="list-disc pl-5 text-sm text-slate-700">
                {professional.experience.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
            <FeedbackSlider feedback={professional.feedback} />
            <div className="bg-white border border-gray-200 rounded-xl mb-4 p-4">
              <div className="font-semibold text-base text-slate-900 mb-2">Expertise</div>
              <div className="flex flex-wrap gap-2">
                {professional.expertise.map((tag, idx) => (
                  <span key={idx} className="bg-blue-50 border border-blue-600 text-blue-700 rounded-lg px-3 py-1 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl mb-4 p-4">
              <div className="font-semibold text-base text-slate-900 mb-2">Example Questions</div>
              <ul className="list-disc pl-5 text-sm text-slate-700">
                {professional.exampleQuestions.map((q, idx) => <li key={idx}>{q}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfileModal;