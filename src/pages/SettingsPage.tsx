import React from "react";
import { useSettingsStore } from "../stores/settingsStore";

const SettingsPage: React.FC = () => {
  const { priceUpdateInterval, setPriceUpdateInterval } = useSettingsStore();

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Price Update Interval (seconds)
          </label>
          <input
            type="number"
            value={priceUpdateInterval}
            onChange={(e) => setPriceUpdateInterval(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg bg-[#23272f] border-[#3a3f4b] text-white"
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
