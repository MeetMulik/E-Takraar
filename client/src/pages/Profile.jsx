import React from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Profile = () => {
  const [{ user }, dispatch] = useStateValue();
  const logout = () => {
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <div className="">
      <div className="flex items-center justify-center gap-2  bg-gray-gradient p-5">
        <button
          to="/myprofile"
          type="button"
          className="text-white bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          My Profile
        </button>
        <Link
          to="/mycomplaints"
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          My Complaints
        </Link>
        <Link
          to="/registercomplaint"
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Raise a complaint
        </Link>
      </div>

      <div className="bg-black-gradient">
        <div class="flex h-screen w-full items-center justify-center ">
          <div class="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div class="grid-cols-1 lg:col-span-3">
                <div>
                  {/* <svg
                    id="logo-39"
                    width="50"
                    height="40"
                    viewBox="0 0 50 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.0001 0L50 15.0098V24.9863L25.0001 40L0 24.9863V15.0099L25.0001 0Z"
                      fill="#A5B4FC"
                      class="ccompli2"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 15.0098L25 0L50 15.0098V24.9863L25 40L0 24.9863V15.0098ZM25 33.631L44.6967 21.8022V18.1951L44.6957 18.1945L25 30.0197L5.30426 18.1945L5.3033 18.1951V21.8022L25 33.631ZM25 24.5046L40.1018 15.4376L36.4229 13.2298L25 20.0881L13.5771 13.2298L9.89822 15.4376L25 24.5046ZM25 14.573L31.829 10.4729L25 6.37467L18.171 10.4729L25 14.573Z"
                      fill="#4F46E5"
                      class="ccustom"
                    ></path>
                    <path
                      d="M25.0001 0L0 15.0099V24.9863L25 40L25.0001 0Z"
                      fill="#A5B4FC"
                      class="ccompli2"
                      fill-opacity="0.3"
                    ></path>
                  </svg> */}
                  <img
                    src={user?.photoURL}
                    referrerPolicy="no-referrer"
                    className="object-contain rounded-lg"
                    alt="userimg"
                  />
                </div>
              </div>

              <div className="col-span-1 lg:col-span-9">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold text-zinc-700">
                    {user?.displayName}
                  </h2>
                  <p className="mt-2 font-semibold text-zinc-700">
                    {user?.email}
                  </p>
                  <p className="mt-4 text-zinc-500">User ID: {user?.uid}</p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={logout}
                    type="button"
                    className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
