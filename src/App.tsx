import React, { useEffect, useState } from "react";
import { Menu, Spin } from "antd";
import type { MenuProps } from "antd";
import axios from "axios";
import CryptoCurrencyCard from "./components/CryptoCurrencyCard";
import { urlsApi } from "./api/urls";

export type Crypto = {
  id: number;
  name: string;
  circulating_supply: number;
  max_supply: number;
  cmc_rank: number;
  date_added: string;
  last_updated: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      market_cap: number;
    };
  };
  symbol: string;
};

const App: React.FC = () => {
  const [current, setCurrent] = useState("");
  const [cryptosData, setCryptosData] = useState<Crypto[]>([]); // Store cryptocurrencies data
  const [cryptoMenu, setCryptoMenu] = useState<MenuProps["items"]>([
    {
      label: "Cryptocurrencies",
      key: "title",
      disabled: true,
      style: { fontWeight: "bold", fontSize: "1.2rem" },
    },
  ]); // Store menu items
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(urlsApi.cryptocurrencies);
      const cryptoList = response.data;
      setCryptosData(cryptoList); // Assuming response.data is an array of crypto names
      setCryptoMenu((prev = []) => [
        ...prev,
        ...cryptoList.map((crypto: Crypto) => ({
          label: crypto.name,
          key: crypto.id,
        })),
      ]);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    const selected = cryptosData.find((crypto) => crypto.id === Number(e.key));
    setSelectedCrypto(selected || null); // Set selected crypto

    console.log("Selected crypto:", selected);
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return (
    <section className="w-full h-full flex items-center">
      {!cryptosData.length ? (
        <div className="w-full h-dvh text-lg flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="w-1/4 h-screen">
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="vertical"
              items={cryptoMenu}
              style={{
                maxHeight: "100vh",
                overflowY: "auto",
                fontSize: "1rem",
              }}
            />
          </div>
          {cryptosData ? (
            <CryptoCurrencyCard selectedCryptoCurrency={selectedCrypto} />
          ) : (
            <Spin size="large" />
          )}
        </>
      )}
    </section>
  );
};

export default App;
