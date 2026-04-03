export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.USER]: 'Viewer',
};

export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const TRANSACTION_TYPES = ['income', 'expense'];

export const CATEGORY_OPTIONS = [
  'Salary',
  'Freelance',
  'Food',
  'Transport',
  'Housing',
  'Utilities',
  'Healthcare',
  'Entertainment',
  'Shopping',
  'Travel',
  'Investment',
  'Education',
  'Insurance',
  'Other',
];

export const FILTER_DEFAULTS = {
  search: '',
  category: 'all',
  type: 'all',
  startDate: '',
  endDate: '',
  sortBy: 'date-desc',
};

export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
  { value: 'amount-desc', label: 'Amount high to low' },
  { value: 'amount-asc', label: 'Amount low to high' },
  { value: 'category-asc', label: 'Category A-Z' },
  { value: 'category-desc', label: 'Category Z-A' },
];

export const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-dashboard-transactions',
  ROLE: 'finance-dashboard-role',
  THEME: 'finance-dashboard-theme',
};

export const SIDEBAR_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'insights', label: 'Insights' },
  { id: 'transactions', label: 'Transactions' },
];

export const CATEGORY_COLORS = {
  Salary: '#157f58',
  Freelance: '#0f766e',
  Food: '#d97706',
  Transport: '#2563eb',
  Housing: '#b45309',
  Utilities: '#7c3aed',
  Healthcare: '#dc2626',
  Entertainment: '#db2777',
  Shopping: '#9333ea',
  Travel: '#0f766e',
  Investment: '#0891b2',
  Education: '#4338ca',
  Insurance: '#475569',
  Other: '#64748b',
};

export const SUMMARY_CARD_CONFIG = [
  {
    key: 'income',
    title: 'Total Income',
    accent: 'var(--success-500)',
    tone: 'positive',
  },
  {
    key: 'expense',
    title: 'Total Expense',
    accent: 'var(--danger-500)',
    tone: 'negative',
  },
  {
    key: 'balance',
    title: 'Total Balance',
    accent: 'var(--brand-500)',
    tone: 'neutral',
  },
];
