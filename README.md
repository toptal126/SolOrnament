# SolOrnament

A Swiss Army Knife for Solana - A comprehensive toolkit for Solana blockchain interactions.

## Features

- Multi-wallet balance scanner
  - Enter multiple Solana wallet addresses (one per line)
  - Fetches and displays SOL balances for each address
  - Real-time SOL price from CoinGecko with USD value conversion
  - Export results to CSV
- Dark/Light theme support
- Modern, responsive UI

## Getting Started

1. Clone the repo
2. Install dependencies: `yarn install` or `npm install`
3. Set your Solana RPC URL in `.env` as `VITE_SOLANA_RPC_URL`
4. Run the app: `yarn dev` or `npm run dev`

## APIs Used

- [CoinGecko Simple Price API](https://www.coingecko.com/en/api/documentation) for real-time SOL/USD price
- Solana Web3.js for blockchain interactions

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT

## Author

Created by [@web3_pop](https://twitter.com/web3_pop)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
