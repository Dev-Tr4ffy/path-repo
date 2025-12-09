import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function GoalsPage() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
    
      <Head>
          <title>FPS Thrive PATH</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
      </Head>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-12 fade-in">
            <button
              onClick={goBack}
              className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-all font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Process
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 text-white">
                {/* You can insert an icon here later */}
              </div>

              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Shared Goals Setup</h1>
                <p className="text-gray-600">Define your shared goals and assign them to employees</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6"></h2>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="textInput"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Enter Shared Goals
                </label>
                <input
                  type="text"
                  id="textInput"
                  placeholder="Enter Goal 1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <input
                  type="text"
                  id="weightInput"
                  placeholder="Goal 1 % Weight"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <input
                  type="text"
                  id="weightInput"
                  placeholder="Category"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="weightInput"
                  placeholder="Target Date"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>

              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium rounded-lg cursor-pointer">
                + ADD GOAL
              </span>
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium rounded-lg cursor-pointer">
                SAVE AS DRAFT
              </span>
            </form>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 fade-in">
            <h3>Select Employees to Apply These Goals To:</h3>
            <br />

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold rounded-tl-xl">Action</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold rounded-tr-xl"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-purple-50 transition-all">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <input type="checkbox" className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer accent-purple-600" />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      VILLALBA, ERIKA MAITA VILLAGRACIA<br />
                      <span className="text-gray-400">erikamaita@fpsinc.com</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">(SR People and Culture Manager)</td>
                  </tr>

                  <tr className="hover:bg-purple-50 transition-all">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <input type="checkbox" className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer accent-purple-600" />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      BERMUDEZ, RAYMUND NARVASA<br />
                      <span className="text-gray-400">raymund.bermudez@fpsinc.com</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">(SR People and Culture Manager)</td>
                  </tr>
                </tbody>
              </table>

              <br />
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium rounded-lg cursor-pointer">
                SUBMIT GOALS TO SELECTED EMPLOYEES
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
