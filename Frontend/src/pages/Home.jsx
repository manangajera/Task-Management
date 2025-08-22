import React from 'react';

const ProjectCard = ({ className = "", withConnectors = false }) => (
  <div className="relative">
    {withConnectors && (
      <>
        {/* Bottom connection dot */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-900"></div>
        {/* Top connection dot */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-900"></div>
      </>
    )}
    <div className={`bg-white rounded-xl shadow-lg border p-6 w-[800px] ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Pending</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">Medium Priority</span>
        </div>
        <div className="flex items-center">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full border-2 border-white shadow-sm"></div>
            <div className="w-7 h-7 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white shadow-sm"></div>
            <div className="w-7 h-7 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <span className="ml-2 text-xs text-gray-600 font-medium">+2</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-gray-800">Social Media Campaign</h3>
      
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        Develop a content plan for the upcoming product launch. Create visually appealing designs with 
        engaging captions. Schedule posts strategically to maximize audience engagement.
      </p>
      
      <div className="mb-5">
        <div className="text-xs text-gray-500 mb-2 font-medium">Task Done 4 / 10</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full shadow-sm" style={{ width: '40%' }}></div>
        </div>
      </div>
      
      <div className="flex justify-between text-sm">
        <div>
          <div className="text-gray-500 mb-1 font-medium">Start Date</div>
          <div className="font-semibold text-gray-800">16th Mar 2025</div>
        </div>
        <div className="text-right">
          <div className="text-gray-500 mb-1 font-medium">Due Date</div>
          <div className="font-semibold text-gray-800">21th Mar 2025</div>
        </div>
      </div>
    </div>
  </div>
);

const PersonCard = ({ name, email, avatar, className = "", withConnector = false }) => (
  <div className="relative">
    {withConnector && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-900"></div>
    )}
    <div className={`bg-white rounded-xl shadow-lg border p-5 flex items-center gap-4 w-80 hover:shadow-xl transition-shadow ${className}`}>
      <div className={`w-12 h-12 rounded-full ${avatar} shadow-md flex items-center justify-center`}>
        <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full"></div>
      </div>
      <div>
        <div className="font-semibold text-base text-gray-800">{name}</div>
        <div className="text-sm text-gray-600">{email}</div>
      </div>
    </div>
  </div>
);

const DashedLine = ({ className = "", withDots = false }) => (
  <div className={`border-dashed border-2 border-gray-400 relative ${className}`}>
    {withDots && (
      <>
        <div className="absolute -top-1.5 left-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-900"></div>
        <div className="absolute -top-1.5 right-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-900"></div>
      </>
    )}
  </div>
);

const ConnectorDot = ({ className = "" }) => (
  <div className={`w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-900 ${className}`}></div>
);

export default function ProjectManagementUI() {
  return (
    <div className="bg-transparent p-12">
      {/* First Layout - Hierarchical */}
      <div className="mb-20">
        <div className="flex flex-col items-center">
          <ProjectCard withConnectors={true} />
          
          {/* Vertical line down */}
          <DashedLine className="w-0 h-16" />
          
          {/* Horizontal connector with junction */}
          <div className="relative">
            <DashedLine className="w-80 h-0" withDots={true} />
            <ConnectorDot className="absolute -top-1.5 left-1/2 transform -translate-x-1/2" />
          </div>
          
          {/* Vertical lines to person cards */}
          <div className="flex justify-between w-80">
            <DashedLine className="w-0 h-16" />
            <DashedLine className="w-0 h-16" />
          </div>
          
          {/* Person cards */}
          <div className="flex gap-20">
            <PersonCard 
              name="Adam Cole"
              email="adam@timetoproaram.com"
              avatar="bg-gradient-to-r from-yellow-400 to-orange-500"
              withConnector={true}
            />
            <PersonCard 
              name="Luke Ryan"
              email="luke@timetoproaram.com"
              avatar="bg-gradient-to-r from-blue-500 to-purple-600"
              withConnector={true}
            />
          </div>
          
          {/* Connection lines to bottom card */}
          <div className="flex flex-col items-center mt-4">
            <div className="flex justify-between w-80">
              <DashedLine className="w-0 h-16" />
              <DashedLine className="w-0 h-16" />
            </div>
            <div className="relative">
              <DashedLine className="w-32 h-0" withDots={true} />
              <ConnectorDot className="absolute -top-1.5 left-1/2 transform -translate-x-1/2" />
            </div>
            <DashedLine className="w-0 h-16" />
          </div>
          
          <ProjectCard withConnectors={true} />
        </div>
      </div>


   </div>
  );
}