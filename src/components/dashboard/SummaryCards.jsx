import Card from '../common/Card';
import { SUMMARY_CARD_CONFIG } from '../../utils/constants';
import {
  formatCurrency,
  formatPercent,
  getSavingsRate,
} from '../../utils/calculations';

function SummaryCards({ totals, resultCount, totalCount }) {
  const savingsRate = getSavingsRate([
    { type: 'income', amount: totals.income },
    { type: 'expense', amount: totals.expense },
  ]);

  return (
    <div className="summary-grid">
      {SUMMARY_CARD_CONFIG.map((item) => {
        const value = totals[item.key];
        const helperText =
          item.key === 'income'
            ? `${resultCount} of ${totalCount} transactions currently in view`
            : item.key === 'expense'
              ? `Savings rate: ${formatPercent(savingsRate)}`
              : totals.balance >= 0
                ? 'Healthy positive cashflow'
                : 'Expenses are ahead of income';

        return (
          <Card key={item.key} className={`summary-card summary-card--${item.tone}`}>
            <div
              className="summary-card__accent"
              style={{ background: item.accent }}
            />
            <p className="summary-card__label">{item.title}</p>
            <strong className="summary-card__value">{formatCurrency(value)}</strong>
            <p className="summary-card__helper">{helperText}</p>
          </Card>
        );
      })}
    </div>
  );
}

export default SummaryCards;
