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
import CountUp from 'react-countup';
import { Fade } from 'react-awesome-reveal';

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
  title?: string;
}

const colours = {
  green: 'rgba(42, 157, 143, 0.7)',
  red: 'rgba(231, 111, 81, 0.7)',
  yellow: 'rgba(233, 196, 106, 0.7)',
  gray: 'rgba(102, 102, 102, 1)',
};

const fades = {
  initial: 0,
  wpm: 500,
  accuracy: 1000,
};

const fontStyle = {
  fontFamily: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
  fontSize: 20,
  fontStyle: 'bold',
  padding: 0,
  lineHeight: 0.8,
};

const BarChart: React.FC<ChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      {' '}
      <Bar data={data} options={options} />
    </div>
  );
};

const DoughnutChart: React.FC<ChartProps> = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: title },
    },
    borderColor: 'rgba(0, 0, 0, 0.5)',
    hoverOffset: 9,
    spacing: 4,
  };

  return <Doughnut data={data} options={options} />;
};

const createChartData = (
  labels: string[],
  data: number[],
  colours: string[],
): DataProps =>
  ({
    labels,
    datasets: [
      {
        data,
        backgroundColor: colours,
      },
    ],
  }) as DataProps;

const GameStatistics: React.FC<GameStatisticsProps> = ({
  wpm,
  rawWpm,
  accuracy,
  correctKeystrokes,
  incorrectKeystrokes,
  missedWords,
}) => {
  const wpmData = createChartData(
    ['WPM', 'Raw WPM'],
    [wpm, rawWpm],
    [colours.green, colours.yellow],
  );
  const accuracyData = createChartData(
    ['Accuracy', 'Incorrect'],
    [accuracy, 100 - accuracy],
    [colours.green, colours.red],
  );
  const keystrokesData = createChartData(
    ['Correct Keystrokes', 'Incorrect Keystrokes', 'Missed Words'],
    [correctKeystrokes, incorrectKeystrokes, missedWords],
    [colours.green, colours.red, colours.yellow],
  );

  return (
    <div className='flex flex-col items-center justify-center rounded-lg p-4 max-w-screen-xl mx-auto text-white w-full'>
      <h2 className='font-bold text-3xl mb-4 animate-pulse'>Stats</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
        <Fade delay={fades.initial}>
          <KeystrokesChart
            data={keystrokesData}
            correctKeystrokes={correctKeystrokes}
            incorrectKeystrokes={incorrectKeystrokes}
            missedWords={missedWords}
            title={'Keystrokes'}
          />
        </Fade>
        <Fade delay={fades.wpm}>
          <WpmChart data={wpmData} wpm={wpm} title={'WPM'} />
        </Fade>
        <Fade delay={fades.accuracy}>
          <AccuracyChart
            data={accuracyData}
            accuracy={accuracy}
            title={'Accuracy'}
          />
        </Fade>
      </div>
    </div>
  );
};

const KeystrokesChart: React.FC<
  ChartProps & {
    correctKeystrokes: number;
    incorrectKeystrokes: number;
    missedWords: number;
  }
> = ({ data, correctKeystrokes, incorrectKeystrokes, missedWords }) => (
  <div>
    <DoughnutChart data={data} title='Keystrokes' />
    <div className='flex justify-evenly mt-5'>
      <CountUp
        end={correctKeystrokes}
        style={{ ...fontStyle, color: colours.green }}
      />{' '}
      <CountUp
        end={incorrectKeystrokes}
        style={{ ...fontStyle, color: colours.red }}
      />{' '}
      <CountUp
        end={missedWords}
        style={{ ...fontStyle, color: colours.yellow }}
      />{' '}
    </div>
  </div>
);

const WpmChart: React.FC<ChartProps & { wpm: number }> = ({ data, wpm }) => (
  <div>
    <BarChart data={data} />
    <div className='flex justify-center mt-5 flex-col items-center'>
      <p
        style={{
          ...fontStyle,
          color: colours.gray,
          fontSize: 30,
          marginTop: 20,
        }}
      >
        WPM
      </p>
      <CountUp
        end={wpm}
        style={{
          ...fontStyle,
          color: colours.green,
          fontSize: 50,
          lineHeight: 1.5,
        }}
      />{' '}
    </div>
  </div>
);

const AccuracyChart: React.FC<ChartProps & { accuracy: number }> = ({
  data,
  accuracy,
}) => (
  <div>
    <DoughnutChart data={data} title='Accuracy' />
    <div className='text-center mt-5'>
      <CountUp
        end={accuracy}
        suffix={'%'}
        style={{ ...fontStyle, color: colours.green }}
      />{' '}
    </div>
  </div>
);

export default GameStatistics;
