import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import Loader from "../components/Loader";

const MyComplaints = () => {
  const [{ user, complaints }, dispatch] = useStateValue();

  const myComplaints = complaints?.filter(
    (complaints) => complaints.uid === user.uid
  );
  console.log("MyComplaints", MyComplaints);

  return (
    <div>
      <div className="flex items-center justify-center gap-2  bg-gray-gradient p-5">
        <Link
          to="/profile"
          type="button"
          className="text-white bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          My Profile
        </Link>

        <Link
          to="/registercomplaint"
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Raise a complaint
        </Link>
      </div>
      <div className="flex items-center justify-top flex-col p-5 h-screen ">
        <h1 className="text-3xl font-bold mb-3">My Complaints</h1>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Complaint ID
                </th>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Complaint Date
                </th>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Complaint Against
                </th>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Raised By:
                </th>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 ">
                  Complaint Description
                </th>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Status
                </th>
                <th class="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {myComplaints ? (
                myComplaints.map((complaint) => (
                  <tr>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {complaint.id}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                      {complaint.activity_date}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                      {complaint.sender_detail}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                      {complaint.user_detail}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 truncate">
                      {complaint.activity_description}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 truncate">
                      {complaint.activity_resolved ? "Resolved" : "Unresolved"}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2">
                      <Link
                        to={`/mycomplaints/${complaint.id}`}
                        class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <Loader />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;
