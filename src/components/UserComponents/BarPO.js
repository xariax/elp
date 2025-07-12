import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,      // <-- to jest kluczowe!
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,      // <-- dodaj tę linię!
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarPo = ({ data }) => {
  if (!data) return <div>Brak danych do wyświetlenia wykresu.</div>;

  const chartData = {
    labels: ['Dzisiaj wyprodukowaliśmy'],
    datasets: [
      {
        label: 'Całość zlecenia',
        data: data.orders,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Zrobiono',
        data: data.done,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        datalabels: {
          anchor: 'end',
          align: 'start',
          formatter: (value, context) => {
            const total = data.orders[context.dataIndex];
            if (!total) return '';
            const percent = (value / total) * 100;
            return percent.toFixed(1) + '%';
          },
          color: '#000',
          font: { weight: 'bold', size: 14 },
        },
      },
      {
        label: 'Odpad',
        data: data.waste,
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        datalabels: {
          anchor: 'end',
          align: 'start',
          formatter: (value, context) => {
            const total = data.orders[context.dataIndex];
            if (!total) return '';
            const percent = (value / total) * 100;
            return `${value} szt. (${percent.toFixed(1)}%)`;
          },
          color: '#000',
          font: { weight: 'bold', size: 14 },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Podsumowanie zlecenia' },
      datalabels: { display: true },
    },
    scales: { y: { beginAtZero: true } },
  };

  return <Bar data={chartData} options={options} height={120} plugins={[ChartDataLabels]} />;
};

export default BarPo;
