import React from 'react'
import Title from '../common/Title'
import MyWishListCard from './MyWishListCard'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const WishList = () => {
    const aniosSecure = useAxiosSecure();
const { data: bookmark, isLoading } = useQuery({
  queryKey:["bookmark"],
  queryFn: () => aniosSecure.get("/bookmark"),
})

  return (
    <div>
      <Title level="title24" className="font-semibold text-black">My Wish list</Title>
      <Title level="title16" className="text-[#4E657F] max-w-[500px] mt-2 mb-10">Keep an eye on the items you’re interested in. Your Watchlist lets you track live auctions without placing a bid — yet.</Title>

      <div>
        <MyWishListCard bookmark={bookmark} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default WishList