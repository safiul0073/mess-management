import React from "react";
import { serverSideAuthentication } from "../functions/serverSideAuthentication";

function Home(): JSX.Element {
  return <></>;
}
export const getServerSideProps = serverSideAuthentication(["manager"]);
export default Home;
