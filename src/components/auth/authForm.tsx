interface Props {
  isLoading: boolean;
  handleAuth: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
  buttonText: string;
  extraInfo?: React.ReactNode;
}

const AuthForm = ({
  isLoading,
  handleAuth,
  onChangeEmail,
  onChangePassword,
  email,
  password,
  buttonText,
  extraInfo,
}: Props) => {
  if (isLoading) {
    return <div className='spinner'></div>;
  }

  return (
    <div className='w-full max-w-md'>
      <form
        className='bg-gray-700 rounded-lg px-12 pt-6 pb-8 mb-4'
        onSubmit={handleAuth}
      >
        <div className='text-2xl flex justify-center border-b-2 py-2 mb-4 text-white'>
          Login
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
            onChange={onChangeEmail}
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
            onChange={onChangePassword}
          />
        </div>
        <div className='flex items-center justify-center'>
          <button
            className='px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 w-full'
            type='submit'
          >
            {buttonText}
          </button>
        </div>
        {extraInfo && extraInfo}
      </form>
    </div>
  );
};

export default AuthForm;
