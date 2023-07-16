'use client';
import React from 'react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';

const Header: React.FC = () => {
  const { user, logout, isLoading } = useUser();

  const headerOptions = () => {
    if (isLoading) {
      return <li className='text-gray-800'>.</li>;
    }

    if (user) {
      return (
        <>
          <li>
            <Link onClick={logout} href='/'>
              Logout
            </Link>
          </li>

          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          <li>
            <Link href='/leaderboard'>Leaderboard</Link>
          </li>
        </>
      );
    }

    return (
      <>
        <li>
          <Link href='/login'>Login</Link>
        </li>
        <li>
          <Link href='/register'>Register</Link>
        </li>
      </>
    );
  };

  return (
    <header className='text-gray-300 py-2.5 px-6'>
      <div className='flex justify-between items-center'>
        <Link className='font-bold text-2xl ml-10 mt-5' href='/'>
          Typing Game
        </Link>
        <nav>
          <ul className='flex space-x-4 mt-10 mr-10'>{headerOptions()}</ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
