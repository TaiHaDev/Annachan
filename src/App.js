import { useRef, useState } from "react";
import bg from "./image/bg.jpeg";
import { data } from "./Dummy";
import logo from "./image/logo.jpeg";
import React from "react";
import Filter from "./Filter";
import { getRandomLightColor } from "./ultilities/GenerateColor";

const transformData = (data) => {
  const filterData = {};
  data.forEach((e) => {
    e.Morophological.forEach((fil) => {
      if (filterData[fil] != null) {
        filterData[fil].push(e);
      } else {
        filterData[fil] = [e];
      }
    });
  });
  return filterData;
};

function App() {
  const [displayingData, setDisplayingData] = useState(data);
  const [filterData, setFilterData] = useState(transformData(data));
  const [chosenFilter, setChosenFilter] = useState([]);
  const searchRef = useRef();
  const onInputChange = () => {
    const query = searchRef.current.value.trim();
    if (query === "") {
      setDisplayingData(data);
    } else {
      setDisplayingData(
        data.filter((obj) => {
          const res = obj.Morophological.filter(str => str.includes(query.toLowerCase()));
          return res.length > 0;
        })
      );
    }
  };
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        overflow: "auto",
      }}
      className="text-xs md:text-xl text-white"
    >
      <div>
        <img
          src={logo}
          alt=""
          className="invisible md:visible absolute top-8 left-8 w-16 h-16 rounded-md"
        />
        <h1 className="mt-12 text-xl md:text-4xl text-center font-medium text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800">
          ALIEN ENCYCLOPEDIA BY{" "}
          <span className="text-lg bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-300 via-fuchsia-600 to-orange-600">
            Hackerstreet Boys
          </span>
        </h1>
      </div>

      <div className="m-4 md:m-8 lg:m-12 text-center">
        <div className="flex items-center justify-center">
          <input
            ref={searchRef}
            type="text"
            className="border-b border-white w-[20rem] md:w-[40rem] outline-none bg-transparent  font-medium placeholder:font-medium"
            placeholder="Search for your favourite space creatures"
            onChange={onInputChange}
          />
          <Filter
            filters={filterData}
            setDisplayingData={setDisplayingData}
            chosenFilter={chosenFilter}
            setChosenFilter={setChosenFilter}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center mt-8 overflow-hidden gap-2 md:gap-8 ">
          {displayingData.map((obj) => (
            <div key={obj.name} className="flip-card w-32 h-32 md:w-40 md:h-40 lg:w-96 lg:h-96 rounded-md">
              <div className="flip-card-inner">
                <div className="flip-card-front ">
                  <img
                    src={obj.imageURL}
                    alt=""
                    className="object-cover w-32 h-32 md:w-40 md:h-40 lg:w-96 lg:h-96 rounded-lg"
                  />
                </div>
                <div
                  className={`flip-card-back bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex flex-col items-center justify-center p-2`}
                >
                  <div className="">
                    <p >Name:</p>
                    <p className="text-black text-sm">{obj.name}</p>
                  </div>
                  <div>
                    <p >Genetic Structure:</p>
                    <p className="text-sm text-black">
                      {obj.Genetic_Structure}
                    </p>
                  </div>
                  <div>
                    <p >Behaviour: </p>
                  <p className="text-sm text-center text-black">
                    {obj.Behaviour}
                  </p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
