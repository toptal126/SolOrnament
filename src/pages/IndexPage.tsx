import React from "react";
import { Link } from "react-router-dom";

const IndexPage: React.FC = () => {
  return (
    <div className="index-page p-8 max-w-4xl mx-auto">
      <div className="welcome-section mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[#00d1b2]">
          Welcome to SolOrnament
        </h1>
        <p className="text-xl mb-6 text-gray-300">
          Your comprehensive Solana wallet management and monitoring solution
        </p>
        <div className="flex gap-4">
          <Link to="/wallet" className="btn">
            Start Scanning
          </Link>
          <a
            href="https://github.com/yourusername/wallet-scanner"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className="features-section mb-12">
        <h2 className="text-2xl font-bold mb-4 text-[#00d1b2]">
          Current Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card p-6 bg-[#23272f] rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Wallet Scanner</h3>
            <p className="text-gray-300">
              Monitor multiple Solana wallet addresses simultaneously with
              real-time balance updates
            </p>
          </div>
          <div className="feature-card p-6 bg-[#23272f] rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Price Alerts</h3>
            <p className="text-gray-300">
              Set custom price alerts for SOL with desktop notifications
            </p>
          </div>
        </div>
      </div>

      <div className="roadmap-section">
        <h2 className="text-2xl font-bold mb-4 text-[#00d1b2]">Roadmap</h2>
        <div className="space-y-4">
          <div className="roadmap-item p-4 bg-[#23272f] rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Q2 2024</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Token balance tracking and analytics</li>
              <li>Transaction history viewer</li>
              <li>Custom RPC endpoint support</li>
            </ul>
          </div>
          <div className="roadmap-item p-4 bg-[#23272f] rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Q3 2024</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>NFT portfolio tracking</li>
              <li>DeFi position monitoring</li>
              <li>Advanced price analytics</li>
            </ul>
          </div>
          <div className="roadmap-item p-4 bg-[#23272f] rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Q4 2024</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Multi-chain support</li>
              <li>Portfolio performance analytics</li>
              <li>Mobile application</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="version-info mt-8 text-center text-gray-400">
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
};

export default IndexPage;
