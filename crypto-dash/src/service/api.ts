import axios from 'axios';
import type { CoinData } from '../types/crypto';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export const getTopCoins = async (): Promise<CoinData[]> => {
   const { data } = await api.get(
    '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'
   );
    return data;  
};