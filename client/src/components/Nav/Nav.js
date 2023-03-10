import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { ReactComponent as PlaneLogo } from '../../assets/plane.svg';
import Auth from '../../utils/auth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Discover', href: '#' },
  { name: 'Itinerary', href: '#' },
  { name: 'Calendar', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Nav = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('AA_theme');
    if (savedTheme !== null) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('AA_theme', newTheme);
  };

  if (Auth.loggedIn()) {
    return (
      <Disclosure as="nav" className="z-50 sticky top-0 dark:bg-gradient-to-r dark:from-indigo-500/60 dark:via-purple-500/60 dark:to-pink-400/60 bg-gradient-to-r from-blue-300/60 to-sky-600/60 dark:bg-stone-600/30 backdrop-blur border-b border-stone-100/30 dark:border-stone-400/30">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-4 lg:pr-4">
              <div className="relative flex h-14 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-stone-400 hover:bg-stone-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <a href="/">
                      <PlaneLogo className="block h-8 w-auto lg:hidden" />
                    </a>
                    <a href="/">
                      <PlaneLogo className="hidden h-8 w-auto lg:block" />
                    </a>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-1">
                      {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="bg-transparent hover:bg-blue-50/40 dark:text-stone-200 dark:hover:bg-purple-400/30 dark:hover:text-stone-50 transition rounded-md px-3 py-2 text-base font-medium" aria-current={item.current ? 'page' : undefined}>
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-stone-800 text-sm hover:ring-2 hover:ring-sky-200/50 dark:hover:ring-pink-200/50">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src="https://source.boringavatars.com/beam/40/username-here" alt="" />
                      </Menu.Button>
                    </div>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-stone-300/60 dark:bg-stone-100/70 py-1 shadow-lg focus:outline-none backdrop-blur-sm border-2 border-stone-50/30">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/profile" className={classNames(active ? 'bg-stone-100/50 font-semibold' : '', 'block px-4 py-2 text-sm text-stone-700 transition-all')}>
                              <p className="text-base">Profile</p>
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/settings" className={classNames(active ? 'bg-stone-100/50 font-semibold' : '', 'block px-4 py-2 text-sm text-stone-700 transition-all')}>
                              <p className="text-base">Settings</p>
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/" onClick={() => Auth.logout()} className={classNames(active ? 'bg-stone-100/50 font-semibold' : '', 'block px-4 py-2 text-sm text-stone-700 flex flex-row transition-all')}>
                              <ArrowRightOnRectangleIcon className="h-5 mt-0.5 pr-1" />
                              <p className="text-base">Sign out</p>
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  {/* Dark theme switcher */}
                  <div className="hidden md:block rounded-full p-1 ml-3 text-stone-900 hover:text-sky-800 hover:bg-sky-50/40 dark:text-stone-200 dark:hover:text-amber-200 dark:hover:bg-amber-400/20 transition hover:cursor-pointer" onClick={handleThemeSwitch}>
                    <div className="hidden dark:block">
                      <SunIcon className="h-6 w-6" />
                    </div>
                    <div className="block dark:hidden">
                      <MoonIcon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button key={item.name} as="a" href={item.href} className={classNames(item.current ? 'bg-stone-900 text-white' : 'text-stone-300 hover:bg-stone-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-normal')} aria-current={item.current ? 'page' : undefined}>
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  } else {
    return (
      <Disclosure as="nav" className="z-50 sticky top-0 dark:bg-gradient-to-r dark:from-indigo-500/60 dark:via-purple-500/60 dark:to-pink-400/60 bg-gradient-to-r from-blue-300/60 to-sky-600/60 dark:bg-stone-600/30 backdrop-blur border-b border-stone-100/30 dark:border-stone-400/30">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-4 lg:pr-4">
              <div className="relative flex h-14 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-stone-400 hover:bg-stone-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <a href="/">
                      <PlaneLogo className="block h-8 w-auto lg:hidden" />
                    </a>
                    <a href="/">
                      <PlaneLogo className="hidden h-8 w-auto lg:block" />
                    </a>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-1">
                      {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="bg-transparent hover:bg-blue-50/40 dark:text-stone-200 dark:hover:bg-purple-400/30 dark:hover:text-stone-50 transition rounded-md px-3 py-2 text-base font-normal" aria-current={item.current ? 'page' : undefined}>
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div>
                    <a href="/login" className="rounded-md bg-amber-400 px-3.5 py-2.5 text-base font-normal text-stone-900 hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition">
                      login
                    </a>
                  </div>
                  {/* Dark theme switcher */}
                  <div className="hidden md:block rounded-full p-1 ml-3 text-stone-900 hover:text-sky-800 hover:bg-sky-50/40 dark:text-stone-200 dark:hover:text-amber-200 dark:hover:bg-amber-400/20 transition hover:cursor-pointer" onClick={handleThemeSwitch}>
                    <div className="hidden dark:block">
                      <SunIcon className="h-6 w-6" />
                    </div>
                    <div className="block dark:hidden">
                      <MoonIcon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button key={item.name} as="a" href={item.href} className={classNames(item.current ? 'bg-stone-900 text-white' : 'text-stone-300 hover:bg-stone-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')} aria-current={item.current ? 'page' : undefined}>
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
};

export default Nav;
