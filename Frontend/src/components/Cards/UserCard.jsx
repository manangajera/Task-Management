import React from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col ">
      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <img
          src={userInfo.profilePicture}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{userInfo.name}</h3>
          <p className="text-sm text-gray-500">{userInfo.email}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-between mt-5">
        <StatCard label="Pending" count={userInfo?.pending || 0} color="text-purple-600" />
        <StatCard label="In Progress" count={userInfo?.inProgress || 0} color="text-teal-500" />
        <StatCard label="Completed" count={userInfo?.completed || 0} color="text-purple-600" />
      </div>
    </div>
  );
};

export default UserCard;

export const StatCard = ({ label, count, color }) => {
  return (
    <div className="flex flex-col items-center w-20">
      <p className={`text-lg font-bold ${color}`}>{count}</p>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
};
