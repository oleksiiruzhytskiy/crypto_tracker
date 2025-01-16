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