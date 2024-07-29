import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { RiHomeGearFill } from "react-icons/ri";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import {
  GiExitDoor,
  GiMoneyStack,
  GiReceiveMoney,
  GiTakeMyMoney,
} from "react-icons/gi";
import { Tooltip } from "react-tooltip";
// import logo from "../assets/logo.png";
import { MdManageHistory } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { getColorForInitial } from "../utilities/colorGenerator";
import { FaUsersGear } from "react-icons/fa6";
import useGetUserType from "../hooks/useGetUserType";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const { currentUser, logOut } = useAuth();
  const { userType } = useGetUserType();
  const color = getColorForInitial(currentUser?.name?.charAt(0) || "X");

  const sideBarClasses = ({ isActive }) =>
    isActive
      ? "text-orange-900 font-bold flex items-center gap-2"
      : "hover:text-orange-900 transition-all duration-700 flex items-center gap-2 font-semibold";

  const sidebarMenus = [
    { icon: <RiHomeGearFill className='text-3xl' />, link: "/", title: "Home" },
    {
      icon: <GiMoneyStack className='text-3xl' />,
      link: "/cash-in",
      title: "Cash-in",
    },
    {
      icon: <GiReceiveMoney className='text-3xl' />,
      link: "/cash-out",
      title: "Cash Out",
    },
    {
      icon: <GiTakeMyMoney className='text-3xl' />,
      link: "/send-money",
      title: "Send Money",
    },
    {
      icon: <MdManageHistory className='text-3xl' />,
      link: "/transactions",
      title: "Transaction History",
    },
    userType === "admin" && {
      icon: <FaUsersGear className='text-3xl' />,
      link: "/manage-users",
      title: "Manage Users",
    },
  ];

  return (
    <div
      className={`${
        openSidebar ? "w-48 md:w-64" : "w-16"
      } h-screen whitespace-nowrap p-2 pt-6 relative transition-all duration-300 bg-sidebarGradient shadow-md shadow-orange-300`}>
      {/* sidebar control */}
      <IoIosArrowDropleftCircle
        className={`absolute cursor-pointer -right-3 top-6 md:top-7 w-6 md:w-7 text-4xl transition-all duration-1000 ${
          !openSidebar && "rotate-180"
        }`}
        onClick={() => setOpenSidebar(!openSidebar)}
      />
      <Tooltip anchorSelect='.userName' place='bottom-end'>
        {currentUser?.name || "No User"}
      </Tooltip>
      {/* Profile */}
      <Link to='/profile'>
        <div className={`flex gap-2 items-center`}>
          <div
            className={`userName rounded-full aspect-square w-9 md:w-10 border-2 transition-all duration-700 flex items-center justify-center font-bold text-white text-lg ${
              openSidebar && "rotate-[360deg]"
            }`}
            style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}>
            <span className='block'>
              {currentUser?.name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase() || "X"}
            </span>
          </div>
          <div
            className={`text-white overflow-x-hidden flex-1 origin-left font-medium transition-all duration-700 ${
              !openSidebar && "opacity-0 -translate-x-full overflow-hidden w-0"
            }`}>
            <h3 className='text-sm md:text-xl text-ellipsis'>
              {currentUser?.name || "No User"}
            </h3>
            <h4 className='text-xs first-letter:capitalize'>Profile</h4>
          </div>
        </div>
      </Link>
      <hr className='my-4' />
      <ul className='flex flex-col gap-4 items-start'>
        {sidebarMenus.map((menu, index) => (
          <NavLink
            onClick={() => setOpenSidebar(false)}
            title={menu.title}
            className={sideBarClasses}
            to={menu.link}
            key={index}
            end>
            {menu.icon}
            <h3
              className={`${
                !openSidebar &&
                "opacity-0 -translate-x-full overflow-hidden w-0"
              } text-sm md:text-xl origin-left whitespace-pre transition-all duration-700`}>
              {menu.title}
            </h3>
          </NavLink>
        ))}
      </ul>

      <hr className='my-4' />

      <button
        onClick={logOut}
        className='flex items-center gap-2 font-semibold hover:text-orange-900 transition-all duration-500'>
        <GiExitDoor className='text-3xl' title='Log Out' />
        <span
          className={`${
            !openSidebar && "opacity-0 -translate-x-full overflow-hidden w-0"
          } whitespace-pre text-sm md:text-xl origin-left transition-all duration-1000`}>
          Logout
        </span>
      </button>
    </div>
  );
};

Sidebar.propTypes = {
  openSidebar: PropTypes.bool.isRequired,
  setOpenSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
