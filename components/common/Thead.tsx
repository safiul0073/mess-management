import React from "react";

interface tType {
  heads: Array<string | number>;
}

const Thead = ({ heads }: tType) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {heads.map((head, idx) => (
          <th key={idx} scope="col" className="px-6 py-3">
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
