import { Link } from "react-router-dom";
import { ReactComponent as PlaneLogo } from "../assets/plane.svg";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

const Signup = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();

  const [addUser, { error }] = useMutation(ADD_USER);

  const validatePassword = () => {
    if (passwordRef.current.value === passwordCheckRef.current.value) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(userData);
    const validate = validatePassword();

    if (validate) {
      try {
        const {data} = await addUser({
          variables: { ...userData },
        });
        window.location.assign('/dashboard')
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Passwords must match!");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center py-32 sm:py-48 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <PlaneLogo />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-stone-700 dark:text-stone-200">
              Create an account
            </h2>
          </div>
          <form
            onSubmit={submitHandler}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="firstName" className="sr-only">
                  Username
                </label>
                <input
                  ref={firstNameRef}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  ref={lastNameRef}
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  required
                  className="relative block w-full border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Last Name"
                />
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
              </div>
              <div>
                <input
                  ref={emailRef}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="passwordCheck" className="sr-only">
                  Confirm Password
                </label>
                <input
                  ref={passwordCheckRef}
                  id="passwordCheck"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className="flex flex-row w-full justify-between">
              <button
                type="submit"
                className="group relative flex w-full justify-center shadow-md focus:shadow-sm transition rounded-md bg-sky-600 py-2 px-3 text-sm font-semibold text-white hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Signup
              </button>
            </div>
          </form>
          <p className="mt-3 text-center text-sm text-stone-700 dark:text-stone-200">
            Already have an account? <br></br>
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
