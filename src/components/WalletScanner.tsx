import { useWalletScannerStore } from "../stores/walletScannerStore";
import { useSettingsStore } from "../stores/settingsStore";
import { usePriceStore } from "@stores/priceStore";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "../components/styles/button.css";

const WalletScanner: React.FC = () => {
  const addresses = useWalletScannerStore((s) => s.addresses);
  const balances = useWalletScannerStore((s) => s.balances);
  const loading = useWalletScannerStore((s) => s.loading);
  const error = useWalletScannerStore((s) => s.error);
  const setAddresses = useWalletScannerStore((s) => s.setAddresses);
  const setBalances = useWalletScannerStore((s) => s.setBalances);
  const setLoading = useWalletScannerStore((s) => s.setLoading);
  const setError = useWalletScannerStore((s) => s.setError);
  const reset = useWalletScannerStore((s) => s.reset);
  const solPrice = usePriceStore((s) => s.currentPrice);
  const customRpcUrl = useSettingsStore((s) => s.customRpcUrl);

  const connection = new Connection(
    customRpcUrl || import.meta.env.VITE_SOLANA_RPC_URL
  );

  const fetchBalances = async () => {
    setLoading(true);
    setError("");
    setBalances([]);
    try {
      const addressList = addresses
        .split("\n")
        .map((addr) => addr.trim())
        .filter((addr) => addr.length > 0);
      const balancePromises = addressList.map(async (address) => {
        try {
          const pubKey = new PublicKey(address);
          const balance = await connection.getBalance(pubKey);
          return {
            address,
            balance: balance / LAMPORTS_PER_SOL,
          };
        } catch (err) {
          return {
            address,
            balance: -1, // Invalid address
          };
        }
      });
      const results = await Promise.all(balancePromises);
      setBalances(results);
    } catch (err) {
      setError("Error fetching balances. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["Address", "Balance (SOL)", "USD Value"];
    const csvRows = [headers.join(",")];
    balances.forEach(({ address, balance }) => {
      const usdValue =
        balance === -1 || solPrice === null
          ? "-"
          : (balance * solPrice).toFixed(2);
      csvRows.push(
        `${address},${
          balance === -1 ? "Invalid address" : balance.toFixed(4)
        },${usdValue}`
      );
    });
    if (solPrice !== null) {
      csvRows.unshift(`SOL Price (USD):,${solPrice}`);
    }
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `solana-balances-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>Solana Wallet Balance Scanner</h2>
      <div className="input-section flex gap-3 mb-4">
        <textarea
          value={addresses}
          onChange={(e) => setAddresses(e.target.value)}
          placeholder="Enter Solana wallet addresses (one per line)"
          rows={5}
          className="flex-1 min-w-0 bg-[#23272f] text-white border-2 border-[#00d1b2] rounded-lg p-3 resize-y"
        />
        <div className="flex flex-col gap-2">
          <button
            onClick={fetchBalances}
            disabled={loading || !addresses.trim()}
            className="btn w-40"
          >
            {loading ? "Fetching..." : "Fetch Balances"}
          </button>
          <button
            onClick={reset}
            disabled={loading}
            className="btn btn-secondary"
          >
            Reset
          </button>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      {balances.length > 0 && (
        <div className="results">
          <div className="results-header">
            <h3>Results:</h3>
            <button onClick={exportToCSV} className="export-button">
              Export CSV
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Address</th>
                <th>Balance (SOL)</th>
                <th>USD Value</th>
              </tr>
            </thead>
            <tbody>
              {balances.map(({ address, balance }) => (
                <tr key={address}>
                  <td>{address}</td>
                  <td>
                    {balance === -1 ? (
                      <span className="error">Invalid address</span>
                    ) : (
                      balance.toFixed(4)
                    )}
                  </td>
                  <td>
                    {balance === -1 || solPrice === null
                      ? "-"
                      : `$${(balance * solPrice).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WalletScanner;
