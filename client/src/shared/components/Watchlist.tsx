import fetchWatchlist from "@/services/apis/watchlist";
import { WatchlistResponse } from "../types";
import { useUIStore } from "@/store";
import { useCallback, useEffect, useState } from "react";



function Watchlist() {
  const [data, setData] = useState<WatchlistResponse>();
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  const {accessToken} = useUIStore();

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    await fetchWatchlist(
      accessToken,
      (data) => {
        setData(data);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        setError("Connection failed. Please try again.");
        console.error(err);
      }
    );
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      handleRefresh();
    }
  }, [accessToken, handleRefresh]);

  if (loading) return <div style={{ padding: "20px" }}>Loading watchlist...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  if (!data) return null; // Safety check if data is still null

  // Helper to render a list of watchlist cards
  const renderCards = (watchlists: any[], label: string) => (
    <>
      <h3 style={{ margin: "20px 0 10px", fontSize: "18px" }}>{label}</h3>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
        gap: "16px" 
      }}>
        {watchlists.map((list) => {
          const isDefault = list.watchlistId === data.defaultWatchlistId;
          
          return (
            <div 
              key={list.watchlistId} 
              style={{
                background: "var(--bg-panel, #f9f9f9)",
                border: isDefault ? "2px solid #0070f3" : "1px solid var(--border, #ddd)",
                borderRadius: "8px",
                padding: "16px",
                position: "relative"
              }}
            >
              {isDefault && (
                <span style={{ 
                  fontSize: "10px", 
                  background: "#0070f3", 
                  color: "white", 
                  padding: "2px 6px", 
                  borderRadius: "4px",
                  position: "absolute",
                  top: "-10px",
                  right: "10px"
                }}>
                  DEFAULT
                </span>
              )}
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                {list.watchlistName}
              </div>
              <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                ID: {list.watchlistId}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>My Watchlists</h2>
      <hr style={{ border: "0.5px solid #eee" }} />

      {/* Render User Defined Lists */}
      {data.userDefinedWatchlists.length > 0 ? (
        renderCards(data.userDefinedWatchlists, "Custom Lists")
      ) : (
        <p>No custom watchlists found.</p>
      )}

      {/* Render Predefined Lists */}
      {data.predefinedWatchlists.length > 0 && 
        renderCards(data.predefinedWatchlists, "System Suggested")
      }
    </div>
  );
}

export default Watchlist;