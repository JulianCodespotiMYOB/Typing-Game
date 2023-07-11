"use client";

import { supabase } from '@/lib/supabase';
import React, { useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error);
      return;
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-900'>
      <div className='w-full max-w-md'>
        <form className='bg-gray-800 shadow-lg rounded px-12 pt-6 pb-8 mb-4' onSubmit={handleSignUp}>
          <div className='text-2xl flex justify-center border-b-2 py-2 mb-4 text-white'>
            Register
          </div>
          <div className='mb-4'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='******************'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
              className='px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 w-full'
              type='submit'
            >
              Register
            </button>
          </div>
          <div className='flex items-center justify-center mt-4'>
            <p>Already have an account? &nbsp;</p>
            <a href='/login' className='text-blue-500 hover:text-blue-600'>
              Login here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;