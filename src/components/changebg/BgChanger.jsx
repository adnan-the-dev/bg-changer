import React, { useEffect, useState } from "react";
import { array } from "../btnArray";
import axios from "axios";
import getColorApi from "../../api/allApi";
import AddButton from "../addButton/AddButton";

export default function BgChanger() {
  const url = import.meta.env.VITE_BASE_URL_API;
  const [bgColor, setBgColor] = useState("olive");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await getColorApi(`${url}/colors`, setLoading);
    if (response) {
      setData(response.data.result);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <h1>Loading....</h1>;
  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: bgColor }}
    >
      <AddButton/>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          {data.map((item, i) => {
            return (
              <button
                key={i}
                className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
                onClick={() => setBgColor(item.color)}
                style={{ backgroundColor: item.color }}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
