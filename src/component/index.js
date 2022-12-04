import React, { useEffect, useState } from "react";
import { mockData } from "../data.js";

const Pexels = () => {
  const [data, setData] = useState(mockData);
  const [selectedImage, setSelectedImage] = useState(mockData[0]);
  const [querystringParam, setQuerystringParam] = useState("nature");

  const getData = async () => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${querystringParam}&per_page=3`,
        {
          headers: {
            Authorization:
              "Bearer 563492ad6f917000010000017f488949f5c24f7cb9fc4ad4069c1050",
          },
        }
      );
      const data = await response.json();
      console.log(data.error);
      console.log(data.photos);
      if (!data.error) {
        console.log("no error");
        setData(data.photos);
        localStorage.setItem("data", JSON.stringify(data));
        setSelectedImage(data.photos[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [querystringParam]);

  const selectedImageHandler = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="pr-10">
      <div className="grid grid-cols-4">
        <div className="grid justify-center content-center gap-5 col-span-1">
          {data &&
            data.map((item, index) => (
              <div key={item.id}>
                <button
                  onClick={() => selectedImageHandler(item)}
                  key={item.id}
                  id={item.id}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Image {index + 1}
                </button>
              </div>
            ))}
        </div>
        <div className="col-span-3 grid content-center ">
          <div className="grid xl:grid-cols-2 sm:grid-cols-1 text-left">
            <label htmlFor="search">Query String Parameter: </label>
            <input
              type="text"
              placeholder="Change Query String Param"
              onChange={(e) => setQuerystringParam(e.target.value)}
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            ></input>
          </div>
          <div className=" flex  justify-start">
            {data && (
              <div className="" key={selectedImage.id}>
                <a
                  className="cursor-pointer "
                  href={selectedImage.photographer_url}
                >
                  <span className="text-4xl">{selectedImage.photographer}</span>
                </a>
                <img
                  className="object-cover"
                  src={selectedImage.src.large}
                  alt={selectedImage.alt}
                />
              </div>
            )}
          </div>
          <div
            className={`grid grid-cols-3 justify-center lg:w-96 md:w-80 md:h-80  cursor-pointer pt-5`}
          >
            {data &&
              data.map((item) => (
                <img
                  key={item.id}
                  onClick={() => selectedImageHandler(item)}
                  src={item.src.large}
                  alt={item.alt}
                  className={` ${
                    item.id === selectedImage.id && "border-4 border-blue-500"
                  } `}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pexels;
