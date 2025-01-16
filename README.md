# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Crypto Tracker

## Overview
Crypto Tracker is a web application designed to provide users with an interactive platform for monitoring cryptocurrency data. The app displays detailed information about cryptocurrencies, including price, market cap, 24-hour changes, circulating supply, and more. The app fetches live data from CoinMarketCap and organizes it into a clean and responsive interface.

This project consists of a **frontend** built with React and Ant Design and a **backend** built with FastAPI for fetching cryptocurrency data from the CoinMarketCap API.

---

## Frontend Functionality

### Components

1. **CryptoCurrencyCard**:
   - Displays detailed information about the selected cryptocurrency, including:
     - Rank
     - Price
     - Market cap
     - 24-hour percentage change
     - Circulating and max supply
     - Date added and last updated
   - Fetches images dynamically from CoinMarketCap using the cryptocurrency's ID.
   - Provides a "More" link to view additional details on the CoinMarketCap website.

2. **Menu Component**:
   - Lists all available cryptocurrencies retrieved from the backend.
   - Allows users to select a cryptocurrency to view its details in the CryptoCurrencyCard.

3. **Spinner**:
   - Displays a loading spinner when fetching data.

### Utility Hook: `useFormatter`
- **Functions**:
  - `formatNumber`: Formats large numbers into readable formats with suffixes (e.g., K, M, B).
  - `formatPrice`: Formats prices to two decimal places or five decimal places for prices under 1.
  - `formatDate`: Extracts the date (YYYY-MM-DD) from a timestamp.
  - `formatDateTime`: Formats a timestamp into a human-readable date and time.

### API Integration
- The `urlsApi` object defines:
  - `currencies`: A link to CoinMarketCap's website for detailed cryptocurrency information.
  - `cryptocurrencies`: The backend endpoint for fetching cryptocurrency data.

### Application State
- **React State**:
  - `cryptosData`: Stores cryptocurrency data fetched from the backend.
  - `cryptoMenu`: Stores menu items for listing cryptocurrencies.
  - `selectedCrypto`: Stores the currently selected cryptocurrency.
- **API Fetching**:
  - Data is fetched using Axios from the backend's `/cryptocurrencies` endpoint.

### Running the Frontend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

---

## Backend Functionality

### Overview
The backend is built using FastAPI and serves as the intermediary between the frontend and the CoinMarketCap API. It provides endpoints for retrieving cryptocurrency listings and specific cryptocurrency data.

### Configuration
- **Environment Variables**:
  - The CoinMarketCap API key is stored in a `.env` file and loaded using `pydantic`'s `BaseSettings`.

  Example `.env` file:
  ```
  COINMARKET_CAP_KEY=your_api_key_here
  ```

### Classes

1. **Settings**:
   - Loads environment variables using `pydantic`.

2. **HttpClient**:
   - Configures an HTTP client with headers for accessing the CoinMarketCap API.

3. **CMCHTTPClient**:
   - Extends `HttpClient` to provide specific methods for:
     - Fetching cryptocurrency listings (`get_listing`).
     - Fetching details of a specific cryptocurrency (`get_currency`).

### FastAPI App

1. **CORS Configuration**:
   - Allows requests from the frontend running on:
     - `http://localhost:5173`
     - `http://127.0.0.1:5173`

2. **Routes**:
   - `/cryptocurrencies`: Fetches the latest cryptocurrency listings.
   - `/cryptocurrencies/{currency_id}`: Fetches data for a specific cryptocurrency.

### Running the Backend
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the backend server:
   ```bash
   uvicorn src.main:app --reload
   ```

---

## Full Application Workflow

1. The **frontend** fetches data from the backend's `/cryptocurrencies` endpoint.
2. The **backend** retrieves cryptocurrency data from the CoinMarketCap API using the configured `CMCHTTPClient`.
3. Data is displayed in the frontend through the `CryptoCurrencyCard` and menu components.
4. Users can view detailed cryptocurrency information or navigate to the CoinMarketCap website for more details.

---

## Technologies Used

- **Frontend**:
  - React
  - Ant Design
  - Axios
  - Tailwind CSS
- **Backend**:
  - FastAPI
  - Aiohttp
  - Pydantic
- **Deployment**:
  - GitHub Pages (Frontend)
  - Uvicorn (Backend)

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/oleksiiruzhytskiy/crypto_tracker.git
   ```
2. Navigate to the project directory.
3. Set up the backend:
   - Create a `.env` file with your CoinMarketCap API key.
   - Install dependencies and start the server.
4. Set up the frontend:
   - Install dependencies and start the development server.
5. Access the application at:
   - Frontend: `http://localhost:5173`
   - Backend: `http://127.0.0.1:8000`

---

## Future Improvements
- Add user authentication for personalized features.
- Implement real-time updates for cryptocurrency data.
- Add advanced filtering and search capabilities.
- Integrate additional data sources for comprehensive analytics.

---

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.


