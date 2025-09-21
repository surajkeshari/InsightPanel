import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiBox,
  FiUsers,
  FiLayout,
  FiBriefcase,
  FiX,
} from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';
import InsightPanelLogoLight from '../../assets/images/logo-light.png';
import InsightPanelLogoDark from '../../assets/images/logo-dark.png';


const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const navLinkClasses =
    'flex items-center px-4 py-2.5 rounded-lg text-muted hover:bg-[var(--bg-main)] hover:text-foreground transition-colors';
  const activeLinkClasses = 'bg-accent text-white';
const { theme } = useTheme();


  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`bg-card border-r border-border p-5 flex-shrink-0 w-64 z-40 fixed lg:relative lg:translate-x-0 h-full transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex justify-between items-center mb-8'>
          {/* <div className="text-2xl font-bold text-foreground">InsightPanel</div> */}
          {
          <img 
            src={theme === 'light' ? InsightPanelLogoLight : InsightPanelLogoDark} 
            alt="InsightPanel Logo" 
            className="w-64" 
          />}
          <button
            onClick={() => setSidebarOpen(false)}
            className='lg:hidden text-muted'
          >
            <FiX size={24} />
          </button>
        </div>
        <nav className='space-y-6'>
          <NavSection title='Favorites'>
            <NavLink
              to='/overview'
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`
              }
            >
              <FiHome /> <span className='ml-3'>Overview</span>
            </NavLink>
            <NavLink
              to='/projects'
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`
              }
            >
              <FiBriefcase /> <span className='ml-3'>Projects</span>
            </NavLink>
          </NavSection>
          <NavSection title='Dashboards'>
            <NavLink
              to='/dashboards/default'
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`
              }
            >
              <FiLayout /> <span className='ml-3'>Default</span>
            </NavLink>
            <NavLink
              to='/orders'
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`
              }
            >
              <FiBox /> <span className='ml-3'>Order List</span>
            </NavLink>
          </NavSection>
          <NavSection title='Pages'>
            <NavLink
              to='/user-profile'
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`
              }
            >
              <FiUsers /> <span className='ml-3'>User Profile</span>
            </NavLink>
          </NavSection>
        </nav>
      </aside>
    </>
  );
};

const NavSection = ({ title, children }) => (
  <div>
    <h3 className='text-xs font-semibold text-muted uppercase tracking-wider mb-3'>
      {title}
    </h3>
    <div className='space-y-1'>{children}</div>
  </div>
);

export default Sidebar;
