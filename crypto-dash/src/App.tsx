import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTopCoins } from './service/api';
import { CoinCard } from './components/CoinCard';
import { Loader2, RefreshCw, Search } from 'lucide-react';

function App() {
  const [search, setSearch] = useState(''); 

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['topCoins'],
    queryFn: getTopCoins,
    refetchInterval: 30000,
  });

  // Lógica de Filtragem:
  const filteredCoins = data?.filter((coin) => 
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-blue-600">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-red-500">
        <p className="font-bold">Erro ao carregar dados. Tente novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">CryptoMarket</h1>
          <p className="text-slate-500">Acompanhe o mercado em tempo real</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Input de Pesquisa */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Buscar (ex: Bitcoin)"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        
          <button 
            onClick={() => refetch()}
            disabled={isFetching}
            className="p-2 bg-white hover:bg-slate-100 rounded-full shadow-sm border border-slate-200 transition-all disabled:opacity-50"
            title="Atualizar agora"
          >
            <RefreshCw className={`${isFetching ? 'animate-spin' : ''} text-slate-600`} size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins?.length === 0 ? (
           <div className="col-span-full text-center py-20 text-slate-400">
             Nenhuma moeda encontrada com "{search}"
           </div>
        ) : (
          filteredCoins?.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))
        )}
      </main>
      
      <footer className="max-w-6xl mx-auto mt-12 text-center text-slate-400 text-sm">
        Dados via CoinGecko • {filteredCoins?.length} moedas listadas
      </footer>
    </div>
  );
}

export default App;