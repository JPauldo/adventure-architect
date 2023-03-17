import React, { useRef } from "react";

export default function Bus({ setTransportInfo }) {
  const busRef = useRef();
  const busNum = useRef();
  const departure = useRef();
  const arrival = useRef();

  const handleChange = () => {
    setTransportInfo({
      busCompany: busRef.current.value,
      busNumber: busNum.current.value,
      departure: departure.current.value,
      arrival: departure.current.value,
    });
  };
  return (
    <>
      <input
        onChange={handleChange}
        ref={busRef}
        id="bus-company"
        type="text"
        className="mt-3 relative block w-full rounded-t-md border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
        placeholder="Bus Company"
      />{" "}
      <input
        onChange={handleChange}
        ref={busNum}
        id="bus-number"
        type="text"
        className="relative block w-full border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
        placeholder="Bus number"
      />{" "}
      <div className="flex justify-items-end">
        <input
          onChange={handleChange}
          ref={departure}
          id="departure"
          type="text"
          className="relative w-1/2 rounded-bl-md box-border border-0 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="Departure:"
        />{" "}
        <input
          onChange={handleChange}
          ref={arrival}
          id="arrival"
          type="text"
          className="relative rounded-br-md w-1/2 box-border border-0 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="Arrival:"
        />{" "}
      </div>
    </>
  );
}
