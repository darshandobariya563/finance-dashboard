import { useEffect, useState } from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseChart';
import Insights from '../components/dashboard/Insights';
import TransactionList from '../components/dashboard/TransactionList';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAppContext } from '../context/AppContext';
import useInsights from '../hooks/useInsights';
import useTransactions from '../hooks/useTransactions';
import { exportTransactions } from '../services/transactionService';
import { CATEGORY_OPTIONS, TRANSACTION_TYPES } from '../utils/constants';

const emptyFormState = {
  id: '',
  date: '',
  category: 'Food',
  amount: '',
  type: TRANSACTION_TYPES[1],
};

function Dashboard() {
  const {
    transactions,
    filters,
    loading,
    canEdit,
    updateFilters,
    resetFilters,
    saveTransaction,
    removeTransaction,
  } = useAppContext();
  const {
    visibleTransactions,
    totals,
    expenseByCategory,
    monthlySeries,
    resultCount,
    totalCount,
  } = useTransactions();
  const insights = useInsights();
  const [activeSection, setActiveSection] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    ...emptyFormState,
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (!canEdit && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [canEdit, isModalOpen]);

  function scrollToSection(sectionId) {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function openCreateModal() {
    setFormState({
      ...emptyFormState,
      date: new Date().toISOString().slice(0, 10),
    });
    setIsModalOpen(true);
  }

  function openEditModal(transaction) {
    setFormState({
      id: transaction.id,
      date: transaction.date,
      category: transaction.category,
      amount: String(transaction.amount),
      type: transaction.type,
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveTransaction(formState);
    closeModal();
  }

  function handleDelete(id) {
    const shouldDelete = window.confirm(
      'Delete this transaction from the dashboard?',
    );

    if (shouldDelete) {
      removeTransaction(id);
    }
  }

  if (loading) {
    return <Loader label="Syncing dashboard data..." fullScreen />;
  }

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSelectSection={scrollToSection}
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Portfolio snapshot</p>
          <h2>See the full financial picture in one responsive workspace.</h2>
          <p className="hero__copy">
            The dashboard reacts instantly to role changes, active filters, and
            transaction edits so you can review outcomes without leaving the page.
          </p>
        </div>
        <div className="hero__actions">
          {canEdit ? (
            <Button onClick={openCreateModal}>New transaction</Button>
          ) : null}
          <Button
            variant="secondary"
            onClick={() => exportTransactions(visibleTransactions, 'csv')}
          >
            Export current view
          </Button>
        </div>
      </section>

      <section id="overview" className="dashboard-section">
        <SummaryCards
          totals={totals}
          resultCount={resultCount}
          totalCount={totalCount}
        />
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-grid__main">
          <IncomeExpenseChart monthlySeries={monthlySeries} />
        </div>
        <div className="dashboard-grid__side">
          <ExpenseChart expenseByCategory={expenseByCategory} />
        </div>
      </section>

      <section id="insights" className="dashboard-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Insight engine</p>
            <h2>Automated signals from your financial data</h2>
          </div>
        </div>
        <Insights insights={insights} />
      </section>

      <section id="transactions" className="dashboard-section">
        <TransactionList
          transactions={visibleTransactions}
          allTransactions={transactions}
          filters={filters}
          canEdit={canEdit}
          resultCount={resultCount}
          totalCount={totalCount}
          onFilterChange={updateFilters}
          onResetFilters={resetFilters}
          onAddTransaction={openCreateModal}
          onEditTransaction={openEditModal}
          onDeleteTransaction={handleDelete}
          onExport={(format) => exportTransactions(visibleTransactions, format)}
        />
      </section>

      <Modal
        isOpen={isModalOpen}
        title={formState.id ? 'Edit transaction' : 'Add transaction'}
        description="Update the fields below to keep your dashboard totals and insights accurate."
        onClose={closeModal}
      >
        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="transaction-form__grid">
            <label className="field">
              <span>Date</span>
              <input
                type="date"
                name="date"
                value={formState.date}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>Category</span>
              <select
                name="category"
                value={formState.category}
                onChange={handleChange}
                required
              >
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Amount</span>
              <input
                type="number"
                name="amount"
                min="0"
                step="0.01"
                value={formState.amount}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </label>

            <label className="field">
              <span>Type</span>
              <select
                name="type"
                value={formState.type}
                onChange={handleChange}
                required
              >
                {TRANSACTION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="modal__actions">
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">
              {formState.id ? 'Save changes' : 'Create transaction'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

export default Dashboard;
