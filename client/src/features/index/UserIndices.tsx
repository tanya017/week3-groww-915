import { IndexItem } from "@/shared/types/index";

interface UserProps {
  data: IndexItem[];
}

const UserIndices: React.FC<UserProps> = ({ data }) => {
  const indices = data || [];

  if (indices.length === 0) return null;

  return (
    <div style={containerStyle}>
      <div style={headerRowStyle}>
        <h2 style={titleStyle}>MY WATCHLIST</h2>
        <span style={countStyle}>{indices.length} SELECTED</span>
      </div>

      <div style={gridStyle}>
        {indices.map((item, idx) => (
          <div key={item.indexToken || idx} style={cardStyle}>
            <div style={topRowStyle}>
              <span style={nameStyle}>{item.indexName}</span>
              <span style={exchangeBadgeStyle}>{item.exchange}</span>
            </div>

            <div style={bottomRowStyle}>
              <span style={symbolStyle}>{item.symbolName}</span>
              <div style={statusDotStyle} />
              <span style={segmentStyle}>
                {item.exchangeSegment?.replace("_", " ").toUpperCase() || ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserIndices;



const containerStyle: React.CSSProperties = {
  padding: "24px",
  backgroundColor: "var(--bg-page, #0b0e11)",
};

const headerRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
  borderLeft: "4px solid var(--accent, #00d09c)",
  paddingLeft: "12px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 700,
  letterSpacing: "1px",
  color: "var(--text-main, #fff)",
  margin: 0,
};

const countStyle: React.CSSProperties = {
  fontSize: "10px",
  color: "var(--text-muted, #848e9c)",
  fontWeight: "bold",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "12px",
};

const cardStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, #1e2329, #161a1e)",
  border: "1px solid #2b3139",
  borderRadius: "8px",
  padding: "16px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const topRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
};

const nameStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 600,
  color: "#eaecef",
};

const exchangeBadgeStyle: React.CSSProperties = {
  fontSize: "10px",
  background: "#2b3139",
  padding: "2px 6px",
  borderRadius: "4px",
  color: "#929aa5",
};

const bottomRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const symbolStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "var(--accent, #00d09c)",
  fontWeight: 500,
};

const statusDotStyle: React.CSSProperties = {
  width: "4px",
  height: "4px",
  borderRadius: "50%",
  background: "#474d57",
};

const segmentStyle: React.CSSProperties = {
  fontSize: "10px",
  color: "#848e9c",
};
