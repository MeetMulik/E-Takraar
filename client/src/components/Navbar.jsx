import React, { useState } from "react";
import { Link } from "react-router-dom";
import { close, menu } from "../assets";
import { useStateValue } from "../context/StateProvider";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <div className="bg-gray-gradient">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <header className="flex justify-between items-center py-2 md:py-4">
            <Link
              to="/"
              className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
              aria-label="logo"
            >
              <svg
                width="95"
                height="94"
                viewBox="0 0 95 94"
                className="w-6 h-auto text-indigo-500"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 0V47L48 94H0V47L48 0H96Z" />
              </svg>
              <span className="text-white">E-Takraar</span>
            </Link>
            <nav className="hidden lg:flex gap-12 ">
              <Link
                to="/"
                className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
              >
                Home
              </Link>
              <Link
                to="/usemodel"
                className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
              >
                Model
              </Link>
              <Link
                to="/learn"
                className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
              >
                Learn
              </Link>
              {(user && user.email === "meetmulik5@gmail.com" && (
                <Link
                  to="/allcomplaints"
                  className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                >
                  Admin
                </Link>
              )) || (
                <Link
                  to="/profile"
                  className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                >
                  My Profile
                </Link>
              )}
            </nav>
            <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
              <Link
                to="/login"
                className={
                  user
                    ? "bg-gray-200 px-2 py-3 rounded-lg"
                    : "inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                }
              >
                {user ? user.displayName : "Login"}
              </Link>
            </div>
            <div className="lg:hidden flex flex-1 justify-end items-center py-5">
              <img
                src={toggle ? close : menu}
                alt="menu"
                className="w-[28px] h-[28px] object-contain"
                onClick={() => setToggle(!toggle)}
              />
              <div
                className={`${
                  !toggle ? "hidden" : "flex"
                } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
              >
                <ul className="list-none flex justify-end items-start flex-1 flex-col">
                  <li
                    className={`font-poppins font-normal cursor-pointer text-[16px] `}
                  >
                    <Link to="/" className="text-white">
                      Home
                    </Link>
                  </li>
                  <li
                    className={`font-poppins font-normal cursor-pointer text-[16px] `}
                  >
                    <Link to="/usemodel" className="text-white">
                      Model
                    </Link>
                  </li>
                  <li
                    className={`font-poppins font-normal cursor-pointer text-[16px] `}
                  >
                    <Link to="/about" className="text-white">
                      About
                    </Link>
                  </li>
                  <li
                    className={`font-poppins font-normal cursor-pointer text-[16px] `}
                  >
                    <Link to="/profile" className="text-white">
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
