
import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

// const data = [
//   {
//     image: car,
//     title: "Electronics",
//   },
//   {
//     image: car1,
//     title: "Home & Kitchen",
//   },
//   {
//     image: car2,
//     title: "Sports & Outdoors",
//   },
//   {
//     image: car3,
//     title: "Health & Beauty",
//   },
//   {
//     image: car4,
//     title: "Health & Beauty",
//   },
//   {
//     image: car2,
//     title: "Health & Beauty",
//   },
//   {
//     image: car3,
//     title: "Health & Beauty",
//   },
// ];
const TrendingOn = () => {

  const axiosPublic=useAxiosPublic();

  const { data} = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosPublic.get("/categories/trending");
      return response.data;
    },
  });

 
  return (
    <div className="section-padding-x py-6 sm:py-10">
      <div className="flex justify-between items-center mb-5">
        <Title level="title40">Trending On</Title>
        {/* <p className="text-red-500  flex items-center gap-2">
          Show All <FiArrowUpRight className="text-2xl" />
        </p> */}
      </div>

      <div>
        <Swiper
          spaceBetween={16}
          slidesPerView={6}
          loop
          grabCursor={true}
          breakpoints={{
            320: { slidesPerView: 2 },
            495: { slidesPerView: 3 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className="w-full"
        >
          {data?.data?.map((item, index) => (
            <SwiperSlide key={index}>
              
                <div className="flex justify-center border py-5 px-3 sm:py-10 rounded-2xl items-center flex-col gap-3">
                  <img
                    className=" size-12 sm:size-16 md:size-20 rounded-full object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                  <Title level="title18">{item.title}</Title>
                </div>
              
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center mt-5 sm:mt-10 bg-[#EAEAEA] p-6 sm:p-10 rounded-2xl">
        <div>
          <Title level="title48">Bid Smart, Win Big!</Title>
          <Title level="title16" className="text-gray-600 mt-2">
            Experience secure auctions, reliable deals, and hassle-free bidding.
          </Title>
        </div>
        <Link to={"/auction-list"} className="mt-6 md:mt-0">
          <button className="bg-[#FB0000] text-white px-8 cursor-pointer py-2 sm:py-3 md:py-4 rounded-full">
            Start now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingOn;
