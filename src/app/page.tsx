import React from 'react';

import { Game } from '@/components';

const Home: React.FC = () => {
  return (
    <main className='flex flex-col items-center justify-between px-24 py-16'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <Game />
      </div>
    </main>
  );
};

export default Home;
