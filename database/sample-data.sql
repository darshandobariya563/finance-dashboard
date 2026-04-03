USE finance_dashboard;

INSERT INTO users (name, email, password, role)
VALUES
  (
    'Ariana Blake',
    'admin@finance-dashboard.local',
    '$2b$10$4jwq3kR2cUQ8k7sR2bR73u0PT6RM4u91vH95I2xqgAZ3Xb2xIQP5y',
    'admin'
  ),
  (
    'Daniel Reed',
    'user@finance-dashboard.local',
    '$2b$10$6mT7HgmZdyfV5uqmctJv6e9aRjhdx0BFg7jmqo7xAHVwAfRf2LZSa',
    'user'
  );

INSERT INTO transactions (user_id, date, category, amount, type)
VALUES
  (1, '2026-02-28', 'Salary', 6200.00, 'income'),
  (1, '2026-03-02', 'Housing', 1650.00, 'expense'),
  (1, '2026-03-04', 'Food', 120.00, 'expense'),
  (1, '2026-03-08', 'Transport', 78.00, 'expense'),
  (1, '2026-03-10', 'Freelance', 1450.00, 'income'),
  (1, '2026-03-12', 'Utilities', 240.00, 'expense'),
  (1, '2026-03-18', 'Entertainment', 96.00, 'expense'),
  (1, '2026-03-25', 'Investment', 900.00, 'expense'),
  (1, '2026-04-01', 'Salary', 6200.00, 'income'),
  (1, '2026-04-02', 'Food', 132.00, 'expense'),
  (1, '2026-04-03', 'Transport', 64.00, 'expense'),
  (1, '2026-04-05', 'Healthcare', 210.00, 'expense'),
  (1, '2026-04-07', 'Freelance', 980.00, 'income'),
  (1, '2026-04-08', 'Shopping', 320.00, 'expense'),
  (1, '2026-04-10', 'Utilities', 255.00, 'expense'),
  (1, '2026-04-12', 'Travel', 460.00, 'expense'),
  (1, '2026-04-14', 'Investment', 1150.00, 'expense'),
  (2, '2026-04-04', 'Salary', 4100.00, 'income'),
  (2, '2026-04-06', 'Food', 88.00, 'expense'),
  (2, '2026-04-09', 'Transport', 52.00, 'expense'),
  (2, '2026-04-11', 'Utilities', 140.00, 'expense');
