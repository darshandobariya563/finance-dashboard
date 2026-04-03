import Card from '../common/Card';
import { formatCurrency } from '../../utils/calculations';

function IncomeExpenseChart({ monthlySeries }) {
  const maxValue = Math.max(
    ...monthlySeries.flatMap((entry) => [entry.income, entry.expense]),
    1,
  );

  if (!monthlySeries.length) {
    return (
      <Card title="Income vs expense trend" subtitle="Monthly comparison">
        <div className="empty-state">
          <p>Add more transactions to visualize monthly trends.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Income vs expense trend"
      subtitle="Monthly comparison based on the current dataset"
    >
      <div className="trend-chart__legend">
        <span>
          <i className="trend-chart__legend-dot trend-chart__legend-dot--income" />
          Income
        </span>
        <span>
          <i className="trend-chart__legend-dot trend-chart__legend-dot--expense" />
          Expense
        </span>
      </div>

      <div className="trend-chart">
        {monthlySeries.map((entry) => (
          <div key={entry.key} className="trend-chart__group">
            <div className="trend-chart__bars">
              <div
                className="trend-chart__bar trend-chart__bar--income"
                style={{ height: `${(entry.income / maxValue) * 100}%` }}
                title={`Income: ${formatCurrency(entry.income)}`}
              />
              <div
                className="trend-chart__bar trend-chart__bar--expense"
                style={{ height: `${(entry.expense / maxValue) * 100}%` }}
                title={`Expense: ${formatCurrency(entry.expense)}`}
              />
            </div>
            <div className="trend-chart__footer">
              <strong>{entry.label}</strong>
              <span>{formatCurrency(entry.income - entry.expense)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default IncomeExpenseChart;
