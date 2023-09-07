import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshToken } from "../functions/auth";
import { setAuthData } from "../store/slices/auth/authSlice";
import Default from "./layouts/Default";

const RequireAuth = ({ children }: any) => {
    const dispatch = useDispatch();

    const dispatchAuthData = () => {
        refreshToken().then((data: any) => {
            if (data.ok === true) {
                dispatch(
                    setAuthData({
                        user: data?.user,
                        token: data?.accessToken,
                        isAuth: true,
                    })
                );
            }
        });
    };

    useEffect(() => {
        dispatchAuthData();

        setInterval(() => {
            dispatchAuthData();
        }, 600000);
    }, []);

    return <Default>{children}</Default>;
};

export default RequireAuth;
