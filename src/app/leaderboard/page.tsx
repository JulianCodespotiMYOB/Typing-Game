'use client';

import React, { useEffect, useState } from 'react';

interface Score {
  id: number;
  name: string;
  wpm: number;
  accuracy: number;
  time: number;
}

const fakeData = [
  {
    id: 1,
    name: 'John Doe',
    wpm: 50,
    accuracy: 90,
    time: 60,
  },
  {
    id: 2,
    name: 'Jane Doe',
    wpm: 60,
    accuracy: 80,
    time: 60,
  },
  {
    id: 3,
    name: 'John Smith',
    wpm: 70,
    accuracy: 70,
    time: 60,
  },
  {
    id: 4,
    name: 'Jane Smith',
    wpm: 80,
    accuracy: 60,
    time: 60,
  },
  {
    id: 5,
    name: 'John Doe',
    wpm: 90,
    accuracy: 50,
    time: 60,
  },
  {
    id: 6,
    name: 'Jane Doe',
    wpm: 100,
    accuracy: 40,
    time: 60,
  },
  {
    id: 7,
    name: 'John Smith',
    wpm: 110,
    accuracy: 30,
    time: 60,
  },
  {
    id: 8,
    name: 'Jane Smith',
    wpm: 120,
    accuracy: 20,
    time: 60,
  },
  {
    id: 9,
    name: 'John Doe',
    wpm: 130,
    accuracy: 10,
    time: 60,
  },
  {
    id: 10,
    name: 'Jane Doe',
    wpm: 140,
    accuracy: 0,
    time: 60,
  },
];

const LeaderboardPage: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
      );
      const _ = await response.json();
      setScores(fakeData);
      setIsLoading(false);
    };

    fetchScores();
  }, [page]);

  const tableHeader = () => {
    const cellStyle = 'px-4 py-3 text-sm border-gray-200 border-gray-800';

    return (
      <thead className='text-xs text-gray-200 uppercase bg-gray-600'>
        <tr>
          <th className={cellStyle}>Name</th>
          <th className={cellStyle}>WPM</th>
          <th className={cellStyle}>Accuracy</th>
          <th className={cellStyle}>Time</th>
        </tr>
      </thead>
    );
  };

  const tableEntries = scores.map((score: Score, index: number) => {
    const style = index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600';

    const cellStyle = 'px-4 py-3 text-sm';

    return (
      <tr key={score.id} className={style}>
        <td className={cellStyle}>{score.name}</td>
        <td className={cellStyle}>{score.wpm}</td>
        <td className={cellStyle}>{score.accuracy}%</td>
        <td className={cellStyle}>{score.time} seconds</td>
      </tr>
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-3xl text-center font-semibold text-gray-800 dark:text-gray-100 mb-5 mt-5'>
        Leaderboard
      </h1>
      <div className='relative overflow-x-auto sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
          {tableHeader()}
          <tbody>{tableEntries}</tbody>
        </table>
      </div>

      <div>
        <p className='text-center text-lg text-gray-200 mt-5'>Page {page}</p>

        <div className='flex justify-center mt-4 space-x-4'>
          <button
            className={`bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-40 ${
              page === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-40'
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
