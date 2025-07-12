import { Link } from "react-router-dom";

const CurrentBidProduct = ({ products, isLoading }) => {
  console.log(products?.data?.data?.data);
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {products?.data?.data?.data?.map((item) => (
        <div
          key={item.id}
          className="border border-[#CAC3C3] bg-white rounded-xl"
        >
          <img
            className="w-full"
            src={VITE_IMG_URL + item.first_image}
            alt="image"
          />
          <div className="p-4 ">
            <div className="flex justify-between items-center">
              <div className="my-1">
                <p className="text-[14px] text-[#0C0D19]">{item.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] text-[#A8A8A8]">Current bid</p>
                  <p className="text-[15px] font-semibold text-[#0C0D19]">
                    {item.bid}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-[12px] text-[#161515] my-1">
              <span className="text-[#EE0B0B]">{item.bids.length} </span>· Time
              Ended ({item.time})
            </p>
            {/* <p className="text-[12px] text-[#161515] my-1">{item.delivery}</p> */}
            <p className="text-[12px] text-[#161515] my-1">
              From {item.country}
            </p>
            <Link to={`/auction-details/${item.id}`}>
              <button className="bg-[#4275F6] text-white py-2 md:py-3 rounded-2xl w-full hover:bg-[#4278F9] cursor-pointer transition-all duration-300 font-medium my-2">
                Quick Bid
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurrentBidProduct;
