import React from "react";
import MenuItem from "./MenuItem";

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div className="w-full text-center">Logo</div>
                <MenuItem />
            </div>
        </div>
    );
};

export default Sidebar;
