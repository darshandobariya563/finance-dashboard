import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function DashboardLayout({ activeSection, onSelectSection, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={onSelectSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen ? (
        <button
          className="sidebar-overlay"
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <div className="app-shell__content">
        <Navbar onToggleSidebar={() => setSidebarOpen((current) => !current)} />
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
