import React from 'react';
import { FiSearch, FiSun, FiMoon, FiBell, FiGrid, FiMenu } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';

const Header = ({ setSidebarOpen, setRightSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center p-4 bg-card border-b border-border">
      {/* Left side */}
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-muted">
          <FiMenu size={24} />
        </button>
        <div className="text-sm text-muted hidden md:block">
          Dashboards / <span className="text-foreground font-medium">Default</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="text" placeholder="Search..." className="bg-[var(--bg-main)] border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-[var(--bg-main)] text-muted">
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
        <button className="p-2 rounded-full hover:bg-[var(--bg-main)] text-muted"><FiBell size={20} /></button>
        
        {/* New Button to toggle Right Sidebar on mobile */}
        <button onClick={() => setRightSidebarOpen(true)} className="p-2 rounded-full hover:bg-[var(--bg-main)] text-muted lg:hidden">
            <FiGrid size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;