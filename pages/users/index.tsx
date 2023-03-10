/* eslint-disable @typescript-eslint/promise-function-async */
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/common/Button";
import { serverSideAuthentication } from "../../functions/serverSideAuthentication";

const index = () => {
  const router = useRouter();

  return (
    <div>
      <div className="md:flex justify-between items-center">
        <h1>User List</h1>
        <Button
          title="Add New User"
          onClick={() => router.push("/users/create")}
        />
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Price
              </th> */}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = serverSideAuthentication(["manager"]);
export default index;
