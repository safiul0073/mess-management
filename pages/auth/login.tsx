/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState } from "react";
import InputField from "../../components/common/InputField";
import { useLoginMutation } from "../../store/slices/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../store/slices/auth/authSlice";

const login = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const submitForm = async (e: any) => {
    e.preventDefault();

    try {
      const data = await login({
        username,
        password,
      }).unwrap();
      if (data?.ok) {
        dispatch(setAuthData({ user: data?.user, token: data?.accessToken }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Mess Management
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form onSubmit={submitForm} className="space-y-4 md:space-y-6">
                  <InputField
                    name="username"
                    label="Your email or phone"
                    required={true}
                    type="text"
                    value={username}
                    placeHolder="hello@gmail.com"
                    onChange={(e: any) => setUsername(e.target.value)}
                  />
                  <InputField
                    name="password"
                    label="Password"
                    required={true}
                    type="password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    placeHolder="••••••••"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default login;
