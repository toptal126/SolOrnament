import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { startPricePolling, stopPricePolling } from "@services/priceService";
import { useSettingsStore } from "@stores/settingsStore";
import Layout from "./components/Layout";
import WalletScannerPage from "./pages/WalletScannerPage";
import PriceAlertsPage from "./pages/PriceAlertsPage";
import SettingsPage from "./pages/SettingsPage";
import IndexPage from "./pages/IndexPage";

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
          <Route index element={<IndexPage />} />
          <Route path="wallet" element={<WalletScannerPage />} />
          <Route path="alerts" element={<PriceAlertsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
