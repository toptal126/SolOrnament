import React from "react";
import { Link } from "react-router-dom";
import { useSettingsStore } from "@stores/settingsStore";
import {
  WalletIcon,
  BellAlertIcon,
  ChartBarIcon,
  ClockIcon,
  CubeIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
  ArrowRightCircleIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

const IndexPage: React.FC = () => {
  const { version } = useSettingsStore();

  const features = [
    {
      title: "Wallet Scanner",
      description:
        "Monitor multiple Solana wallet addresses simultaneously with real-time balance updates.",
      icon: WalletIcon,
      link: "/wallet",
      color: "from-cyan-400 to-teal-400",
    },
    {
      title: "Price Alerts",
      description:
        "Set custom price alerts for SOL with desktop notifications.",
      icon: BellAlertIcon,
      link: "/alerts",
      color: "from-pink-400 to-yellow-400",
    },
  ];

  const roadmapItems = [
    {
      quarter: "Q3 2025",
      icon: ChartBarIcon,
      color: "text-cyan-400",
      items: [
        {
          text: "Token balance tracking and analytics",
          link: "/wallet",
          icon: FireIcon,
        },
        {
          text: "Transaction history viewer",
          link: "/transactions",
          icon: ClockIcon,
        },
        {
          text: "Custom RPC endpoint support",
          link: "/settings",
          icon: SparklesIcon,
        },
      ],
    },
    {
      quarter: "Q4 2025",
      icon: CubeIcon,
      color: "text-pink-400",
      items: [
        { text: "NFT portfolio tracking", link: "/nft", icon: CubeIcon },
        { text: "DeFi position monitoring", link: "/defi", icon: ChartBarIcon },
        {
          text: "Advanced price analytics",
          link: "/analytics",
          icon: ArrowRightCircleIcon,
        },
      ],
    },
    {
      quarter: "Q1 2026",
      icon: GlobeAltIcon,
      color: "text-yellow-400",
      items: [
        { text: "Multi-chain support", link: "/chains", icon: GlobeAltIcon },
        {
          text: "Portfolio performance analytics",
          link: "/portfolio",
          icon: ChartBarIcon,
        },
        {
          text: "Mobile application",
          link: "/mobile",
          icon: DevicePhoneMobileIcon,
        },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#181c24] via-[#23272f] to-[#1a1d24]">
      {/* Decorative blurred blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-cyan-400 to-teal-400 opacity-30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-tr from-pink-400 to-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-gradient-to-tr from-[#00d1b2] to-[#00b4d8] opacity-20 rounded-full blur-2xl animate-pulse z-0" />

      <div className="relative z-10 index-page p-8 max-w-6xl mx-auto">
        <div className="welcome-section mb-16 text-center">
          <div className="flex justify-center mb-4">
            <SparklesIcon className="w-12 h-12 text-cyan-400 animate-bounce drop-shadow-lg" />
          </div>
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#00d1b2] via-[#00b4d8] to-[#fbbf24] bg-clip-text text-transparent drop-shadow-lg tracking-tight">
            Welcome to SolOrnament
          </h1>
          <p className="text-2xl mb-8 text-gray-200 max-w-3xl mx-auto font-light">
            Your comprehensive{" "}
            <span className="text-[#00d1b2] font-semibold">Solana</span> wallet
            management and monitoring solution.
          </p>
          <div className="flex gap-6 justify-center">
            <Link
              to="/wallet"
              className="btn px-10 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-[#00d1b2] via-[#00b4d8] to-[#fbbf24] text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 animate-glow"
              style={{
                boxShadow: "0 0 24px 4px #00d1b2, 0 0 48px 8px #fbbf24",
              }}
            >
              <WalletIcon className="w-6 h-6 inline-block mr-2 -mt-1" />
              Start Scanning
            </Link>
            <a
              href="https://github.com/toptal126/SolOrnament"
              target="_blank"
              rel="noopener noreferrer"
              className="btn px-10 py-4 rounded-xl font-bold text-lg bg-[#23272f] text-white border border-[#00d1b2] hover:bg-[#00d1b2] hover:text-black hover:scale-105 transition-all duration-300"
            >
              <ArrowRightCircleIcon className="w-6 h-6 inline-block mr-2 -mt-1" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="features-section mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent tracking-tight">
            Current Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className={`feature-card group p-8 rounded-2xl bg-gradient-to-br ${feature.color} shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-white/10 relative overflow-hidden`}
              >
                <div className="absolute right-4 top-4 opacity-10">
                  <feature.icon className="w-20 h-20" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <feature.icon className="w-10 h-10 text-white drop-shadow-lg" />
                  <h3 className="text-2xl font-bold text-white group-hover:text-yellow-200 transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-white/90 text-lg font-light">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="roadmap-section">
          <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent tracking-tight">
            Roadmap
          </h2>
          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className="roadmap-item p-8 rounded-2xl bg-gradient-to-br from-[#23272f] to-[#181c24] shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 border border-white/10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <item.icon
                    className={`w-8 h-8 ${item.color} drop-shadow-lg`}
                  />
                  <h3 className="text-2xl font-bold text-white">
                    {item.quarter}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {item.items.map((roadmapItem, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-3 text-white/90 text-lg hover:text-yellow-200 transition-colors"
                    >
                      <roadmapItem.icon className="w-6 h-6 text-yellow-300" />
                      <Link to={roadmapItem.link} className="hover:underline">
                        {roadmapItem.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="version-info mt-12 text-center">
          <p className="text-gray-400 text-sm tracking-widest">
            Version {version}
          </p>
        </div>
      </div>
      {/* Extra fancy animated gradient border at the bottom */}
      <div className="absolute left-0 right-0 bottom-0 h-2 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 animate-pulse" />
    </div>
  );
};

export default IndexPage;
