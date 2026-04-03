import useTransactions from '../../hooks/useTransactions';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/calculations';
import { ROLE_LABELS, ROLES, THEME_OPTIONS } from '../../utils/constants';
import Button from '../common/Button';

function Navbar({ onToggleSidebar }) {
  const { role, setRole, theme, toggleTheme } = useAppContext();
  const { totals, resultCount } = useTransactions();

  return (
    <header className="topbar">
      <div className="topbar__intro">
        <Button
          className="topbar__menu"
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
        >
          Menu
        </Button>
        <div>
          <p className="eyebrow">Financial command center</p>
          <h1 className="topbar__title">Cashflow dashboard</h1>
          <p className="topbar__caption">
            Track balance, review trends, and switch between Viewer and Admin modes.
          </p>
        </div>
      </div>

      <div className="topbar__controls">
        <div className="topbar__metric">
          <span className="topbar__metric-label">Current balance</span>
          <strong>{formatCurrency(totals.balance)}</strong>
          <small>{resultCount} records in the current view</small>
        </div>

        <div className="segmented-control" aria-label="Role toggle">
          <button
            type="button"
            className={role === ROLES.USER ? 'is-active' : ''}
            onClick={() => setRole(ROLES.USER)}
          >
            {ROLE_LABELS[ROLES.USER]}
          </button>
          <button
            type="button"
            className={role === ROLES.ADMIN ? 'is-active' : ''}
            onClick={() => setRole(ROLES.ADMIN)}
          >
            {ROLE_LABELS[ROLES.ADMIN]}
          </button>
        </div>

        <Button variant="secondary" size="sm" onClick={toggleTheme}>
          {theme === THEME_OPTIONS.LIGHT ? 'Dark mode' : 'Light mode'}
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
