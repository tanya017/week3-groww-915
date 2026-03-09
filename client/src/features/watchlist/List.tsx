import React, { useEffect, useState, useCallback } from "react";
import { useUIStore } from "@/store";
import fetchScrips from "@/services/apis/list";
import { ListResponse, Scrip } from "../../shared/types";

interface ListProps {
  watchlistId: any;
  onBack?: () => void;
}

const List: React.FC<ListProps> = ({ watchlistId, onBack }) => {
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useUIStore();

  const loadDetails = useCallback(async () => {
    setLoading(true);
    try {
      await fetchScrips(
        accessToken,
        (res) => {
          setData(res);
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setLoading(false);
        },
        watchlistId,
      );
    } catch (e) {
      setLoading(false);
    }
  }, [accessToken, watchlistId]);

  useEffect(() => {
    if (watchlistId) loadDetails();
  }, [watchlistId, loadDetails]);

  if (loading) return <div style={{ padding: "20px" }}>Loading scrips...</div>;
  if (!data) {
    return (
      <div style={{ padding: "20px" }}>
        <p>No data found for Watchlist ID: {watchlistId}</p>
        <button onClick={onBack}>Go Back</button>
      </div>
    );
  }
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Header Section */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        {onBack && (
          <button
            onClick={onBack}
            style={{ marginRight: "12px", cursor: "pointer" }}
          >
            ← Back
          </button>
        )}
        <h2 style={{ margin: 0 }}>Watchlist Content ({data.scripsCount})</h2>
      </div>

      <hr style={{ border: "0.5px solid #eee", marginBottom: "20px" }} />

      {/* Scrips List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {data.scrips.map((scrip) => {
          const ltp = scrip.lastTradedPrice || scrip.previousClosePrice;
          const change = ltp - scrip.previousClosePrice;
          const isPositive = change >= 0;

          return (
            <div
              key={scrip.scripToken}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                background: "var(--bg-panel, #f9f9f9)",
                border: "1px solid var(--border, #ddd)",
                borderRadius: "8px",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                  {scrip.tradingSymbol}
                  <span
                    style={{
                      fontSize: "10px",
                      marginLeft: "8px",
                      color: "#888",
                      background: "rgba(0,0,0,0.05)",
                      padding: "2px 4px",
                      borderRadius: "4px",
                    }}
                  >
                    {scrip.exchange}
                  </span>
                </div>
                <div
                  style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}
                >
                  {scrip.segmentIndicator === "FNO"
                    ? "Option Contract"
                    : scrip.companyName}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    color: isPositive ? "#00b067" : "#ff4d4d",
                  }}
                >
                  {ltp.toFixed(2)}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: isPositive ? "#00b067" : "#ff4d4d",
                  }}
                >
                  {isPositive ? "+" : ""}
                  {change.toFixed(2)} (
                  {((change / scrip.previousClosePrice) * 100).toFixed(2)}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
