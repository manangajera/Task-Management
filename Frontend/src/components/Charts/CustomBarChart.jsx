import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

const CustomBarChart = ({ data, colors }) => {
  // Validate data and provide fallback if needed
  const chartData = Array.isArray(data) && data.length > 0 ? data : [
    { priority: "No Data", count: 1 }
  ];
  
  const chartColors = Array.isArray(colors) && colors.length > 0 ? colors : ["#CCCCCC"];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-80">
      <h3 className="text-lg font-semibold text-center mb-4">Task Priority Distribution</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priority" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => {
              if (name === "No Data") return [null, null];
              return [`${value} tasks`, name];
            }}
            contentStyle={{ 
              borderRadius: '8px', 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '8px 12px'
            }}
          />
          <Legend />
          <Bar 
            dataKey="count" 
            name="Tasks" 
            fill={chartColors[0]}
            fillOpacity={0.8}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;