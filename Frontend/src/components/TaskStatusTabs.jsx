import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 mb-6">
      {tabs.map((tab, idx) => (
        <button
          key={idx}
          onClick={() => setActiveTab(tab.label)}
          className={`px-4 py-2 text-sm font-medium rounded-t-md transition ${
            activeTab === tab.label
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          {tab.label}{" "}
          <span className="ml-1 text-xs text-gray-500">({tab.count})</span>
        </button>
      ))}
    </div>
  );
};

export default TaskStatusTabs;
