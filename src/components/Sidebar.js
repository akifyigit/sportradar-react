import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden fixed top-2/4 left-4 z-25 p-3 bg-white rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed md:sticky top-0 bottom-0 left-0 w-64 bg-white shadow-lg p-4 flex flex-col gap-6
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:flex z-40
        `}
      >
        <div className="flex items-center gap-3 text-[#0d121b]">
          <h2 className="text-xl font-bold tracking-tight">Sport Tracker</h2>
        </div>

        {/* Close button for mobile */}
        <button
          className="self-end p-2 text-gray-500 hover:text-gray-700 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <i className="fa-solid fa-x"></i>
        </button>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 border-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
          >
            <i className="fa-solid fa-grip"></i>
            <span className="  md:inline">Dashboard</span>
          </button>

          <button
            onClick={() => {
              navigate("/add-event");
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 border-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
          >
            <i className="fa-solid fa-plus"></i>
            <span className=" md:inline">Add Event</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
