/* eslint-disable @typescript-eslint/promise-function-async */
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/common/Button";
import { serverSideAuthentication } from "../../functions/serverSideAuthentication";
import { getData } from "../../hooks/getData";

const index = () => {
  const router = useRouter();

  const { data } = getData("user/all");
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
            {data?.data?.map((user: any) => (
              <tr
                key={user?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user?.name}
                </th>
                <td className="px-6 py-4">{user?.email}</td>
                <td className="px-6 py-4">{user?.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = serverSideAuthentication(["manager"]);
export default index;
