import Auth from '../utils/auth';
import Dashboard from './Dashboard';
import { ReactComponent as PlaneLogo } from '../assets/plane.svg';

const Home = () => {
  if (Auth.loggedIn()) {
    <Dashboard />;
  } else {
    return (
      <div className=" ">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <PlaneLogo className="w-80 mx-auto" />
          {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div> */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r dark:from-indigo-500 dark:via-purple-500 dark:to-pink-400 from-blue-300 to-sky-600">Adventure Architect</h1>
            <p className="mt-6 text-xl font-semibold leading-8 dark:text-amber-200">Build the perfect getaway</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="/signup" className="rounded-md bg-amber-400 px-3.5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 transition">
                Get started
              </a>
              <a href="/about" className="text-sm font-semibold leading-6 dark:text-amber-200 dark:hover:text-amber-300 transition">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
