import { CATEGORY_COLORS } from './constants';

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatPercent(value) {
  const normalized = Number.isFinite(value) ? value : 0;
  return `${normalized.toFixed(1)}%`;
}

export function getTotals(transactions) {
  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const expense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  return {
    income,
    expense,
    balance: income - expense,
  };
}

export function filterTransactions(transactions, filters) {
  return transactions.filter((transaction) => {
    const searchValue = filters.search.trim().toLowerCase();
    const transactionTime = new Date(transaction.date).getTime();
    const startTime = filters.startDate
      ? new Date(filters.startDate).getTime()
      : null;
    const endTime = filters.endDate
      ? new Date(filters.endDate).getTime()
      : null;

    const matchesSearch =
      !searchValue ||
      transaction.category.toLowerCase().includes(searchValue) ||
      String(transaction.amount).includes(searchValue);

    const matchesCategory =
      filters.category === 'all' || transaction.category === filters.category;

    const matchesType =
      filters.type === 'all' || transaction.type === filters.type;

    const matchesStart = !startTime || transactionTime >= startTime;
    const matchesEnd = !endTime || transactionTime <= endTime;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesType &&
      matchesStart &&
      matchesEnd
    );
  });
}

export function sortTransactions(transactions, sortBy) {
  const sortedTransactions = [...transactions];

  switch (sortBy) {
    case 'date-asc':
      return sortedTransactions.sort(
        (left, right) => new Date(left.date) - new Date(right.date),
      );
    case 'amount-desc':
      return sortedTransactions.sort(
        (left, right) => Number(right.amount) - Number(left.amount),
      );
    case 'amount-asc':
      return sortedTransactions.sort(
        (left, right) => Number(left.amount) - Number(right.amount),
      );
    case 'category-asc':
      return sortedTransactions.sort((left, right) =>
        left.category.localeCompare(right.category),
      );
    case 'category-desc':
      return sortedTransactions.sort((left, right) =>
        right.category.localeCompare(left.category),
      );
    case 'date-desc':
    default:
      return sortedTransactions.sort(
        (left, right) => new Date(right.date) - new Date(left.date),
      );
  }
}

export function getCategoryExpenseTotals(transactions) {
  const categoryTotals = transactions.reduce((accumulator, transaction) => {
    if (transaction.type !== 'expense') {
      return accumulator;
    }

    accumulator[transaction.category] =
      (accumulator[transaction.category] || 0) + Number(transaction.amount);

    return accumulator;
  }, {});

  return Object.entries(categoryTotals)
    .map(([category, total]) => ({
      category,
      total,
      color: CATEGORY_COLORS[category] || CATEGORY_COLORS.Other,
    }))
    .sort((left, right) => right.total - left.total);
}

export function getHighestExpenseCategory(transactions) {
  return getCategoryExpenseTotals(transactions)[0] ?? null;
}

export function getMonthlySeries(transactions) {
  const monthlyMap = transactions.reduce((accumulator, transaction) => {
    const date = new Date(transaction.date);

    if (Number.isNaN(date.getTime())) {
      return accumulator;
    }

    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}`;

    if (!accumulator[monthKey]) {
      accumulator[monthKey] = {
        key: monthKey,
        label: date.toLocaleString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        income: 0,
        expense: 0,
      };
    }

    accumulator[monthKey][transaction.type] += Number(transaction.amount);

    return accumulator;
  }, {});

  return Object.values(monthlyMap)
    .sort((left, right) => left.key.localeCompare(right.key))
    .slice(-6);
}

export function getMonthlyComparison(transactions) {
  const monthlySeries = getMonthlySeries(transactions);
  const currentMonth = monthlySeries[monthlySeries.length - 1] ?? {
    label: 'Current month',
    expense: 0,
  };
  const previousMonth = monthlySeries[monthlySeries.length - 2] ?? {
    label: 'Previous month',
    expense: 0,
  };
  const delta = currentMonth.expense - previousMonth.expense;

  const changePercent =
    previousMonth.expense === 0
      ? currentMonth.expense > 0
        ? 100
        : 0
      : (delta / previousMonth.expense) * 100;

  return {
    currentMonth,
    previousMonth,
    delta,
    changePercent,
    direction: delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat',
  };
}

export function getSavingsRate(transactions) {
  const { income, balance } = getTotals(transactions);

  if (income === 0) {
    return 0;
  }

  return (balance / income) * 100;
}

export function getLargestTransaction(transactions) {
  if (!transactions.length) {
    return null;
  }

  return [...transactions].sort(
    (left, right) => Number(right.amount) - Number(left.amount),
  )[0];
}
