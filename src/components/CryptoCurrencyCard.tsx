import { Card } from "antd";
import type { Crypto } from "../App";

type CryptoCurrencyCardProps = {
  readonly selectedCryptoCurrency: Crypto | null;
};

function CryptoCurrencyCard({
  selectedCryptoCurrency,
}: CryptoCurrencyCardProps) {
  if (!selectedCryptoCurrency) {
    return null;
  }

  const {
    id,
    name,
    symbol,
    quote: {
      USD: { price, percent_change_24h },
    },
    cmc_rank,
    circulating_supply,
    max_supply,
    date_added,
    last_updated,
  } = selectedCryptoCurrency;

  const moreDetailsUrl = `https://coinmarketcap.com/currencies/${name.toLowerCase()}/`;

  return (
    <section className="m-auto w-96 h-90 ">
      <Card
        title={
          <div className="flex items-center">
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`} // Dynamically set the image
              alt={name}
              style={{ width: 30, height: 30 }}
            />
            <span style={{ marginLeft: 10 }}>{name}</span>
            <span style={{ marginLeft: 10 }}>{symbol}</span>
          </div>
        }
        extra={<a href={moreDetailsUrl}>More</a>}
        className="w-full h-full"
      >
        <p className="text-xl">Rank: #{cmc_rank}</p>
        <p className="text-xl mt-1">
          Price: {price < 1 ? price.toFixed(5) : price.toFixed(2)} USD
        </p>
        <p className="text-xl mt-1">
          Percent_change_24h:{" "}
          <span className="text-green-400">
            {percent_change_24h.toFixed(2)}%
          </span>
        </p>
        <p className="text-base mt-2">
          Circulating_supply: {circulating_supply.toFixed(0)}
        </p>
        <p className="text-base mt-2">Circulating_supply: {max_supply}</p>
        <p className="text-base mt-2">Date added: {date_added.split("T")[0]}</p>
        <p className="text-base mt-2">
          Last updated: {last_updated.replace("T", " ").replace(".000Z", "")}
        </p>
      </Card>
    </section>
  );
}

export default CryptoCurrencyCard;
