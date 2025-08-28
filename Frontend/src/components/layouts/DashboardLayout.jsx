import React, { useContext, memo } from "react";
import { userContext } from "../../context/userContext";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";

const DashboardLayout = memo(({ children, activeMenu }) => {
  const { user } = useContext(userContext);
  
  console.log("DashboardLayout rendering with activeMenu:", activeMenu);
  
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow m-2 mt-3">{children}</div>
        </div>
      )}
    </div>
  );
});

DashboardLayout.displayName = "DashboardLayout";

export default DashboardLayout;