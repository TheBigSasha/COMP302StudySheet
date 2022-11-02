export const TopicCard = ({ title, children, color }) => {
  return (
    <div className="topic-card" style={{ backgroundColor: color }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
