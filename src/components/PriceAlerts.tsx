import { useState, useEffect } from "react";
import {
  usePriceStore,
  startPricePolling,
  stopPricePolling,
} from "../services/priceService";
import "../components/styles/button.css";

const PriceAlerts = () => {
  const { currentPrice, alerts, addAlert, removeAlert } = usePriceStore();
  const [alertType, setAlertType] = useState<"above" | "below" | "percent">(
    "above"
  );
  const [alertValue, setAlertValue] = useState("");
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    // Request notification permission
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    } else {
      setNotificationPermission(Notification.permission);
    }

    // Start price polling
    startPricePolling();

    return () => {
      stopPricePolling();
    };
  }, []);

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(alertValue);
    if (isNaN(value) || value <= 0) return;

    addAlert({
      type: alertType,
      value,
    });

    setAlertValue("");
  };

  return (
    <div className="price-alerts">
      <h2>Price Alerts</h2>

      {notificationPermission !== "granted" && (
        <div className="notification-prompt">
          <p>Enable notifications to receive price alerts</p>
          <button
            onClick={() => {
              Notification.requestPermission().then((permission) => {
                setNotificationPermission(permission);
              });
            }}
          >
            Enable Notifications
          </button>
        </div>
      )}

      <form onSubmit={handleAddAlert} className="alert-form flex gap-3 mb-4">
        <div className="form-group flex-1 min-w-0">
          <label>Alert Type:</label>
          <select
            value={alertType}
            onChange={(e) =>
              setAlertType(e.target.value as "above" | "below" | "percent")
            }
            className="bg-[#23272f] text-white border-2 border-[#00d1b2] rounded-lg p-2"
          >
            <option value="above">Price Above</option>
            <option value="below">Price Below</option>
            <option value="percent">Percentage Change</option>
          </select>
        </div>

        <div className="form-group flex-1 min-w-0">
          <label>Value:</label>
          <input
            type="number"
            value={alertValue}
            onChange={(e) => setAlertValue(e.target.value)}
            placeholder={
              alertType === "percent" ? "Percentage" : "Price in USD"
            }
            step="any"
            required
            className="bg-[#23272f] text-white border-2 border-[#00d1b2] rounded-lg p-2"
          />
        </div>

        <button type="submit" className="btn" disabled={!alertValue.trim()}>
          Add Alert
        </button>
      </form>

      <div className="alerts-list">
        {alerts.length === 0 ? (
          <p>No active alerts</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert-item ${alert.triggered ? "triggered" : ""}`}
            >
              <div className="alert-info">
                <span>
                  {alert.type === "above"
                    ? `Price above $${alert.value}`
                    : alert.type === "below"
                    ? `Price below $${alert.value}`
                    : `${alert.value}% change`}
                </span>
                {alert.triggered && (
                  <span className="triggered-badge">Triggered</span>
                )}
              </div>
              <button
                onClick={() => removeAlert(alert.id)}
                className="btn btn-secondary"
                disabled={alert.triggered}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PriceAlerts;
