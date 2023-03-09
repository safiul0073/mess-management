import React from "react";
import { serverSideAuthentication } from "../functions/serverSideAuthentication";

function Home(): JSX.Element {
  return (
    <>
      <div>
        <h1>Hell dashboard</h1>
      </div>
    </>
  );
}
export const getServerSideProps = serverSideAuthentication(["manager"]);
export default Home;
