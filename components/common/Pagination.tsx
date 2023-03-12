/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable no-var */
import React, { useEffect, useMemo, useState } from "react";

interface paginationType {
  total: number;
  pageSize: number;
  handlePageChange: (a: number, b: number) => void;
  pageNumber: number;
}

const Pagination = ({
  total,
  pageSize,
  handlePageChange,
  pageNumber,
}: paginationType) => {
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [currentPageValue, setCurrentPageValue] = useState(pageSize);
  const totalCount = total;
  const [customPage, setCustomPage] = useState("");

  var siblingCount = 2;

  // range detecting
  const range = (start: number, end: number) => {
    // eslint-disable-next-line prefer-const
    let length: number = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const PageNum = () => {
    const paginationRange = useMemo(() => {
      var DOTS = "...";
      const totalPageCount = Math.ceil(totalCount / currentPageValue);

      const totalPageNumbers = siblingCount + 5;

      if (totalPageNumbers >= totalPageCount) {
        return range(1, totalPageCount);
      }
      /*
        Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
      */
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPageCount
      );
      /*
        We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
      */
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

      const firstPageIndex = 1;
      const lastPageIndex = totalPageCount;

      /*
           Case 2: No left dots to show, but rights dots to be shown
       */
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = range(1, leftItemCount);

        return [...leftRange, DOTS, totalPageCount];
      }

      /*
           Case 3: No right dots to show, but left dots to be shown
       */
      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = range(
          totalPageCount - rightItemCount + 1,
          totalPageCount
        );
        return [firstPageIndex, DOTS, ...rightRange];
      }
      /*
           Case 4: Both left and right dots to be shown
       */
      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }
    }, [totalCount, currentPageValue, siblingCount, currentPage]);

    return paginationRange;
  };

  const handleOptionChange = (e: any) => {
    handlePageChange(currentPage, Number(e.target.value));
  };

  const pageCalling = (page: number | string) => {
    if (typeof page !== "number") return;
    setCurrentPage(page);
    handlePageChange(page, currentPageValue);
  };

  const previousCalling = (number: number) => {
    if (currentPage > 1) {
      pageCalling(currentPage - number);
    }
  };
  const nextCalling = (number: number) => {
    if (currentPage < Math.ceil(totalCount / currentPageValue)) {
      pageCalling(currentPage + number);
    }
  };

  const setCustomPageHandle = () => {
    if (customPage === "") return;
    const num = Number(customPage);
    setCustomPage("");
    if (num > Math.ceil(totalCount / currentPageValue)) return;
    if (num < 1) return;
    pageCalling(num);
  };

  useEffect(() => {
    setCurrentPage(pageNumber);
    setCurrentPageValue(pageSize);
  }, [pageNumber, pageSize]);

  const previousATagStyle =
    "relative inline-flex items-center px-4 py-2 border text-md font-medium bg-blue-100 text-indigo-500 rounded-l-[10px]";
  const dynamicATagStyle = "";
  const nextStyle =
    "relative inline-flex items-center px-2 py-2 border text-md font-medium rounded-r-[10px] bg-blue-100 text-indigo-500";
  const currentPageButtonStyle = "bg-indigo-600 text-white";
  const renderPageNumbers = PageNum()?.map((number, i) => {
    return (
      <li key={i}>
        <button
          className={`${
            currentPage === number ? currentPageButtonStyle : dynamicATagStyle
          }  relative inline-flex items-center px-4 py-2 border text-md font-medium`}
          onClick={() => pageCalling(number)}
        >
          {number}
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="2xl:flex 2xl:justify-between   mx-auto overflow-x-auto ">
        <div className="flex justify-center items-center">
          {/* showing page of  */}
          <span className="text-gray-500 text-md mr-5">
            Showing page <span className="font-bold">{currentPage}</span> of{" "}
            <span className="font-bold">
              {Math.ceil(totalCount / currentPageValue)}
            </span>
          </span>{" "}
          |{/* showing total data */}
          <span className="text-gray-700 text-md ml-5">
            Total Records: <span className="font-bold">{totalCount}</span>{" "}
          </span>
          <div className="w-[80px] mr-5">
            <select
              className="form-select mr-5 ml-5 appearance-none block w-full px-4 py-2 text-base
                            font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              onChange={handleOptionChange}
              value={currentPageValue}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="ml-5">
            <input
              type="number"
              onChange={(e) => setCustomPage(e.target.value)}
              className="px-2 py-2 w-20 rounded-lg border border-slate-300 mr-2  focus:outline-none focus:shadow-none"
            />
            <button
              onClick={setCustomPageHandle}
              className="bg-indigo-600 text-white py-2 px-2 hover:bg-blue-900 rounded-md"
            >
              GO
            </button>
          </div>
        </div>

        <nav className="">
          <ul className="flex justify-center 2xl:mt-0 mt-5">
            <li>
              <button
                className={previousATagStyle}
                onClick={() => previousCalling(1)}
              >
                Previous
              </button>
            </li>
            {renderPageNumbers}
            <li>
              <button className={nextStyle} onClick={() => nextCalling(1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
