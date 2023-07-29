import { useRef, useState } from "react";
import bg from "./asset/bg.jpeg";
import { data } from "./Dummy";
import logo from "./asset/logo.jpeg"
import React from 'react'
import Filter from "./Filter";


const transformData = data => {
  const filterData = {};
  data.forEach(e => {
    e.attributes.forEach(fil => {
      if (filterData[fil]) {
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
      setDisplayingData(data.filter(obj => obj.attributes.includes(query.toLowerCase())));
    }
  }
  return (
    <div style={{ 
      position: "relative", 
      backgroundImage: `url(${bg})`,
      backgroundRepeat: "repeat",
      backgroundSize: "cover",
      width: '100vw',
      height: '100vh',
      overflow: 'auto'
    }}
    className="text-xs md:text-xl text-white"
    >
      <div>
        <img src={logo} alt=""  className="invisible md:visible absolute top-8 left-8 w-16 h-16 rounded-md"/>
        <h1 class="mt-12 text-xl md:text-4xl text-center font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-orange-600 to-white">
        Alien encyclopedia by <span className="text-lg bg-clip-text bg-gradient-to-br from-orange-600 to-gray-700">Hackerstreet Boys</span>
</h1>
      </div>

      <div
        className="m-4 md:m-8 lg:m-12 text-center"
      >
        <div className="flex items-center justify-center">
        <input
          ref={searchRef}
          type="text"
          className="border-b border-white w-[20rem] md:w-[40rem] outline-none bg-transparent  font-medium placeholder:font-medium"
          placeholder="Search for your favourite space creatures"
          onChange={onInputChange}
        />
        <Filter filters={filterData} setDisplayingData={setDisplayingData} chosenFilter={chosenFilter} setChosenFilter={setChosenFilter} />
        </div>

        <div
          className="flex flex-wrap items-center justify-center mt-8 overflow-hidden gap-2 md:gap-8 "
          
        >
          {displayingData.map((obj) => (
            <img
              src={obj.src}
              alt=""
              className="object-cover w-32 h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
