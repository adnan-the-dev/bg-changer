import React, { useEffect, useState } from "react";
import AddButton from "../addButton/AddButton";
import { getColorsButton } from "../../api/allColors/colors";
import { toast } from "react-toastify";
import axios from "axios";

export default function BgChanger() {
  const url = import.meta.env.VITE_BASE_URL_API;
  const [bgColor, setBgColor] = useState("olive");
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getColorsButton();
      if (response) {
        setData(response.data.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  // delete color api

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/deleteBackground/${id}`);
      if (response.status === 200) {
        // Handle success response
        fetchData();
        toast.success(response.data.message);
        // Perform any additional actions upon successful deletion
      } else {
        throw new Error("Failed to delete background color");
      }
    } catch (error) {
      console.error("Error deleting background color:", error);
      // Handle error response
      toast.error("Error deleting background color");
    }
  };

  if (loading) return <>Loading....</>;
  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: bgColor }}
    >
      <AddButton
        fetchData={fetchData}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className=" flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl border border-red-600">
          {data.map((item, i) => {
            return (
              <>
                <div
                  key={i}
                  className="flex items-center border border-gray-500 rounded-full"
                >
                  <button
                    className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
                    onClick={() => setBgColor(item.color)}
                    onMouseEnter={() => setHovered(item.name)}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.name}
                  </button>
                  <span>
                    {hovered === item.name && (
                      <svg
                        onClick={() => handleDelete(item._id)}
                        className="cursor-pointer size-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
