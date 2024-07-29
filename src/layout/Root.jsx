import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Root = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <main className='max-w-[1920px] h-screen mx-auto bg-webBG bg-fixed bg-center bg-cover bg-no-repeat text-white overflow-x-hidden overflow-y-auto taka-scrollbar'>
      <div className='flex items-start h-full justify-start'>
        <div className='h-screen'>
          <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        </div>
        <div
          className={`flex-1 mx-auto h-screen w-full ${
            openSidebar ? "overflow-x-hidden" : "overflow-x-auto"
          }`}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Root;
