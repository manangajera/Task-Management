import React, { useContext, useEffect, useState, memo } from "react";
import { SIDE_MENU_USER_DATA, sidebarLinks } from "../../utils/data";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const SideMenu = memo(({ activeMenu = "Dashboard" }) => {
  const { user, clearUser } = useContext(userContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  console.log("SideMenu rendering with activeMenu:", activeMenu);

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user.role === "admin" ? sidebarLinks : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  // Memoize the menu items to prevent unnecessary re-renders
  const menuItems = React.useMemo(() => {
    return sideMenuData.map((item, index) => (
      <button
        key={index}
        className={`w-full flex items-center gap-4 text-[15px] ${
          activeMenu === item.label
            ? "text-primary bg-blue-50 border-r-2 border-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        } py-3 px-6 mb-3 cursor-pointer transition-colors duration-200`}
        onClick={() => handleClick(item.path)}
      >
        <item.icon
          className={`w-5 h-5 ${
            activeMenu === item.label ? "text-blue-600" : "text-gray-500"
          }`}
        />
        <span className="font-medium">{item.label}</span>
      </button>
    ));
  }, [sideMenuData, activeMenu]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
      {/* User Profile Section */}
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img
            src={user?.profileImageUrl}
            alt={user?.name || "User"}
            className="w-20 h-20 bg-slate-400 rounded-full object-cover"
            onError={(e) => {
              e.target.src = "";
            }}
          />
        </div>

        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-blue-500 px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>
        <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-4">
        {menuItems}
      </div>
    </div>
  );
});

SideMenu.displayName = "SideMenu";

export default SideMenu;