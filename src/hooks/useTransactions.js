import { useAppContext } from '../context/AppContext';
import {
  filterTransactions,
  getCategoryExpenseTotals,
  getMonthlySeries,
  getTotals,
  sortTransactions,
} from '../utils/calculations';

function useTransactions() {
  const app = useAppContext();
  const filteredTransactions = filterTransactions(app.transactions, app.filters);
  const visibleTransactions = sortTransactions(
    filteredTransactions,
    app.filters.sortBy,
  );

  return {
    ...app,
    visibleTransactions,
    totals: getTotals(visibleTransactions),
    allTotals: getTotals(app.transactions),
    expenseByCategory: getCategoryExpenseTotals(visibleTransactions),
    monthlySeries: getMonthlySeries(visibleTransactions),
    resultCount: visibleTransactions.length,
    totalCount: app.transactions.length,
  };
}

export default useTransactions;
