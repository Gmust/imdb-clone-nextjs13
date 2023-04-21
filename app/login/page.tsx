import Link from 'next/link';
import { LoginFooter } from '@components/Login/LoginFooter';

const LoginPage = () => {


  const handleSubmit = async () => {

  };


  return (
    <section>
      <div className='flex flex-col items-center  px-6 py-8 mx-auto md:h-screen '>
        <div className='bg-amber-50 dark:bg-slate-1000 p-8 rounded-lg space-y-4'>
          <div className='space-y-2'>
            <h1 className='text-4xl text-bold'>Login to your account</h1>
            <h2 className='text-sm opacity-90 text-sky-950 dark:text-gray-400'>*To login you need TMDb account</h2>
          </div>

          <form className='flex flex-col space-y-4 items-center text-xl'>

            <div className='flex'>
              <label htmlFor='username'
                     className='inline-flex items-center px-3 text-xl  bg-amber-200 border border-r-0
                       border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-amber-500 dark:border-gray-600'>
                Username
              </label>
              <input type='text' id='username'
                     className='rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500
                      focus:border-blue-500 block flex-1 min-w-0 w-full text-base  border-gray-300 p-2.5
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                         dark:focus:ring-blue-500 dark:focus:border-blue-500'
                     placeholder='Enter your username...' />
            </div>

            <div className='flex'>
              <label htmlFor='password'
                     className='inline-flex items-center px-3 text-xl  bg-amber-200 border border-r-0
                       border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-amber-500 dark:border-gray-600'>
                Password
              </label>
              <input type='password' id='password'
                     className='rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500
                      focus:border-blue-500 block flex-1 min-w-0 w-full text-base  border-gray-300 p-2.5
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                         dark:focus:ring-blue-500 dark:focus:border-blue-500'
                     placeholder='Enter your username...' />
            </div>

            <button type='submit' className='border-solid border-2 border-amber-400 dark:border-slate-500 text-xl
             bg-amber-200 dark:bg-slate-500  p-2 rounded-lg w-2/4 hover:scale-110 transition duration-200 '>
              Login
            </button>

          </form>

          <div>
            <LoginFooter />
          </div>

        </div>
      </div>
    </section>
  );

};

export default LoginPage;