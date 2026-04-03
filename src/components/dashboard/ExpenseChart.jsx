import Card from '../common/Card';
import { formatCurrency } from '../../utils/calculations';

function ExpenseChart({ expenseByCategory }) {
  const totalExpense = expenseByCategory.reduce(
    (sum, item) => sum + item.total,
    0,
  );

  if (!expenseByCategory.length) {
    return (
      <Card
        title="Expense mix"
        subtitle="Share of expense categories in the current view"
      >
        <div className="empty-state">
          <p>No expense data matches the selected filters.</p>
        </div>
      </Card>
    );
  }

  let progress = 0;
  const gradient = expenseByCategory
    .map((item) => {
      const start = progress;
      const slice = (item.total / totalExpense) * 100;
      progress += slice;
      return `${item.color} ${start}% ${progress}%`;
    })
    .join(', ');

  return (
    <Card
      title="Expense mix"
      subtitle="Share of expense categories in the current view"
    >
      <div className="expense-chart">
        <div
          className="expense-chart__donut"
          style={{ background: `conic-gradient(${gradient})` }}
        >
          <div className="expense-chart__center">
            <span>Total expense</span>
            <strong>{formatCurrency(totalExpense)}</strong>
          </div>
        </div>

        <div className="expense-chart__legend">
          {expenseByCategory.slice(0, 6).map((item) => (
            <div key={item.category} className="legend-item">
              <div className="legend-item__label">
                <span
                  className="legend-item__swatch"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.category}</span>
              </div>
              <strong>{formatCurrency(item.total)}</strong>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default ExpenseChart;
