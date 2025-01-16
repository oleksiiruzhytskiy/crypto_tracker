from src.config import settings
from src.httpClient import CMCHTTPClient

cmc_client  = CMCHTTPClient(
    base_url="https://pro-api.coinmarketcap.com",
    api_key=settings.COINMARKET_CAP_KEY,
)