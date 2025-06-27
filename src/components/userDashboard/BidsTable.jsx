import React from "react";
import { ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react";

const sampleData = Array.from({ length: 12 }, (_, i) => ({
  name: ["Guy Hawkins", "Jane Cooper", "Jacob Jones", "Annette Black", "Esther Howard", "Wade Warren", "Courtney Henry", "Jerome Bell", "Floyd Miles", "Eleanor Pena", "Devon Lane", "Christopher Colombus"][i],
  category: i % 2 === 0 ? "Large Enterprise" : "MSV",
  owner: "Brooklyn Simmons",
  location: [
    "1901 Thornridge Cir. Shiloh",
    "6391 Elgin St. Celina, Delaw",
    "4517 Washington Ave. Manchester, Kentucky 39495",
    "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    "8502 Preston Rd. Inglewood, Maine 98380",
    "2464 Royal Ln. Mesa, New Jersey 45463",
    "2715 Ash Dr. San Jose, South Dakota 83475",
    "3517 W. Gray St. Utica, Pennsylvania 57867",
    "3891 Ranchview Dr. Richardson, California 62639",
    "3891 Ranchview Dr. Richardson, California 62639",
    "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    "4140 Parker Rd. Allentown, New Mexico 31134",
  ][i],
  price: "$10,000",
}));

const BidsTable = () => {
  return (
    <div className="p-6 bg-white rounded-md shadow-sm">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">456 Bids</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 text-gray-400 size-4" />
            <input
              type="text"
              placeholder="Search Bids"
              className="pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-sm text-gray-500">
            Showing{" "}
            <select className="border border-gray-300 px-2 py-1 rounded ml-1">
              <option>20</option>
              <option>10</option>
              <option>50</option>
            </select>{" "}
            of 60 result
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 border-b text-gray-600 font-medium">
            <tr>
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3 flex items-center gap-1">
                Product Name <ChevronDown className="w-4 h-4" />
              </th>
              <th className="p-3">Categories</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Location</th>
              <th className="p-3">Price</th>
              <th className="p-3">Product Image</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.owner}</td>
                <td className="p-3 text-gray-500">{item.location}</td>
                <td className="p-3 font-semibold">{item.price}</td>
                <td className="p-3">
                  <button className="text-sm text-white bg-blue-600 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>
          Showing <select className="border px-2 py-1 rounded mx-1">
            <option>10</option>
          </select>
          of 124
        </div>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 border rounded hover:bg-gray-100">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`px-3 py-1 border rounded ${
                p === 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
            >
              {p}
            </button>
          ))}
          <span className="px-2">...</span>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            16
          </button>
          <button className="px-2 py-1 border rounded hover:bg-gray-100">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidsTable;
