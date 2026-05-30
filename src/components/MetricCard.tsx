type MetricCardProps = {
  title: string;
  value: string;
};

export function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        minWidth: "200px",
      }}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}