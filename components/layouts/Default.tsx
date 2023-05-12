import React from "react";
import Sidebar from "./Sidebar";

function Default({ children }: any) {
  return (
    <>
      <div>
        <Sidebar />
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700 mt-14">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
export default Default;
