import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);
interface GameStatisticsProps {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctKeystrokes: number;
  incorrectKeystrokes: number;
  missedWords: number;
}

interface DataProps {
  labels: string[];
  datasets: { label: string; data: number[]; backgroundColor: string[] }[];
}

interface ChartProps {
  data: DataProps;
  title: string;
}

const BarChart: React.FC<ChartProps> = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const }, // use 'as const' to ensure the type is exactly 'top'
      title: { display: false },
    },
  };

  return <Bar data={data} options={options} />;
};

const DoughnutChart: React.FC<ChartProps> = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const }, // use 'as const' to ensure the type is exactly 'top'
      title: { display: true, text: title },
    },
  };

  return <Doughnut data={data} options={options} />;
};

const AccuracyBar: React.FC<{ accuracy: number }> = ({ accuracy }) => (
  <div className='relative p-4'>
    <span className={'block text-center'}>Accuracy</span>
    <div className='w-full h-4 bg-red-600 rounded-full'>
      <div
        style={{ width: `${accuracy}%` }}
        className='h-full text-center text-xs text-white bg-blue-600 rounded-full'
      />
    </div>
    <span className='absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-1/2 text-sm text-xl text-white p-4 rounded-3xl bg-gray-800'>
      {accuracy.toFixed(2)}%
    </span>
  </div>
);

const GameStatistics: React.FC<GameStatisticsProps> = ({
  wpm,
  rawWpm,
  accuracy,
  correctKeystrokes,
  incorrectKeystrokes,
  missedWords,
}) => {
  const wpmData: DataProps = {
    labels: ['WPM', 'Raw WPM'],
    datasets: [
      {
        label: 'Words Per Minute',
        data: [wpm, rawWpm],
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      },
    ],
  };

  const accuracyData: DataProps = {
    labels: ['Accuracy', 'Incorrect'],
    datasets: [
      {
        label: 'Accuracy',
        data: [accuracy, 100 - accuracy],
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      },
    ],
  };

  const keystrokesData: DataProps = {
    labels: ['Correct Keystrokes', 'Incorrect Keystrokes', 'Missed Words'],
    datasets: [
      {
        label: 'Keystrokes',
        data: [correctKeystrokes, incorrectKeystrokes, missedWords],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 205, 86, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className='flex flex-col items-center justify-center rounded-lg p-4 max-w-screen-xl mx-auto bg-gray-900 text-white w-full'>
      <h2 className='font-bold text-3xl mb-4 animate-pulse'>Game Statistics</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
        <div>
          <DoughnutChart data={keystrokesData} title='Keystrokes' />
        </div>
        <div>
          <BarChart data={wpmData} title='Words Per Minute' />
        </div>
        <div>
          <DoughnutChart data={accuracyData} title='Accuracy' />
        </div>
      </div>
    </div>
  );
};

export default GameStatistics;
