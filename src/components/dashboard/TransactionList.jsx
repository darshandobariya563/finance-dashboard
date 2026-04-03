import Button from '../common/Button';
import Card from '../common/Card';
import { CATEGORY_OPTIONS, SORT_OPTIONS } from '../../utils/constants';
import { formatCurrency, formatDate } from '../../utils/calculations';

function TransactionList({
  transactions,
  allTransactions,
  filters,
  canEdit,
  resultCount,
  totalCount,
  onFilterChange,
  onResetFilters,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction,
  onExport,
}) {
  const showActions = canEdit;
  const categoryOptions = Array.from(
    new Set([
      ...CATEGORY_OPTIONS,
      ...allTransactions.map((transaction) => transaction.category),
      filters.category !== 'all' ? filters.category : null,
    ]),
  ).filter(Boolean);
  const currentSortLabel =
    SORT_OPTIONS.find((option) => option.value === filters.sortBy)?.label ??
    'Newest first';
  const activeFilterCount = [
    filters.search.trim(),
    filters.category !== 'all' ? filters.category : '',
    filters.type !== 'all' ? filters.type : '',
    filters.startDate,
    filters.endDate,
  ].filter(Boolean).length;
  const hasActiveFilters = activeFilterCount > 0;
  const activeFilterChips = [];

  if (filters.search.trim()) {
    activeFilterChips.push(`Search: ${filters.search.trim()}`);
  }

  if (filters.category !== 'all') {
    activeFilterChips.push(`Category: ${filters.category}`);
  }

  if (filters.type !== 'all') {
    activeFilterChips.push(`Type: ${filters.type}`);
  }

  if (filters.startDate || filters.endDate) {
    activeFilterChips.push(
      `Date: ${filters.startDate ? formatDate(filters.startDate) : 'Any'} to ${
        filters.endDate ? formatDate(filters.endDate) : 'Any'
      }`,
    );
  }

  function handleStartDateChange(value) {
    const nextFilters = { startDate: value };

    if (filters.endDate && value && value > filters.endDate) {
      nextFilters.endDate = value;
    }

    onFilterChange(nextFilters);
  }

  function handleEndDateChange(value) {
    const nextFilters = { endDate: value };

    if (filters.startDate && value && value < filters.startDate) {
      nextFilters.startDate = value;
    }

    onFilterChange(nextFilters);
  }

  return (
    <Card
      title="Transactions"
      subtitle="Sort, filter, and manage activity from one place"
      action={
        canEdit ? (
          <Button size="sm" onClick={onAddTransaction}>
            Add transaction
          </Button>
        ) : (
          <span className="pill pill--muted">Viewer mode</span>
        )
      }
    >
      <div className="transactions-controls">
        <div className="transactions-controls__header">
          <div>
            <p className="eyebrow">Control panel</p>
            <h3 className="transactions-controls__title">
              Refine and explore transaction activity
            </h3>
            <p className="transactions-controls__subtitle">
              {hasActiveFilters
                ? `${activeFilterCount} filters are shaping this view. Adjust them to focus on the records that matter most.`
                : 'Use search, category, type, date range, and sorting to quickly surface the right financial activity.'}
            </p>
          </div>

          <div className="transactions-controls__stats">
            <div className="transactions-stat">
              <span className="transactions-stat__label">View</span>
              <strong className="transactions-stat__value">
                {hasActiveFilters ? 'Filtered' : 'Full dataset'}
              </strong>
            </div>
            <div className="transactions-stat">
              <span className="transactions-stat__label">Sort</span>
              <strong className="transactions-stat__value">
                {currentSortLabel}
              </strong>
            </div>
          </div>
        </div>

        <div className="transactions-controls__shell">
          <div className="transactions-controls__filters">
            <div className="filter-grid filter-grid--primary">
              <label className="field field--search">
                <span>Search transactions</span>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(event) =>
                    onFilterChange({ search: event.target.value })
                  }
                  placeholder="Search category or amount"
                />
              </label>

              <label className="field">
                <span>Category</span>
                <select
                  value={filters.category}
                  onChange={(event) =>
                    onFilterChange({ category: event.target.value })
                  }
                >
                  <option value="all">All categories</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Type</span>
                <select
                  value={filters.type}
                  onChange={(event) =>
                    onFilterChange({ type: event.target.value })
                  }
                >
                  <option value="all">All types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </label>

              <label className="field field--date-range">
                <span>Date range</span>
                <div className="date-range">
                  <div className="date-range__field">
                    <span>From</span>
                    <input
                      type="date"
                      value={filters.startDate}
                      max={filters.endDate || undefined}
                      onChange={(event) =>
                        handleStartDateChange(event.target.value)
                      }
                    />
                  </div>
                  <div className="date-range__field">
                    <span>To</span>
                    <input
                      type="date"
                      value={filters.endDate}
                      min={filters.startDate || undefined}
                      onChange={(event) =>
                        handleEndDateChange(event.target.value)
                      }
                    />
                  </div>
                </div>
              </label>
            </div>

            <div className="filter-grid filter-grid--secondary">
              <label className="field field--sort">
                <span>Sort by</span>
                <select
                  value={filters.sortBy}
                  onChange={(event) =>
                    onFilterChange({ sortBy: event.target.value })
                  }
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="filter-chip-row">
                {activeFilterChips.length ? (
                  activeFilterChips.map((chip) => (
                    <span key={chip} className="filter-chip">
                      {chip}
                    </span>
                  ))
                ) : (
                  <span className="filter-chip filter-chip--subtle">
                    No active filters
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="toolbar-actions toolbar-actions--panel">
            <p className="toolbar-actions__label">Quick actions</p>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={onResetFilters}
            >
              Reset filters
            </Button>
            <div className="toolbar-actions__row">
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => onExport('csv')}
              >
                Export CSV
              </Button>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => onExport('json')}
              >
                Export JSON
              </Button>
            </div>
          </div>
        </div>
      </div>

      {!canEdit ? (
        <div className="notice-banner">
          Viewer mode hides edit controls. Switch to Admin to add, edit, or
          delete transactions.
        </div>
      ) : null}

      <div className="table-status">
        <strong>
          Showing {resultCount} of {totalCount} transactions
        </strong>
      </div>

      {transactions.length ? (
        <div className="table-wrapper">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                {showActions ? <th>Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td data-label="Date">{formatDate(transaction.date)}</td>
                  <td data-label="Category">{transaction.category}</td>
                  <td data-label="Type">
                    <span
                      className={`pill ${
                        transaction.type === 'income'
                          ? 'pill--success'
                          : 'pill--danger'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td data-label="Amount">{formatCurrency(transaction.amount)}</td>
                  {showActions ? (
                    <td data-label="Actions">
                      <div className="table-actions">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onEditTransaction(transaction)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => onDeleteTransaction(transaction.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state empty-state--large">
          <h3>No transactions found</h3>
          <p>
            Adjust your filters or{' '}
            {canEdit ? 'add a new transaction.' : 'switch to Admin to create one.'}
          </p>
        </div>
      )}
    </Card>
  );
}

export default TransactionList;
