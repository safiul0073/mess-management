import React from "react";

interface nameType {
    name: string;
}

const RowNotFound = ({ name }: nameType) => {
    return (
        <>
            <div className="text-center border border-gray-200 px-5 py-10 rounded-2xl">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                </svg>

                <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No {name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new
                    {" " + name}.
                </p>
            </div>
        </>
    );
};

export default RowNotFound;
