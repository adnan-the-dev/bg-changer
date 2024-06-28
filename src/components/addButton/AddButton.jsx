import { ArrowRight, Plus } from "lucide-react";
import React, { useState } from "react";
import { getPostColorApi } from "../../api/allApi";
export default function AddButton() {
  const url = import.meta.env.VITE_BASE_URL_API;

  const [formData, setFormData] = useState({
    name: "",
    color: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //   const reset = () => {
  //     setFormData({
  //       name: "",
  //       color: "",
  //     });
  //   };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData?.name,
      color: formData?.color,
    };

    try {
      const res = await getPostColorApi(payload);

      console.log(res, "resssssssssss");
    } catch (e) {
      toast.update(toastId, {
        render: `An error occurred: ${e.message}`,
        type: "error",
        ...toastOptions,
      });
      // toast.error(`An error occurred: ${e.message}`);
    }
  };

  return (
    <>
      <div className="pt-2 pl-2">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Add Button
          <Plus className="ml-2 h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Genrate Button
            </h2>
            <p className="mt-2 text-base text-gray-600">Already Exite color?</p>
            <form className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Color Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="color"
                  className="text-base font-medium text-gray-900"
                >
                  Color
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Color Name/Code"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={handleSubmit}
                >
                  Create Button <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
