import React from 'react'
import Title from '../common/Title'
import MyOwnBid from './MyOwnBid'

const MyAuction = () => {
  return (
    <div>
      <Title level="title24" className="font-semibold text-black">My Won Bids</Title>
      <Title level="title16" className="text-[#4E657F] max-w-[500px] mt-2 mb-10">Congratulations! 🎉 These are the items you've successfully won through bidding.</Title>

      <div>
        <MyOwnBid />
      </div>
    </div>
  )
}

export default MyAuction