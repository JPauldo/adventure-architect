import { Link } from "react-router-dom";
import { ReactComponent as PlaneLogo } from "../assets/plane.svg";
import { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import Datepicker from "react-tailwindcss-datepicker";

const NewTripForm = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const tripNameRef = useRef();
  const destinationRef = useRef();
  const hotelRef = useRef();
  const flightRef = useRef();

  const handleChange = (newValue) => {
    console.log("newValue: ", newValue);
    setValue(newValue);
  };

  const handleCreateTrip = (e) => {
    e.preventDefault();
    console.log(tripNameRef.current.value);
    console.log(destinationRef.current.value);
    console.log(hotelRef.current.value);
    console.log(value);
    console.log(flightRef.current.value);
    console.log("New trip successfully created!");

    // add create trip mutation here
  };

  return (
    <>
      <div className="flex items-center justify-center py-32 sm:py-48 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-stone-700 dark:text-stone-200">
              Create a New Trip
            </h2>
          </div>
          <form
            onSubmit={handleCreateTrip}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="trip-name" className="sr-only">
                  Trip name
                </label>
                <input
                  ref={tripNameRef}
                  id="trip-name"
                  name="trip-name"
                  type="text"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Trip name"
                />
              </div>
              <div>
                <label htmlFor="destination" className="sr-only">
                  Destination
                </label>
                <input
                  ref={destinationRef}
                  id="destination"
                  name="destination"
                  type="text"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Destination"
                />
              </div>
              <h3 className="p-6 text-center text-xl font-bold tracking-tight text-stone-700 dark:text-stone-200">
                Trip length
              </h3>
              <Datepicker
                primaryColor={"amber"}
                value={value}
                onChange={handleChange}
              />
              <div>
                <label htmlFor="hotel" className="sr-only">
                  Hotel name
                </label>
                <input
                  ref={hotelRef}
                  id="hotel"
                  name="hotel"
                  type="text"
                  className="mt-6 relative block w-full rounded-t-md border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Hotel name"
                />
              </div>
              <div>
                <label htmlFor="flight" className="sr-only">
                  Flight name
                </label>
                <input
                ref={flightRef}
                  id="flight"
                  name="flight"
                  type="text"
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Flight name"
                />
              </div>
            </div>
            <div className="flex flex-row w-full justify-between">
              <button
                type="submit"
                className="w-screen relative flex justify-center rounded-md py-2 px-3 text-sm font-semibold text-stone-900 bg-amber-300 hover:bg-amber-400 dark:bg-amber-400 dark:hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition"
              >
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <PlusIcon
                    className="h-5 w-5 dark:text-amber-800 dark:group-hover:text-amber-900"
                    aria-hidden="true"
                  />
                </span>
                Create Trip
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewTripForm;
