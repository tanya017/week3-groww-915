import { useWebSocket } from "@/shared/hooks/useWebSocket";
import { Header } from "@/shared/components/Header";
import { NotificationStack } from "@/shared/components/NotificationStack";
import { DashboardPage } from "@/pages/DashboardPage";
import { PortfolioPage } from "@/features/portfolio-overview/PortfolioPage";
import { OrderBookPage } from "@/features/order-book/OrderBookPage";
import { WatchlistPage } from "@/features/dashboard/WatchlistPage";
import { useUIStore } from "@/store/ui.store";
import Loader from "./shared/components/Loader";
import LoginPage from "./pages/LoginPage";
import ValidateOtp from "./shared/components/ValidateOtp";
import Watchlist from "@/features/watchlist/Watchlist";
import List from "@/features/watchlist/List";
import IndicesPage from "./pages/IndicesPage";


export default function App() {
  // Starts WebSocket connection — runs once on mount
  useWebSocket();

  const activeTab = useUIStore((s) => s.activeTab);
  const accessToken = useUIStore((s) => s.accessToken);
  const watchlistId = useUIStore((s) => s.watchlistId);
  const setActiveTab = useUIStore((s) => s.setActiveTab);

  const renderTab = () => {
    if (!accessToken && !["login", "preAuth", "validate"].includes(activeTab)) {
      return <LoginPage />;
    }
    switch (activeTab) {
      case "dashboard":  return <DashboardPage />;
      case "portfolio":  return <PortfolioPage />;
      case "login":     return <LoginPage />;
      case "orderbook":  return <OrderBookPage />;
      case "watchlist":  return <WatchlistPage />;
      case "watchlistAPI":  return <Watchlist />;
      case "preAuth":    return <Loader />;
      case "validate":    return <ValidateOtp />;
      case "list":       return <List watchlistId={watchlistId} onBack={() => setActiveTab('watchlistAPI')}/>;
      case "indices":   return <IndicesPage />;
      default:           return <DashboardPage />;
    }
    
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100vh", overflow: "hidden",
      background: "var(--bg-void)",
    }}>
      <Header />

      {/* Tab content */}
      <main style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        {renderTab()}
      </main>

      {/* Footer */}
      <footer style={{
        padding: "4px 20px",
        borderTop: "1px solid var(--border)",
        background: "var(--bg-panel)",
        display: "flex", justifyContent: "space-between",
        fontSize: "9px", color: "var(--text-muted)",
        fontFamily: "var(--font-mono)", letterSpacing: "0.5px",
        flexShrink: 0,
      }}>
        <span>ws://localhost:8080</span>
        <span>Groww-915 · Simulated data — for learning only</span>
      </footer>

      <NotificationStack />
    </div>
  );
}


