import React from 'react'
import Title from '../common/Title'
import CurrentBidProduct from './CurrentBidProduct'

const CurrentBids = () => {
  return (
    <div>
      <Title level="title24" className="font-semibold">Your Current Bids</Title>
      <Title level="title16" className="text-[#4E657F] max-w-[500px] mt-2">View all the bids you’ve placed and track their status in real-time. Stay updated and manage your active offers with ease.</Title>

      <div>
        <CurrentBidProduct />
      </div>
    </div>
  )
}

export default CurrentBids
