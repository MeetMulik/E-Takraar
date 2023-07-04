import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import Loader from "../components/Loader";

const AdminComplaints = () => {
  const [{ complaints }, dispatch] = useStateValue();
  return (
    <div>
      <div className="flex items-center justify-top flex-col p-5 h-screen ">
        <h1 className="text-3xl font-bold mb-3">All Complaints</h1>
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
              {complaints ? (
                complaints.map((complaint) => (
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
                        to={`/allcomplaints/${complaint.id}`}
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

export default AdminComplaints;
