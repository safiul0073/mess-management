import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../functions/auth";
import { getCurrentToken, setAuthData } from "../store/slices/auth/authSlice";
import Default from "./layouts/Default";

const RequireAuth = ({ children }: any) => {
  const token = useSelector(getCurrentToken);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!token && router.pathname === "/" && typeof window !== "undefined") {
    void router.replace("/auth/login");
  }

  if (token && typeof window !== "undefined") {
    void router.replace("/");
  }

  const dispatchAuthData = () => {
    refreshToken().then((data: any) => {
      if (data.ok === true) {
        dispatch(
          setAuthData({
            user: data?.user,
            token: data?.accessToken,
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

  return token ? <Default>{children}</Default> : children;
};

export default RequireAuth;
