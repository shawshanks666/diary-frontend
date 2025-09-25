import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { toggle } from '../store/toggleSlice'; // Adjust the import path if necessary

const Navbar = () => {
  // const isToggled = useSelector((state) => state.toggle.isToggled);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggle()); // Dispatch the toggle action
  };
  return (
    <>
    <div className="sticky top-0 left-0 z-50 height-100 text-white px-4">

    <div className="flex sticky justify-between items-center p-4 bg-transparent">
      {/* Brand Name */}
      <div className="indie-flower-regular text-3xl font-bold hover:text-green">
        Diarie
      </div>

      {/* Icons */}
      <div className="flex space-x-4">

        <FontAwesomeIcon icon={faCalendar} className="text-xl cursor-pointer hover:text-green px-1" onClick={()=>handleToggle()}/>
        <FontAwesomeIcon icon={faUser} className="text-xl cursor-pointer hover:text-green px-1" />
        <FontAwesomeIcon icon={faBars} className="text-xl cursor-pointer hover:text-green px-1" />
      </div>
    </div>
    </div>

    <div className="container">
  </div>  
  <div className='flower w-full h-64 bg-no-repeat bg-contain bg-center -z-10'></div>


    </>
  );
};

export default Navbar;
