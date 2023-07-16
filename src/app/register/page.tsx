'use client';
import { supabase } from '@/lib/supabase';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from 'next/navigation';
import { AuthForm } from '@/components';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      'Registration successful! Please check your email to confirm your account.'
    );

    redirect('/login');
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const extraInfo = (
    <div className='flex items-center justify-center mt-4'>
      <p>Already have an account? &nbsp;</p>
      <a href='/login' className='text-blue-500 hover:text-blue-600'>
        Login here
      </a>
    </div>
  );

  return (
    <div className='flex justify-center items-center mt-44 bg-gray-800'>
      <AuthForm
        handleAuth={handleSignUp}
        isLoading={isLoading}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        email={email}
        password={password}
        buttonText='Login'
        extraInfo={extraInfo}
      />

      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Page;
