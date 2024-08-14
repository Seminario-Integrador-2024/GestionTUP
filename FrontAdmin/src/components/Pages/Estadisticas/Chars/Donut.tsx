import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Box } from '@chakra-ui/react';
Chart.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
    labelsPromp: string[];
    dataPromp: number[];
  }
  


const DoughnutChart : React.FC<DoughnutChartProps> = ({ labelsPromp, dataPromp }) => {
  const data = {
    labels: labelsPromp,
    datasets: [
      {
        label: 'Estado de Alumnos',
        data: dataPromp, 
        backgroundColor: ['#4CAF50', '#FF6384'],
        hoverBackgroundColor: ['#66BB6A', '#FF6384'],
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`
        },
      },
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
            font: {
                size: 14,
              },
        },
      },
    },
    maintainAspectRatio: false,
  };
  
  return (
    <Box w={{ base: '100%', md: '40%' }} h={{ base: '300px', md: '240px' }}>
      <Doughnut data={data} options={options} />
    </Box>
  );
};

export default DoughnutChart;
