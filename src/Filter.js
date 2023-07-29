import React, { useState } from "react";
import { data } from "./Dummy";
const Filter = ({
  filters,
  setDisplayingData,
  chosenFilter,
  setChosenFilter,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const onChooseFilter = (key) => {
    setChosenFilter((prev) => {
      const newFilter = [...prev];
      if (newFilter.includes(key)) {
        newFilter.splice(newFilter.indexOf(key), 1);
      } else {
        newFilter.push(key);
      }

      let res = [];
      newFilter.forEach((fil) => {
        res = [...filters[fil], ...res];
      });
      if (newFilter.length !== 0) {
        setDisplayingData(res);
      } else {
        setDisplayingData(data);
      }

      return newFilter;
    });
  };

  return (
    <div className="relative ml-8">
      <button
        onClick={() => setIsOpened(prev => !prev)}
        className="text-white bg-gradient-to-r from-purple-600 via-orange-500 to-purple-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Filter
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      { isOpened && 
        <div className="absolute   z-10  w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
        <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
          { Object.entries(filters).map(([key, value]) => (
            <li>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value=""
                    onChange={() => onChooseFilter(key)}
                    checked={chosenFilter.includes(key)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />

                  <p className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {key}
                  </p>
                </div>

                <p className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {value.length}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>}
    </div>
  );
};

export default Filter;
