import React, { useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePocket } from "../contexts/PocketContext";

export const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, setAndHashPassword } = usePocket();
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault();
      await login(emailRef.current.value, setAndHashPassword(passwordRef.current.value));
      navigate("/protected");
    },
    [login]
  );

  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
          <div className="flex flex-col items-center space-y-2">
            <input
              placeholder="Email"
              type="email"
              ref={emailRef}
              className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
            />
            <input
              placeholder="Password"
              type="password"
              ref={passwordRef}
              className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">
          Go to Sign Up
        </Link>
      </section>
    </>
  );
};

