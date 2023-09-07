import React from "react";
import Sidebar from "../partials/Sidebar";

function Default({ children }: any) {
    return (
        <>
            <div>
                <Sidebar />
                <div className="p-4 sm:ml-64">{children}</div>
            </div>
        </>
    );
}
export default Default;
