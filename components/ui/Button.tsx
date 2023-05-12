import React from "react";
import type { MouseEventHandler } from "react";
interface buttonType {
  title: string;
  type?: "button" | "submit" | "reset" | undefined;
  customStyle?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button = ({ title, type, customStyle, onClick }: buttonType) => {
  return (
    <>
      <button
        type={type ?? "button"}
        className={`text-white cursor-pointer bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${
          customStyle ?? ""
        }`}
        onClick={onClick}
      >
        {title}
      </button>
    </>
  );
};

export default Button;
