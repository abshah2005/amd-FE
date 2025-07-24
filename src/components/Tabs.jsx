export const Tabs = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex border-b border-gray-200 mb-4">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
          activeTab === tab
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);