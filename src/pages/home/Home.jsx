import Banner from '@/components/home_components/Banner'
import BigDeal from '@/components/home_components/BigDeal'
import Categories from '@/components/home_components/Categories'
import LiveAuctions from '@/components/home_components/LiveAuctions'
import PopularMakes from '@/components/home_components/PopularMakes'
import TrendingOn from '@/components/home_components/TrendingOn'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Categories />
      <Banner />
      <TrendingOn />
      <LiveAuctions />
      <PopularMakes />
      <BigDeal />
    </div>
  )
}

export default Home