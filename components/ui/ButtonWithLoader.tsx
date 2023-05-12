import React from "react";
import Button from "./Button";
import LoaderButton from "./LoaderButton";
import type { MouseEventHandler } from "react";

export interface buttonLoaderInterface {
  isLoading: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  mainClass?: string;
  name: string;
  loaderName?: string;
  buttonClass?: string;
  svgClass?: string;
}
const ButtonWithLoader = ({
  isLoading,
  type,
  onClick,
  mainClass,
  name,
  loaderName,
  buttonClass,
  svgClass,
}: buttonLoaderInterface) => {
  return (
    <>
      {isLoading ? (
        <LoaderButton
          buttonClass={buttonClass}
          loaderName={loaderName}
          svgClass={svgClass}
        />
      ) : (
        <Button
          onClick={onClick}
          type={type}
          title={name}
          customStyle={mainClass}
        />
      )}
    </>
  );
};

export default ButtonWithLoader;
