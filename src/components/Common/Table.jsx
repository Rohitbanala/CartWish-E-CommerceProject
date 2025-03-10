import "./Table.css";
export default function TableComponent({ headings, children }) {
  return (
    <table className="common_table">
      <thead>
        {headings.map((item, index) => (
          <th key={index}>{item}</th>
        ))}
      </thead>
      {children}
    </table>
  );
}
