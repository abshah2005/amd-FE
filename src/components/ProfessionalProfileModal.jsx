import React, { useState, useEffect } from 'react';
import FeedbackSlider from './FeedbackSlider';
import SkeletonProfile from './SkeletonProfile';
import Linkedin from '../icons/linkedin';
import Facebook from '../icons/facebook';
import Instagram from '../icons/instagram';
import Website from '../icons/website';
import Verified from '../icons/verified';
import Star from '../icons/star';
import Back from '../icons/back';


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
  linkedin: 
    <Linkedin />
  ,
  facebook: 
   <Facebook />
  ,
  instagram: <Instagram />,
  website: <Website />,
  verified: <Verified />,
  star: <Star />,
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
    <Back />
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