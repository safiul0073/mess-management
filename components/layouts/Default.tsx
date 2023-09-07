import React, { useMemo } from "react";
import Sidebar from "../partials/Sidebar";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../store/slices/auth/authSlice";

function Default({ children }: any) {
    const isAuth = useSelector(isAuthenticated);

    const page = useMemo(() => {
        if (isAuth) {
            return (
                <div>
                    <Sidebar />
                    <div className="p-4 sm:ml-64">{children}</div>
                </div>
            );
        } else {
            return children;
        }
    }, [isAuth]);
    return page;
}
export default Default;
