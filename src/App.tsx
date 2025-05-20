import { useState } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "./App.css";

type SortDirection = "asc" | "desc" | null;

function App() {
  const [addresses, setAddresses] = useState("");
  const [balances, setBalances] = useState<
    { address: string; balance: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const connection = new Connection(import.meta.env.VITE_SOLANA_RPC_URL);

  const fetchBalances = async () => {
    setLoading(true);
    setError("");
    setBalances([]);
    setSortDirection(null);

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = () => {
    if (sortDirection === null) {
      setSortDirection("desc");
    } else if (sortDirection === "desc") {
      setSortDirection("asc");
    } else {
      setSortDirection(null);
    }

    setBalances((prev) => {
      const sorted = [...prev].sort((a, b) => {
        if (a.balance === -1) return 1;
        if (b.balance === -1) return -1;
        return sortDirection === "desc"
          ? b.balance - a.balance
          : a.balance - b.balance;
      });
      return sorted;
    });
  };

  const exportToCSV = () => {
    const headers = ["Address", "Balance (SOL)"];
    const csvContent = [
      headers.join(","),
      ...balances.map(
        ({ address, balance }) =>
          `${address},${
            balance === -1 ? "Invalid address" : balance.toFixed(4)
          }`
      ),
    ].join("\n");

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
    <div className="container">
      <h1>Solana Wallet Balance Scanner</h1>
      <div className="input-section">
        <textarea
          value={addresses}
          onChange={(e) => setAddresses(e.target.value)}
          placeholder="Enter Solana wallet addresses (one per line)"
          rows={5}
        />
        <button onClick={fetchBalances} disabled={loading || !addresses.trim()}>
          {loading ? "Fetching..." : "Fetch Balances"}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {balances.length > 0 && (
        <div className="results">
          <div className="results-header">
            <h2>Results:</h2>
            <button onClick={exportToCSV} className="export-button">
              Export CSV
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Address</th>
                <th className="sortable" onClick={handleSort}>
                  Balance (SOL)
                  {sortDirection && (
                    <span className="sort-indicator">
                      {sortDirection === "desc" ? " ↓" : " ↑"}
                    </span>
                  )}
                </th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
