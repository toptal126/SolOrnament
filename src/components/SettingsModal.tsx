import React, { useRef } from "react";
import { useSettingsStore } from "../stores/settingsStore";
import type { Theme } from "../stores/settingsStore";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const priceUpdateInterval = useSettingsStore((s) => s.priceUpdateInterval);
  const setPriceUpdateInterval = useSettingsStore(
    (s) => s.setPriceUpdateInterval
  );
  const customRpcUrl = useSettingsStore((s) => s.customRpcUrl);
  const setCustomRpcUrl = useSettingsStore((s) => s.setCustomRpcUrl);
  const resetSettings = useSettingsStore((s) => s.resetSettings);
  const importSettings = useSettingsStore((s) => s.importSettings);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  // Export settings as JSON
  const handleExport = () => {
    const settings = {
      theme,
      priceUpdateInterval,
      customRpcUrl,
    };
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "solornament-settings.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import settings from JSON
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        importSettings(data);
        alert("Settings imported!");
      } catch {
        alert("Invalid settings file.");
      }
    };
    reader.readAsText(file);
  };

  // Reset all settings
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all settings?")) {
      resetSettings();
      alert("Settings reset!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h3>Settings</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            marginTop: "1rem",
          }}
        >
          <div>
            <label>Theme:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label>Price Update Interval (seconds):</label>
            <input
              type="number"
              min={5}
              max={300}
              value={priceUpdateInterval / 1000}
              onChange={(e) =>
                setPriceUpdateInterval(Number(e.target.value) * 1000)
              }
              style={{ width: 80, marginLeft: 8 }}
            />
          </div>
          <div>
            <label>Custom Solana RPC URL:</label>
            <input
              type="text"
              value={customRpcUrl}
              onChange={(e) => setCustomRpcUrl(e.target.value)}
              placeholder="https://..."
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={handleExport}>Export Settings</button>
            <button onClick={() => fileInputRef.current?.click()}>
              Import Settings
            </button>
            <input
              type="file"
              accept="application/json"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImport}
            />
            <button
              onClick={handleReset}
              style={{ marginLeft: "auto", color: "#ff4b6b" }}
            >
              Remove Everything
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
