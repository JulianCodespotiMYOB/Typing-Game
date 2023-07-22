import { supabase } from '@/lib/supabase';
import { GameStats } from '@/types';
import React from 'react';

interface Score {
  id: number;
  name: string;
  wpm: number;
  accuracy: number;
  time: string;
}

const LeaderboardPage: React.FC = async () => {
  const page = 1;

  const entries = await supabase
    .from('scores')
    .select('score_id, wpm, accuracy, time')
    .order('wpm', { ascending: false })
    .limit(10)
    .then((res) =>
      (res.data ?? []).map((s) => ({
        id: s.score_id,
        name: 'Anonymous',
        wpm: s.wpm,
        accuracy: s.accuracy,
        time: s.time,
      })),
    );

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

  const tableEntries = entries.map((score: Score, index: number) => {
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
      </div>
    </div>
  );
};

export default LeaderboardPage;
