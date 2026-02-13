import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface Props {
  data: number[];
  isPositive: boolean;
}

export const Sparkline = ({ data, isPositive }: Props) => {
  // A Recharts precisa de um array de objetos, mas a API nos dá um array de números.
  // Vamos transformar [10, 20, 15] em [{ price: 10 }, { price: 20 }, { price: 15 }]
  const chartData = data.map((price) => ({ price }));

  return (
    <div className="h-[60px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          {/* Escondemos o eixo Y para o gráfico ficar limpo */}
          <YAxis domain={['dataMin', 'dataMax']} hide />
          
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? '#22c55e' : '#ef4444'} // Verde se subiu, vermelho se caiu
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};