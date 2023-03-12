import React from "react";

interface buttonType {
  title: string;
  customStyle?: string;
  onClick?: () => void;
}
const Button = ({ title, customStyle, onClick }: buttonType) => {
  return (
    <>
      <div
        className={`text-white cursor-pointer bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${
          customStyle ?? ""
        }`}
        onClick={onClick}
      >
        {title}
      </div>
    </>
  );
};

export default Button;
