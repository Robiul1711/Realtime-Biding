import React, { useState, useEffect } from "react";
import { ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

const BidsTable = () => {
  const { pathname } = useLocation();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // State for pagination, search, and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "desc",
  });

  // Fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["action-history"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/auth/auctions`);
      return res.data;
    },
  });

  // Process and filter data
  const [processedBids, setProcessedBids] = useState([]);

  const claimMutation = useMutation({
    mutationFn: async (body) => {
      const res = await axiosSecure.post(`/stripe/onboading`, body);
      return res.data;
    },
    onSuccess: (response) => {
      toast.success(response?.message);
      window.open(response?.data?.checkout_url,"_blank")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to claim");
    },
  });

  const handleClick = (id) => {
    const payload = {
      bid_id: id,
      payment_method: "stripe",
    };
    claimMutation.mutate(payload);
  };

  useEffect(() => {
    if (data?.data) {
      let filteredData = [...data.data];

      // Apply search filter
      if (searchTerm) {
        filteredData = filteredData.filter(
          (bid) =>
            bid.product.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            bid.product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }

      // Apply sorting
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });

      setProcessedBids(filteredData);
    }
  }, [data, searchTerm, sortConfig]);

  // Handle sort request
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedBids.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processedBids.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-md shadow-sm">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-md shadow-sm">
        <div className="text-center py-10 text-red-500">
          Failed to load bid history. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-md shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {pathname === "/user-dashboard/bid-history"
            ? `${processedBids.length} Bids`
            : `${processedBids.length} Auction`}
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 text-gray-400 size-4" />
            <input
              type="text"
              placeholder="Search Bids"
              className="pl-8 pr-4 py-2 w-full text-black  text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 border-b text-gray-600 font-medium">
            <tr>
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => requestSort("title")}
                >
                  Product Name
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      sortConfig.key === "title" &&
                      sortConfig.direction === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              </th>
              <th className="p-3">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => requestSort("amount")}
                >
                  Bid Amount
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      sortConfig.key === "amount" &&
                      sortConfig.direction === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              </th>
              <th className="p-3">Win Status</th>
              <th className="p-3">Location</th>
              <th className="p-3">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => requestSort("created_at")}
                >
                  Date
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      sortConfig.key === "created_at" &&
                      sortConfig.direction === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              </th>
              <th className="p-3">Product Image</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((bid) => (
                <tr
                  key={bid.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3 font-medium">{bid.product.title}</td>
                  <td className="p-3">${bid.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        bid.is_winner === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {bid.is_winner === 1 ? "Won" : "Not Won"}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">
                    {bid.product.city}, {bid.product.country}
                  </td>
                  <td className="p-3">
                    {new Date(bid.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {bid.product.images.length > 0 && (
                      <img
                        src={`${
                          import.meta.env.VITE_IMG_URL + bid.product.images[0]
                        }`}
                        alt={bid.product.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-3">
                    {bid.is_winner === 1 && (
                      <button
                        onClick={() => handleClick(bid?.id)}
                        disabled={claimMutation.isPending && claimMutation.variables?.bid_id === bid.id}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center "
                      >
                        {claimMutation.isPending && claimMutation.variables?.bid_id === bid.id ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Claim
                          </>
                        ) : (
                          "Claim"
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-4 text-center text-gray-500">
                  No bids found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {processedBids.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-gray-600 gap-3">
          <div>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, processedBids.length)} of{" "}
            {processedBids.length} entries
          </div>
          <div className="flex items-center gap-1">
            <button
              className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Always show first page */}
            <button
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
              onClick={() => paginate(1)}
            >
              1
            </button>

            {/* Show ellipsis if needed */}
            {currentPage > 3 && <span className="px-2">...</span>}

            {/* Show previous page if not first */}
            {currentPage > 2 && (
              <button
                className="px-3 py-1 border rounded hover:bg-gray-100 text-gray-800"
                onClick={() => paginate(currentPage - 1)}
              >
                {currentPage - 1}
              </button>
            )}

            {/* Show current page if not first or last */}
            {currentPage > 1 && currentPage < totalPages && (
              <button className="px-3 py-1 border rounded bg-blue-600 text-white">
                {currentPage}
              </button>
            )}

            {/* Show next page if not last */}
            {currentPage < totalPages - 1 && (
              <button
                className="px-3 py-1 border rounded hover:bg-gray-100 text-gray-800"
                onClick={() => paginate(currentPage + 1)}
              >
                {currentPage + 1}
              </button>
            )}

            {/* Show ellipsis if needed */}
            {currentPage < totalPages - 2 && <span className="px-2">...</span>}

            {/* Always show last page if there is more than one page */}
            {totalPages > 1 && (
              <button
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
                onClick={() => paginate(totalPages)}
              >
                {totalPages}
              </button>
            )}

            <button
              className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidsTable;