// Navbar.js - Improved styling
import { useState } from "react";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white shadow-sm py-4 px-6 sticky top-0 z-30 border-b border-gray-200">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="lg:hidden text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-xl font-semibold text-gray-900">Expense Tracker</h2>
      </div>

      {/* Add any right-side navbar content here */}
      
      {openSideMenu && (
        <div className="fixed top-16 left-0 right-0 bg-white shadow-lg lg:hidden z-40">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;