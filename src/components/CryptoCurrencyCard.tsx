import { Card } from "antd";
import type { Crypto } from "../App";
import {useFormatter} from "../hooks/useNumberFormatter";
import { urlsApi } from "../api/urls";

type CryptoCurrencyCardProps = {
  readonly selectedCryptoCurrency: Crypto | null;
};

function CryptoCurrencyCard({ selectedCryptoCurrency }: CryptoCurrencyCardProps) {
  if (!selectedCryptoCurrency) {
    return null;
  }

  const {
    id,
    name,
    symbol,
    quote: {
      USD: { price, percent_change_24h, market_cap },
    },
    cmc_rank,
    circulating_supply,
    max_supply,
    date_added,
    last_updated,
  } = selectedCryptoCurrency;

 const { formatNumber, formatPrice, formatDate, formatDateTime } = useFormatter();

  const moreDetailsUrl = urlsApi.currencies + name.toLowerCase()
  

  return (
    <section className="m-auto w-96 h-90">
      <Card
        title={
          <div className="flex items-center">
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
              alt={name}
              style={{ width: 30, height: 30 }}
            />
            <span className="ml-2">{name}</span>
            <span className="ml-2 text-gray-500">({symbol})</span>
          </div>
        }
        extra={<a href={moreDetailsUrl}>More</a>}
        className="w-full h-full"
      >
        <p className="text-xl">Rank: #{cmc_rank}</p>
        <p className="text-xl mt-1">Price: {formatPrice(price)} USD</p>
        <p className="text-xl mt-1">Market cap: {formatNumber(market_cap)}</p>

        <p className="text-xl mt-1">
          24h Change: <span className={percent_change_24h >= 0 ? "text-green-400" : "text-red-400"}>{percent_change_24h.toFixed(2)}%</span>
        </p>
        <p className="text-base mt-2">Circulating Supply: {circulating_supply.toLocaleString()}</p>
        <p className="text-base mt-2">Max Supply: {max_supply ? max_supply.toLocaleString() : "N/A"}</p>
        <p className="text-base mt-2">Date Added: {formatDate(date_added)}</p>
        <p className="text-base mt-2">Last Updated: {formatDateTime(last_updated)}</p>
      </Card>
    </section>
  );
}

export default CryptoCurrencyCard;
