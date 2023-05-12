/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/promise-function-async */
import React, { memo } from "react";
import LoaderAnimation from "../../components/common/LoaderAnimation";
import Pagination from "../../components/common/Pagination";
import RowNotFound from "../../components/common/RowNotFound";
import TableTopBar from "../../components/common/TableTopBar";
import Thead from "../../components/common/Thead";
import { serverSideAuthentication } from "../../functions/serverSideAuthentication";
// import { getData } from "../../hooks/getData";

const heads = ["Name", "Email", "Phone", "Action"];

const index = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const handlePageChange = (pageNum: number, currentPageValue: number) => {
    setPage(() => pageNum);
    setPageSize(() => currentPageValue);
  };

  // const { isLoading, data } = getData("user/all", { page, pageSize });

  return (
    <div>
      <TableTopBar
        title="Users"
        tableTitle="User Lists"
        buttonTitle="Add new user"
        buttonPush="users/create"
      />
      {false ? (
        <LoaderAnimation />
      ) : true ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <Thead heads={heads} />
            <tbody>
              {/* {data?.data?.data?.map((user: any) => (
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
                  <td className="px-6 py-4">
                    <Link
                      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                      href={`users/${user?.id}`}
                      className="px-3 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
          <div className="my-4">
            <Pagination
              total={10}
              pageSize={pageSize}
              pageNumber={page}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <RowNotFound name="users" />
      )}
    </div>
  );
};

export const getServerSideProps = serverSideAuthentication(["manager"]);
export default memo(index);
