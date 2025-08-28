import React, { useContext, useEffect, useState } from "react";
import useUserAuth from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import moment from "moment";
import { userContext } from "../../context/userContext";
import { addThousandsSeparator } from "../../utils/helper";
import InfoCard from "../../components/Cards/InfoCard";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import TaskListTable from "../../components/TaskListTable";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];
const BAR_COLORS = ["#FF6B6B", "#FFD166", "#06D6A0"];

const Dashboard = () => {
  useUserAuth();
  const { user } = useContext(userContext);

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const navigate = useNavigate();

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityDistribution || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];
    setPieChartData(taskDistributionData);

    const priorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];
    setBarChartData(priorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const SeeMore = () => {
    navigate("/admin/task");
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Good Morning! {user?.name}</h2>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            {moment().format("dddd, Do MMM YYYY")}
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <InfoCard
            title="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-blue-500"
            iconColor="text-blue-500"
          />

          <InfoCard
            title="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
            iconColor="text-violet-500"
          />

          <InfoCard
            title="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
            iconColor="text-cyan-500"
          />

          <InfoCard
            title="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
            iconColor="text-lime-500"
          />
        </div>

        {/* Charts Section */}
        <div className="mb-6 md:mb-8">
          <h5 className="font-medium text-lg mb-4">Task Distribution</h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h6 className="text-center font-medium mb-3">By Status</h6>
              <div className="">
                <CustomPieChart data={pieChartData} colors={COLORS} />
              </div>
            </div>
            
            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h6 className="text-center font-medium mb-3">By Priority</h6>
              <div className="">
                <CustomBarChart data={barChartData} colors={BAR_COLORS} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">Recent Tasks</h3>
            <button 
              className="flex items-center text-primary hover:text-primary-dark transition-colors font-medium text-sm md:text-base"
              onClick={() => SeeMore()}
            >
              View All
              <LuArrowRight className="ml-1 text-base" />
            </button>
          </div>
          <TaskListTable tableData={dashboardData?.recentTask || []} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;