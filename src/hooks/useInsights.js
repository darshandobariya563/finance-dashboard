import { useAppContext } from '../context/AppContext';
import {
  filterTransactions,
  formatCurrency,
  formatPercent,
  getHighestExpenseCategory,
  getLargestTransaction,
  getMonthlyComparison,
  getSavingsRate,
  getTotals,
} from '../utils/calculations';

function useInsights() {
  const { transactions, filters } = useAppContext();
  const visibleTransactions = filterTransactions(transactions, filters);

  const topCategory = getHighestExpenseCategory(visibleTransactions);
  const monthlyComparison = getMonthlyComparison(visibleTransactions);
  const totals = getTotals(visibleTransactions);
  const largestTransaction = getLargestTransaction(visibleTransactions);
  const savingsRate = getSavingsRate(visibleTransactions);

  const movementCopy =
    monthlyComparison.direction === 'up'
      ? `Spending increased by ${formatPercent(
          Math.abs(monthlyComparison.changePercent),
        )} compared with ${monthlyComparison.previousMonth.label}.`
      : monthlyComparison.direction === 'down'
        ? `Spending decreased by ${formatPercent(
            Math.abs(monthlyComparison.changePercent),
          )} compared with ${monthlyComparison.previousMonth.label}.`
        : 'Spending stayed stable compared with the previous month.';

  return [
    {
      id: 'top-category',
      title: 'Top spend category',
      description: topCategory
        ? `${topCategory.category} leads spending at ${formatCurrency(
            topCategory.total,
          )}.`
        : 'No expense data is available for the current filters.',
      tone: 'neutral',
    },
    {
      id: 'monthly-comparison',
      title: 'Monthly comparison',
      description: movementCopy,
      tone:
        monthlyComparison.direction === 'down'
          ? 'positive'
          : monthlyComparison.direction === 'up'
            ? 'negative'
            : 'neutral',
    },
    {
      id: 'savings-rate',
      title: 'Savings health',
      description:
        totals.income > 0
          ? `You are retaining ${formatPercent(savingsRate)} of your income after expenses.`
          : 'Add income entries to unlock savings-rate insights.',
      tone: savingsRate >= 25 ? 'positive' : savingsRate >= 10 ? 'neutral' : 'negative',
    },
    {
      id: 'largest-transaction',
      title: 'Largest movement',
      description: largestTransaction
        ? `${largestTransaction.category} is the largest ${largestTransaction.type} at ${formatCurrency(
            largestTransaction.amount,
          )}.`
        : 'Add more activity to identify your biggest transaction.',
      tone: 'neutral',
    },
  ];
}

export default useInsights;
