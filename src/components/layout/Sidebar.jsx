import { useAppContext } from '../../context/AppContext';
import { ROLE_LABELS, SIDEBAR_LINKS } from '../../utils/constants';

function Sidebar({ activeSection, onSelectSection, isOpen, onClose }) {
  const { role, canEdit } = useAppContext();

  function handleSelect(sectionId) {
    onSelectSection(sectionId);
    onClose();
  }

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <span className="sidebar__brand-mark">FD</span>
        <div>
          <p className="eyebrow">Finance Dashboard</p>
          <h2>Performance panel</h2>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Dashboard sections">
        {SIDEBAR_LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            className={activeSection === link.id ? 'is-active' : ''}
            onClick={() => handleSelect(link.id)}
          >
            <span>{link.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__panel">
        <p className="eyebrow">Access level</p>
        <strong className="sidebar__role">{ROLE_LABELS[role]}</strong>
        <p className="sidebar__help">
          {canEdit
            ? 'Admin mode can add, edit, and delete transactions.'
            : 'Viewer mode is read-only for safe dashboard review.'}
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
