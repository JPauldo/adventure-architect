import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { MapIcon, PlusIcon } from '@heroicons/react/24/solid';

import { QUERY_ME } from '../utils/queries';

const Dashboard = () => {
  const [loaderState, setLoaderState] = useState(null);
  let loader = loaderState;
  const { loading, data, error } = useQuery(QUERY_ME);
  let user;
  if (data) {
    user = data.user;
  }
  if (loading) {
    return <p className="max-w-4xl mx-auto py-24 flex">One sec...</p>;
  }
  // if user has no existing trips - broken for now
  if (
    // user.trips.length
    0 === 0
  ) {
    return (
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="flex flex-col justify-center border-4 border-stone-800 rounded-3xl">
          <p className="text-2xl text-center py-6 text-stone-400 font-bold">No trips planned</p>
          <MapIcon className="fill-stone-800 w-48 mx-auto pb-6" />
          <div className="flex justify-center mb-6">
            <Link to="/create" className="w-64 relative flex justify-center rounded-md py-2 px-3 text-sm font-semibold text-stone-900 dark:bg-amber-400 dark:hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:focus-visible:outline-amber-600">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <PlusIcon className="h-5 w-5 text-amber-800 group-hover:text-amber-900" aria-hidden="true" />
              </span>
              Add New Trip
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <p className="max-w-4xl mx-auto py-24">{JSON.stringify(error)}</p>;
  }
  // if user has trips
  else {
    return <div></div>;
  }
};

export default Dashboard;
