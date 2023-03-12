import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";

interface barType {
  title: string;
  tableTitle: string;
  buttonTitle: string;
  buttonPush: string;
}

const TableTopBar = ({
  title,
  tableTitle,
  buttonTitle,
  buttonPush,
}: barType) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="md:flex justify-between items-center">
        <h1>{tableTitle}</h1>
        <Button
          title={buttonTitle}
          onClick={() => {
            void router.push(buttonPush);
          }}
        />
      </div>
    </div>
  );
};

export default TableTopBar;
