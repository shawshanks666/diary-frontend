import React, { useState, useRef, useEffect } from 'react';
// 
import { useDispatch } from 'react-redux';
import { toggle } from '../store/toggleSlice';
import burgerIcon from "../assets/burger.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToggle = () => {
    dispatch(toggle());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    window.location.href = "/login"; // or your login route
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="navbar relative">
        
        {/* Left side */}
        <a className='nav-element' href='/home'>Diarie</a>
        <a className='nav-element' href='/dashboard'>Dashboard</a>
        <a className='nav-element' href='/entry'>Entry</a>

        {/* --- RIGHT SIDE ICONS + BURGER --- */}
        <div className="flex items-center gap-4 relative">

          <div className="relative">
            <img
              alt='dropdown menu'
              src={burgerIcon}
              className="text-xl cursor-pointer hover:text-green px-1"
              onClick={() => setMenuOpen(!menuOpen)}
            />

            {/* DROPDOWN */}
            {menuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-3 w-44 bg-[var(--jade-0)] border shadow-lg p-2 flex flex-col gap-1 z-100"
              >

                <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
                  <span>Profile</span>
                </button>

                <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
                  <span>Themes</span>
                </button>

                <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
                  <span>Settings</span>
                </button>

                <hr className="my-1" />

                <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-50 text-red-500">
                  <span>Logout</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-left hover:bg-gray-200 w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="container"></div>
      <div className='flower w-full h-64 bg-no-repeat bg-contain bg-center -z-10'></div>
    </>
  );
};

export default Navbar;
