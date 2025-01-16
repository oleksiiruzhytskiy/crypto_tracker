import { useCallback } from "react";

export const useFormatter = () => {
  const formatNumber = useCallback((number: number) => {
    let initialIndex = 0;
    const unit = ["", "K", "M", "B", "T"];
    while (initialIndex < unit.length - 1 && number >= 1000) {
      number /= 1000;
      initialIndex++;
    }
    return number.toFixed(2) + unit[initialIndex];
  }, []);

  const formatPrice = useCallback((price: number) => {
    return price < 1 ? price.toFixed(5) : price.toFixed(2);
  }, []);

  const formatDate = useCallback((date: string) => {
    return date.split("T")[0];
  }, []);

  const formatDateTime = useCallback((dateTime: string) => {
    return dateTime.replace("T", " ").replace(".000Z", "");
  }, []);

  return {
    formatNumber,
    formatPrice,
    formatDate,
    formatDateTime,
  };
};
