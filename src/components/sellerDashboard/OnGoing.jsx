import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import Title from "../common/Title";
import { Link } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EditListingForm from "./Edit/EditListingForm";

const OnGoing = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  const {
    data: AllSellerProduct = { data: [] }, // Default value to prevent undefined errors
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/seller/product`);
        // Ensure the response has a data array
        return {
          ...res.data,
          data: Array.isArray(res.data?.data) ? res.data.data : [],
        };
      } catch (err) {
        console.error("Error fetching products:", err);
        return { data: [] }; // Return empty array on error
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    // Ensure we have an array before proceeding
    if (!Array.isArray(AllSellerProduct.data)) return;

    const calculateTimeLeft = () => {
      const newTimeLeft = {};

      AllSellerProduct.data.forEach((item) => {
        if (item?.auction_end_at) {
          const endDate = new Date(item.auction_end_at);
          const now = new Date();
          const difference = endDate - now;

          if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            newTimeLeft[item.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          } else {
            newTimeLeft[item.id] = "Auction ended";
          }
        }
      });

      setTimeLeft(newTimeLeft);
    };

    // Calculate immediately
    calculateTimeLeft();

    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [AllSellerProduct]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  // Ensure products is always an array before mapping
  const products = Array.isArray(AllSellerProduct.data)
    ? AllSellerProduct.data
    : [];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="border border-[#E5E5E5] bg-white text-black rounded-lg relative"
          >
            <img
              src={`${import.meta.env.VITE_IMG_URL + item.images[0]}`}
              alt={item.title}
              className="w-full h-[250px] object-contain"
            />
            <div className="p-3 flex flex-col gap-1">
              <Title level="title12">{item.title}</Title>
              <Title level="title14" className="text-[#A8A8A8]">
                Biding Price now{" "}
                <span className="font-bold ml-2 text-black">{item.bid}</span>
              </Title>
              {item?.auction_end_at && (
                <div className="pb-1">
                  <p className="text-[#001AFF]">
                    Time left: {timeLeft[item.id] || "Over"}
                  </p>
                </div>
              )}
              <div className=" w-full flex items-center justify-between gap-2">
                <Title level="title12">{item?.country}</Title>
                <Button
                  type="primary"
                  onClick={() => handleEdit(item)}
                  className=""
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="Edit Product Listing"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1000}
      >
        {selectedProduct && (
          <EditListingForm
            key={selectedProduct?.id}
            product={selectedProduct}
            onSuccess={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default OnGoing;
