/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import InputField from "../../components/ui/InputField";
import { useLoginMutation } from "../../store/slices/auth/authApiSlice";
import { setAuthData } from "../../store/slices/auth/authSlice";
import { useAppDispatch } from "../../store/hooks";
import ButtonWithLoader from "../../components/ui/ButtonWithLoader";

const login = (): JSX.Element => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const submitForm = async (e: any) => {
        e.preventDefault();

        try {
            const data = await login({
                username,
                password,
            }).unwrap();
            if (data?.ok) {
                dispatch(
                    setAuthData({ user: data?.user, token: data?.accessToken })
                );
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
                                <form
                                    onSubmit={submitForm}
                                    className="space-y-4 md:space-y-6"
                                >
                                    <InputField
                                        name="username"
                                        label="Your email or phone"
                                        required={true}
                                        type="text"
                                        value={username}
                                        placeHolder="hello@gmail.com"
                                        onChange={(e: any) => {
                                            setUsername(e.target.value);
                                        }}
                                    />
                                    <InputField
                                        name="password"
                                        label="Password"
                                        required={true}
                                        type="password"
                                        value={password}
                                        onChange={(e: any) => {
                                            setPassword(e.target.value);
                                        }}
                                        placeHolder="••••••••"
                                    />
                                    <div className="flex items-center justify-between">
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                    <ButtonWithLoader
                                        isLoading={isLoading}
                                        type="submit"
                                        name="Sign in"
                                    />
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
