import React, { useEffect, useState } from "react";
import hamburger from "../assets/hamburger.svg";
import hamburger_active from "../assets/hamburger-active.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const Navbar = () => {
  const navigate = useNavigate();

  //state
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${query}`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-400 to-red-700">
      <div className="flex container mx-auto px-4 py-2 justify-between items-center lg:px-10">
        {/* ICON */}
        <div
          className="order-1 sm:order-2 lg:order-1"
          onClick={() => navigate("/")}>
          <img className="cursor-pointer h-9" src="/src/assets/logo.png" />
        </div>
        {/* MENU */}
        <div
          className="order-2 sm:order-1 lg:hidden"
          onClick={() => setToggleNavbar(toggleNavbar ? false : true)}>
          <img
            className="h-10 w-10 cursor-pointer"
            src={toggleNavbar ? hamburger_active : hamburger}
            alt="hamburger"
          />
        </div>

        <div className="hidden lg:block lg:order-2">
          <ul className="flex items-center gap-1 bg-red-700 border-2 border-gray-400 rounded-full text-white">
            <li
              className="cursor-pointer rounded-full hover:text-red-700 hover:bg-gray-400 px-4 hover:font-bold"
              onClick={() => navigate("/")}>
              Home
            </li>
            <li
              className="cursor-pointer rounded-full hover:text-red-700 hover:bg-gray-400 px-4 hover:font-bold"
              onClick={() => navigate("/seiyu")}>
              Seiyu
            </li>
            <li
              className="cursor-pointer rounded-full hover:text-red-700 hover:bg-gray-400 px-4 hover:font-bold"
              onClick={() => navigate("/about")}>
              About
            </li>
          </ul>
        </div>
        {/* SEARCH */}
        <div className="hidden sm:block order-3">
          <input
            className="cursor-pointer rounded-l-lg border-gray-400 border-2 pl-2 pr-2 border-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className=" border-gray-400 border-y-2 border-r-2 rounded-r-lg text-justify bg-red-700 text-white hover:bg-slate-400 hover:text-black hover:border-black"
            onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {/* DROP MENU */}
      <div className={`${toggleNavbar ? "block" : "hidden"} lg:hidden`}>
        <ul
          className="flex flex-col gap-1 font-kenia text-sm sm:text-lg bg-gradient-to-r from-red-700 to-gray-400"
          onClick={() => setToggleNavbar(toggleNavbar ? false : true)}>
          <li
            className="cursor-pointer border-red-700 border-y-2 bg-gray-400 hover:text-white hover:bg-red-700 hover:border-gray-400 px-4"
            onClick={() => navigate("/")}>
            Home
          </li>
          <li
            className="cursor-pointer border-red-700 border-y-2 bg-gray-400 hover:text-white hover:bg-red-700 hover:border-gray-400 px-4"
            onClick={() => navigate("/seiyu")}>
            Seiyu
          </li>
          <li
            className="cursor-pointer border-red-700 border-y-2 bg-gray-400 hover:text-white hover:bg-red-700 hover:border-gray-400 px-4"
            onClick={() => navigate("/about")}>
            About
          </li>
        </ul>
      </div>

      <div
        className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 bg-gradient-to-r from-red-700 to-gray-400 mx-4 rounded-lg"
        onClick={searchResults ? "block" : "hidden"}>
        {searchResults.map((anime) => (
          <Card all={anime} />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
