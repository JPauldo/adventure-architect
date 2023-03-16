import { Link } from "react-router-dom";
import { ReactComponent as PlaneLogo } from "../assets/plane.svg";
import { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import Datepicker from "react-tailwindcss-datepicker";
import Flight from "../components/TransportationForms/Flight";
import Bus from "../components/TransportationForms/Bus";

const NewTripForm = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [flightInfo, setFlightInfo] = useState({})

  const [transportForm, setTransportForm] = useState("");

  const [hotelVisibility, setHotelVisibility] = useState(false);

  // set up reference variables
  const tripNameRef = useRef();
  const destinationRef = useRef();
  const hotelRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const checkinRef = useRef();
  const checkoutRef = useRef();

  // handles datepicker
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleCreateTrip = (e) => {
    e.preventDefault();
    console.log(tripNameRef.current.value);
    console.log(destinationRef.current.value);
    console.log(value);
    console.log("--------------- Hotel info ---------------");
    console.log(hotelRef.current.value);
    console.log(addressRef.current.value);
    console.log(phoneRef.current.value);
    console.log(checkinRef.current.value);
    console.log(checkoutRef.current.value);
    console.log("--------------- Transportation info ---------------");
    console.log("New trip successfully created!");
    console.log(flightInfo);

    // add create trip mutation here

    // events can be added to the calendar the form is already on the calendar page
  };

  const renderForm = () => {
    switch (transportForm) {
      case "Flight":
        return <Flight setFlightInfo={setFlightInfo}/>;

      case "Bus":
        return <Bus />;
      default:
        return null;
    }
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
                <h3 className="pt-6 text-center text-xl font-bold tracking-tight text-stone-700 dark:text-stone-200">
                  Hotel Information
                </h3>
                <label htmlFor="hotel" className="sr-only">
                  Hotel
                </label>
                <input
                  ref={hotelRef}
                  id="hotel"
                  name="hotel"
                  type="text"
                  onChange={() => {
                    setHotelVisibility(true);
                  }}
                  className="mt-6 relative block w-full rounded-t-md border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Hotel name"
                />
                {hotelVisibility && (
                  <>
                    <input
                      ref={addressRef}
                      id="hotel-address"
                      name="hotel-address"
                      type="text"
                      className="relative block w-full border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      placeholder="Hotel Address"
                    />{" "}
                    <input
                      ref={phoneRef}
                      id="hotel-phone"
                      name="hotel-phone"
                      type="text"
                      className="relative block w-full border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      placeholder="Hotel Phone"
                    />{" "}
                    <div className="flex justify-items-end">
                      <input
                        ref={checkinRef}
                        id="hotel-checkin"
                        name="hotel-checkin"
                        type="text"
                        className="relative w-1/2 rounded-bl-md box-border border-0 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        placeholder="Check in:"
                      />{" "}
                      <input
                        ref={checkoutRef}
                        id="hotel-checkout"
                        name="hotel-checkout"
                        type="text"
                        className="relative rounded-br-md w-1/2 box-border border-0 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        placeholder="Check out:"
                      />{" "}
                    </div>
                  </>
                )}
              </div>
              <div>
                <h3 className="pt-6 text-center text-xl font-bold tracking-tight text-stone-700 dark:text-stone-200">
                  Transportation
                </h3>
                <select
                  onChange={(e) => {
                    setTransportForm(e.target.value);
                  }}
                  className="mt-3 relative block w-full rounded-md py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                >
                  <option>Flight</option>
                  <option>Car</option>
                  <option>Bus</option>
                  <option>Train</option>
                  <option>Boat / Cruise</option>
                </select>
                {renderForm()}
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
