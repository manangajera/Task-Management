import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomPieChart = ({ data, colors }) => {
  const chartColors =
    Array.isArray(colors) && colors.length > 0 ? colors : ["#CCCCCC"];

  return (
    <ResponsiveContainer height={325}>
      <PieChart>
        <Pie data={data} dataKey="count" nameKey="status" outerRadius={130}>
          {Array.isArray(data) &&
            data.map((entry, index) => (
              <Cell
                key={index}
                fill={chartColors[index % chartColors.length]}
              />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
