// import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#f1f3f2]  p-6 w-full mb-7">
        <div className="container mx-auto">
          <h2 className=" text-2xl text[#212529]">Get the freshCart App</h2>
          <p className="font-light text-[#6d767e]">
            We will send you alink,open it on your phone to download the App.
          </p>
          <div className="flex gap-3 mt-3 mb-8">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block grow me-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email..."
              required
            />
            <button className="bg-[#0aad0a] text-white rounded-md p-1 px-2">
              Share App Link
            </button>
          </div>
          <div className="partner flex justify-between py-6 border-y-2 border-gray-200 mb-5">
            <div className="payment">
              <p className="">Payment Partners</p>
            </div>
            <div className="app">
              <p className="">Get deliveries with FreshCart</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
