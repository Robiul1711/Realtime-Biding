import Logo from "@/assets/images/logo.png";
import SearchContainer from "./SearchContainer";
import SelectComponent from "@/components/common/SelectComponent";
import { LocationIcon } from "@/components/common/CustomIcon";
import UserActions from "@/components/common/UserAction";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEmail } from "@/hooks/useEmail";
import { Link, useNavigate } from "react-router-dom";

const Navbar2 = () => {
  const { search,setSearchResults } = useEmail(); // { cat, q }
  const axiosPublic = useAxiosPublic();
  const navigate=useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await axiosPublic.get("/countries");
      return response.data;
    },
  });

const {
  mutate: triggerSearch,
  isPending,
} = useMutation({
  mutationFn: async (payload) => {
    const response = await axiosPublic.post("/products/search", payload);
    return response.data;
  },
  onSuccess: (response) => {
    
    console.log("✅ Search Success:", response);
    setSearchResults(response?.data?.data);
    navigate("/search-result");
  },
  onError: (error) => {
    console.error("❌ Search Error:", error);
    console.error("Error details:", error.response?.data);
  },
});

const handleSearch = () => {
  const searchPayload = {
    cat: search.cat || "",
    q: search.q || "",
    country: search.country || "",
  };

  console.log("🔍 Sending Search Payload:", searchPayload);
  triggerSearch(searchPayload);
};


  return (
    <div className="flex flex-col xmd:flex-row w-full items-start xmd:items-center justify-between section-padding-x mt-20 gap-12">
      <div className="flex flex-wrap items-center  gap-4 sm:gap-6 ">
        {/* Logo + Search */}
        <div className="flex  items-center gap-4 sm:gap-6 flex-1 min-w-[280px]">
          <div className="w-[60px] md:w-[80px] lg:w-[126px] xl:w-[166px]  hidden md:block">
            <Link to={"/"}>
              <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
            </Link>
          </div>

          {/* Search */}
          <div className="">
            <SearchContainer />
          </div>
        </div>

        {/* Location Selector */}
        <div className="w-full sm:w-auto min-w-[180px]">
          <SelectComponent
            options={data?.data}
            isLoading={isLoading}
            icon={<LocationIcon />}
          />
        </div>

        {/* Search Button */}
        <div className="w-full sm:w-auto">
<button
  onClick={handleSearch}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded w-full sm:w-auto flex items-center justify-center gap-2"
  disabled={isPending}
>
  {isPending ? (
    <>
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Searching...
    </>
  ) : (
    "Search"
  )}
</button>

        </div>
      </div>

      {/* User Actions */}
      <div className="hidden lg:block xlg:ml-5">
        <UserActions />
      </div>
    </div>
  );
};

export default Navbar2;
