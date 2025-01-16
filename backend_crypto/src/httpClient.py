import aiohttp
from async_lru import alru_cache

class HttpClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.api_key = api_key

        # Configure SSL using certifi and create the connector
        connector = aiohttp.TCPConnector(ssl_context=None, ssl=False)

        # Create a session with the configured connector
        self._session = aiohttp.ClientSession(
            base_url=base_url,
            headers={'X-CMC_PRO_API_KEY': api_key},
            connector=connector,
            trust_env=True,
        )


class CMCHTTPClient(HttpClient):
    @alru_cache
    async def get_listing(self):
        async with self._session.get("/v1/cryptocurrency/listings/latest") as response:
            result = await response.json()
            return result["data"]

    @alru_cache
    async def get_currency(self, currency_id):
        async with self._session.get(
                "/v2/cryptocurrency/quotes/latest",
                params={"id": currency_id}
        ) as response:
            result = await response.json()
            return result["data"][str(currency_id)]
