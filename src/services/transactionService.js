import { ROLES, STORAGE_KEYS, THEME_OPTIONS } from '../utils/constants';

const LOAD_DELAY_MS = 550;

function readStorage(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return null;
  }

  return value;
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function getNextId(transactions) {
  if (!transactions.length) {
    return 1;
  }

  return Math.max(...transactions.map((transaction) => Number(transaction.id))) + 1;
}

export async function loadInitialState(fallbackTransactions) {
  await wait(LOAD_DELAY_MS);

  return {
    transactions:
      readStorage(STORAGE_KEYS.TRANSACTIONS) ?? fallbackTransactions,
    role: readStorage(STORAGE_KEYS.ROLE) ?? ROLES.ADMIN,
    theme: readStorage(STORAGE_KEYS.THEME) ?? THEME_OPTIONS.LIGHT,
  };
}

export function saveTransactions(transactions) {
  return writeStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
}

export function saveRole(role) {
  return writeStorage(STORAGE_KEYS.ROLE, role);
}

export function saveTheme(theme) {
  return writeStorage(STORAGE_KEYS.THEME, theme);
}

export function buildTransactionRecord(values, currentTransactions) {
  return {
    id: values.id ? Number(values.id) : getNextId(currentTransactions),
    userId: values.userId ? Number(values.userId) : 1,
    date: values.date,
    category: values.category,
    amount: Number(values.amount),
    type: values.type,
  };
}

function escapeCsvValue(value) {
  const normalized = String(value ?? '');
  if (normalized.includes(',') || normalized.includes('"')) {
    return `"${normalized.replaceAll('"', '""')}"`;
  }

  return normalized;
}

function createCsv(transactions) {
  const header = ['id', 'date', 'category', 'amount', 'type', 'userId'];
  const rows = transactions.map((transaction) =>
    [
      transaction.id,
      transaction.date,
      transaction.category,
      transaction.amount,
      transaction.type,
      transaction.userId,
    ]
      .map(escapeCsvValue)
      .join(','),
  );

  return [header.join(','), ...rows].join('\n');
}

function downloadBlob(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function exportTransactions(transactions, format) {
  if (format === 'json') {
    downloadBlob(
      JSON.stringify(transactions, null, 2),
      'transactions.json',
      'application/json',
    );
    return;
  }

  downloadBlob(createCsv(transactions), 'transactions.csv', 'text/csv');
}
