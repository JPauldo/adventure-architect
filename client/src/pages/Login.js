import { ReactComponent as PlaneLogo } from '../assets/plane.svg';
import { useRef } from 'react';

const Login = () => {

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleLogin = (e) => {
    e.preventDefault()

    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    //  submit to backend
    // redirect to dashboard
    console.log(userData);
  }

  return (
    <>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <PlaneLogo />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-stone-700 dark:text-stone-200">Login to your account</h2>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  ref={emailRef}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  ref={passwordRef}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex flex-row w-full justify-between">
              <button type="submit" className="group relative flex w-full justify-center transition rounded-md shadow-md focus:shadow-sm bg-sky-600 py-2 px-3 text-sm font-semibold text-white hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Login
              </button>
            </div>
          </form>
          <p className="mt-3 text-center text-sm text-stone-700 dark:text-stone-200">
            Don't have an account? <br></br>
            <a href="/signup">
              Signup
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
