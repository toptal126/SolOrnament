import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { startPricePolling, stopPricePolling } from "@services/priceService";
import { useSettingsStore } from "@stores/settingsStore";
import Layout from "./components/Layout";
import WalletScannerPage from "./pages/WalletScannerPage";
import PriceAlertsPage from "./pages/PriceAlertsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const priceUpdateInterval = useSettingsStore((s) => s.priceUpdateInterval);

  useEffect(() => {
    startPricePolling(priceUpdateInterval);
    return () => stopPricePolling();
  }, [priceUpdateInterval]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/wallet" replace />} />
          <Route path="wallet" element={<WalletScannerPage />} />
          <Route path="alerts" element={<PriceAlertsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
