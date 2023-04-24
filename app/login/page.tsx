import { LoginFooter } from '@components/Login/LoginFooter';

import { LoginForm } from '@components/Login/LoginForm';

const LoginPage = () => {




  return (
    <section>
      <div className='flex flex-col items-center  px-6 py-8 mx-auto md:h-screen '>
        <div className='bg-amber-50 dark:bg-slate-1000 p-8 rounded-lg space-y-4'>
          <div className='space-y-2'>
            <h1 className='text-4xl text-bold'>Login to your account</h1>
            <h2 className='text-sm opacity-90 text-sky-950 dark:text-gray-400'>*To login you need TMDb account</h2>
          </div>
          <>
            <LoginForm />
          </>

          <>
            <LoginFooter />
          </>
        </div>
      </div>
    </section>
  );

};

export default LoginPage;