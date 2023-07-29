import { useRef, useState } from "react";
import bg from "./asset/bg.jpg";
import { data } from "./Dummy";
import React from 'react'

function App() {
  const [displayingData, setDisplayingData] = useState(data);
  const searchRef = useRef();
  const onInputChange = () => {
    const query = searchRef.current.value;
    if (query === "") {
      setDisplayingData(data);
    } else {
      setDisplayingData(data.filter(obj => obj.attributes.includes(query.trim().toLowerCase())));
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
    className="text-xs md:text-xl"
    >
      <div
        className="m-4 md:m-12 lg:m-24 text-center"
      >
        <input
          ref={searchRef}
          type="text"
          className="border-b border-black w-[20rem] md:w-[40rem] outline-none bg-transparent  font-medium placeholder:font-medium"
          placeholder="Search for your favourite space creatures"
          onChange={onInputChange}
        />
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
