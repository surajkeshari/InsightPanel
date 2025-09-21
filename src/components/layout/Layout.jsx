import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import RightSidebar from './RightSidebar';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const location = useLocation();

  const showRightSidebarOnPage = location.pathname === '/dashboards/default';

  return (
    <div className="flex min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1">
        <Header 
            setSidebarOpen={setSidebarOpen} 
            setRightSidebarOpen={setRightSidebarOpen} 
        />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
      {showRightSidebarOnPage && (
          <RightSidebar 
              isRightSidebarOpen={isRightSidebarOpen} 
              setRightSidebarOpen={setRightSidebarOpen} 
          />
      )}
    </div>
  );
};

export default Layout;