import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import { MdPersonOutline, MdSpeakerNotes } from "react-icons/md";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "@firebase/firestore";
import { firestore } from "../utils/firebase-config";
import { toast } from "react-toastify";

const ComplaintDetail = () => {
  const [{ complaints }, dispatch] = useStateValue();
  const { id } = useParams();
  const [showInput, setShowInput] = useState(false);
  const [bodyName, setbodyName] = useState("");
  const [progress, setProgress] = useState("");
  const complaint = complaints?.find((complaint) => complaint.id === id);

  const handleInput = (e) => {
    e.preventDefault();
    setShowInput(!showInput);
  };

  const [reports, setReports] = useState([]);

  const addReport = async (e) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    e.preventDefault();
    await addDoc(collection(firestore, "complaints", id, "reports"), {
      addedBy: bodyName,
      report: progress,
      timestamp: currentDate,
    });
    toast.success("Complaint Added Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      setbodyName("");
      setProgress("");
    }, 2000);
  };

  console.log("params", id);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(firestore, "complaints", id, "reports"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setReports(snapshot.docs.map((doc) => doc.data()))
      ),
    [firestore, id]
  );

  const handleMark = async (e) => {
    e.preventDefault();
    await updateDoc(doc(firestore, "complaints", id), {
      activity_resolved: true,
    });
  };

  return complaint ? (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="grid gap-4 lg:grid-cols-5">
              <div className="order-last flex gap-4 lg:order-none lg:flex-col"></div>

              <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
                <img
                  src={complaint?.activity_imageURL}
                  alt="img"
                  className="h-full w-full object-cover object-center"
                />

                <span className="absolute left-0 top-0 rounded-br-lg bg-black px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                  Photo Proof:
                </span>
              </div>
            </div>
            <div className="md:py-8">
              <div className="mb-2 md:mb-3">
                <span className="mb-0.5 inline-block text-gray-500">
                  {complaint?.activity_resolved ? "Resolved" : "Unresolved"}
                </span>
                <h2 className="text-2xl font-bold text-gray-800 lg:text-2xl">
                  Complaint Raised By: {complaint?.user_detail}
                </h2>
                <h2 className="text-2xl font-bold text-gray-800 lg:text-2xl mt-2">
                  Complaint Raised Against: {complaint?.sender_detail}
                </h2>
              </div>

              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-gray-500 mb-3 mt-3 md:text-2xl">
                    Date of occurence: {complaint?.activity_date}
                  </span>
                </div>

                <span className="text-sm text-gray-500">
                  <span className="font-bold">Complaint Description:</span>{" "}
                  {complaint?.activity_description}
                </span>
              </div>
              <div className="flex gap-2.5">
                <button className="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base">
                  Update Progress
                </button>

                <button
                  onClick={handleMark}
                  className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                >
                  Mark As Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="bg-white py-6 sm:py-8 lg:py-12">
          <div class="mx-auto max-w-screen-md px-4 md:px-8">
            <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl xl:mb-12">
              Progress Report
            </h2>

            <div class="mb-4 flex items-center justify-between border-t border-b py-4">
              <div class="flex flex-col gap-0.5">
                <span class="block font-bold">All Reports</span>

                <div class="-ml-1 flex gap-0.5"></div>

                <span class="block text-sm text-gray-500">
                  Reports written by different bodies
                </span>
              </div>

              <button
                onClick={handleInput}
                class="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
              >
                Write a progress report
              </button>
            </div>

            {showInput && (
              <div className="bg-gray-200 p-10 rounded-lg">
                <label
                  for="input-group-1"
                  class="block mb-2 text-sm font-medium text-black"
                >
                  Email/Name
                </label>
                <div class="relative mb-6">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-900">
                    <MdPersonOutline />
                  </div>
                  <input
                    type="text"
                    id="input-group-1"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Your Details"
                    onChange={(e) => setbodyName(e.target.value)}
                  />
                </div>
                <label
                  for="input-group-1"
                  class="block mb-2 text-sm font-medium text-black"
                >
                  Progress until now:
                </label>
                <div class="relative ">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-900">
                    <MdSpeakerNotes />
                  </div>
                  <input
                    type="text"
                    id="input-group-1"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Progress Report Details"
                    onChange={(e) => setProgress(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <button
                    onClick={addReport}
                    class="relative inline-flex items-center justify-center p-4 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-gray-900 rounded-full shadow-md group"
                  >
                    <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gray-900 group-hover:translate-x-0 ease">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span class="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                      Add Report
                    </span>
                    <span class="relative invisible">Button Text</span>
                  </button>
                </div>
              </div>
            )}

            <div class="divide-y">
              <div>
                {reports?.map((report) => (
                  <div class="flex flex-col gap-3 py-4 md:py-8">
                    <div>
                      <span class="block text-sm font-bold">
                        Added By: {report.addedBy}
                      </span>
                      <span class="block text-sm text-gray-500">
                        Report Added Date :{" "}
                        <span className="font-bold">{report.timestamp}</span>
                      </span>
                    </div>

                    <p class="text-black">{report.report}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  );
};

export default ComplaintDetail;
