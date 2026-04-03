import Card from '../common/Card';

function Insights({ insights }) {
  return (
    <div className="insights-grid">
      {insights.map((insight) => (
        <Card
          key={insight.id}
          title={insight.title}
          className={`insight-card insight-card--${insight.tone}`}
        >
          <p>{insight.description}</p>
        </Card>
      ))}
    </div>
  );
}

export default Insights;
