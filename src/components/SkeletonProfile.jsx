import React from 'react';

const SkeletonProfile = () => (
  <div className="fixed inset-0 bg-slate-900/10 z-[1000] flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[900px] max-w-[98vw] max-h-[98vh] overflow-y-auto relative">
      <div className="flex gap-8">
        <div className="w-[260px] flex-shrink-0 flex flex-col items-center">
          <div className="animate-pulse bg-gray-200 rounded-xl w-[120px] h-[150px] mb-2" />
          <div className="animate-pulse bg-gray-200 rounded w-[80px] h-[22px] mb-2" />
          <div className="animate-pulse bg-gray-200 rounded w-[120px] h-[16px] mb-2" />
          <div className="animate-pulse bg-gray-200 rounded w-[100px] h-[16px] mb-2" />
          <div className="animate-pulse bg-gray-200 rounded w-[120px] h-[14px] mb-2" />
          <div className="animate-pulse bg-gray-200 rounded w-full h-[36px] mb-2" />
          <div className="animate-pulse bg-gray-200 rounded w-[100px] h-[20px] mb-2" />
          <div className="animate-pulse bg-gray-200 rounded w-[120px] h-[18px] mb-2" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="animate-pulse bg-gray-200 rounded-xl w-full h-[80px] mb-4" />
          <div className="animate-pulse bg-gray-200 rounded-xl w-full h-[80px] mb-4" />
          <div className="animate-pulse bg-gray-200 rounded-xl w-full h-[80px] mb-4" />
          <div className="animate-pulse bg-gray-200 rounded-xl w-full h-[80px] mb-4" />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonProfile;