import type { CoinData } from '../types/crypto';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Sparkline } from './SparkLine'; // <--- Importamos aqui

interface Props {
  coin: CoinData;
}

export const CoinCard = ({ coin }: Props) => {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-slate-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{coin.name}</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{coin.symbol}</span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-mono font-bold text-slate-900 text-lg">
            ${coin.current_price.toLocaleString()}
          </p>
          <div className={`flex items-center justify-end gap-1 text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Aqui entra o gráfico mágico */}
      <Sparkline 
        data={coin.sparkline_in_7d.price} 
        isPositive={isPositive} 
      />
    </div>
  );
};