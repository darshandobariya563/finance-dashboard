# Financial Dashboard

## Overview

This project is an industry-standard financial dashboard web application built with React and Vite. It provides a responsive, role-aware workspace for tracking transactions, reviewing summaries, exploring monthly trends, and reading dynamic spending insights.

## Features Implemented

- Role-based access control with `Admin` and `Viewer` modes
- Add, edit, and delete transactions in Admin mode
- View-only protection in Viewer mode
- Dashboard summaries for total income, total expense, and balance
- Transaction filtering by category, type, date range, and search
- Transaction sorting by date, amount, and category
- Dynamic insight engine for top spend category, monthly change, savings rate, and largest movement
- Responsive charts for expense mix and income-vs-expense trends
- LocalStorage persistence for transactions, theme, and role
- Loading state, empty states, export to CSV/JSON, and dark mode
- SQL schema and seed data for future backend integration

## Tech Stack

- React 18
- Vite 5
- React Router
- Context API with reducer-based state updates
- Plain CSS with responsive layout and theme variables
- SQL schema targeting MySQL-compatible syntax

## Project Setup

```bash
npm install
npm start
```

or

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Assignment Coverage

This dashboard covers all core requirements from the assignment:

- Dashboard overview with summary cards for balance, income, and expenses
- Time-based visualization through the monthly income-vs-expense trend chart
- Categorical visualization through the expense breakdown chart
- Transactions section with date, amount, category, and type
- Filtering, sorting, and search in the transactions table
- Frontend-only role simulation using `Viewer` and `Admin`
- Dynamic insights for top category, monthly comparison, savings health, and largest transaction
- Responsive layout, loading state, and empty-state handling

Optional enhancements included:

- Dark mode
- LocalStorage persistence
- Export to CSV/JSON
- Smooth UI transitions and polished responsive interactions

## State Management Approach

The application uses a single `AppContext` provider backed by a reducer. This keeps cross-cutting dashboard state centralized while still allowing UI components to remain modular.

State includes:

- `transactions`
- `role`
- `filters`
- `theme`
- `loading`

The context exposes business actions such as:

- `saveTransaction`
- `removeTransaction`
- `updateFilters`
- `resetFilters`
- `setRole`
- `toggleTheme`

## Data Flow

1. On startup, the app loads persisted data from LocalStorage and falls back to mock transaction data.
2. Context stores the canonical transaction list and UI state.
3. Custom hooks derive filtered transactions, summary totals, chart data, and insights.
4. Dashboard components consume only the data they need.
5. Admin actions update context, which immediately refreshes summaries, insights, and table views.

## Insights Logic

The insight engine is built from utility functions in `src/utils/calculations.js`.

- Highest spending category is calculated from grouped expense totals.
- Monthly comparison compares the latest month in the current dataset against the previous one.
- Savings rate is computed from income versus remaining balance.
- Largest transaction identifies the biggest movement in the current filtered view.

All insights automatically respond to filter changes and transaction edits.

## Assumptions

- The frontend uses mock data and LocalStorage persistence instead of a live API so the project runs immediately after install.
- SQL files are included as a production-ready database design and seed layer for future backend integration.
- A root `index.html` was added because Vite requires it to run normally. The requested `public/index.html` is still included in the structure, and `publicDir` is disabled in `vite.config.js` to avoid build conflicts.
- Currency formatting is displayed in INR with the `₹` symbol for consistency across the dashboard experience.

## Database Files

- `database/schema.sql` defines `users` and `transactions` tables with constraints and foreign keys.
- `database/sample-data.sql` seeds one admin, one standard user, and realistic income and expense records.
