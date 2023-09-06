import React from "react";

interface inputFieldType {
    label: string;
    type?: string;
    name: string;
    value: string | number | undefined;
    onChange: React.ChangeEventHandler | undefined;
    customInputStyle?: string;
    customLabelStyle?: string;
    placeHolder?: string;
    required?: boolean;
}
const InputField = ({
    label,
    type = "text",
    name,
    value,
    customInputStyle = "",
    customLabelStyle = "",
    placeHolder = "Enter text",
    required = false,
    onChange,
}: inputFieldType) => {
    return (
        <>
            <div>
                <label
                    htmlFor={name}
                    className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${customLabelStyle}`}
                >
                    {label}
                </label>
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${customInputStyle}`}
                    placeholder={placeHolder}
                    required={required}
                    onChange={onChange}
                />
            </div>
        </>
    );
};

export default InputField;
