import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("/getDemandeMedcinData")
      .then((response) => response.json())
      .then((medcinData) => setChartData(medcinData))
      .catch((error) => console.error("Error fetching medcin data:", error));
  }, []);

  return (
    <div className="dashboard">
    <h1 className="dashboard__title">Dashboard</h1>
    <div className="dashboard__content">
      <div className="chart">
        <div className="chart__title">Last 6 Months (Demande)</div>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <AreaChart
            width={730}
            height={250}
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="date" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="region"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
        </div>
        {/* Add other components or content for the dashboard */}
      </div>
    </div>
  );
};

export default Dashboard;

