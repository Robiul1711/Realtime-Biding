import React from 'react'
import Title from '../common/Title'
import banner2 from '../../assets/images/banner2.png'
const WelcomeTo = () => {
  return (
    <div className='section-padding-x py-14 flex flex-col items-center justify-center text-center'>
     <Title level="title64">Welcome to The Hobby Nexus</Title>
     <Title level="title16" className='mt-4 max-w-[780px]'>At The Hobby Nexus, we're more than just an auction site—we're a community built for hobbyists, collectors, and enthusiasts who are passionate about sports cards, TCGs (Trading Card Games), and unique collectibles.</Title>
     <Title level="title24" className='mt-4 '>We founded The Hobby Nexus with a simple goal: to empower sellers and buyers with a fair, transparent, and community-first platform. While other auction platforms charge up to 20%, 30%, or even 40% in fees, we've kept it simple and affordable—with just a $0.25 listing fee and a 6% auction closing fee. That means more of your hard-earned money stays in your pocket. Whether you're just starting your collection, a seasoned seller, or a passionate buyer, The Hobby Nexus is designed to support your journey.</Title>
        <img src={banner2} alt="Welcome Banner" className='w-full mt-12 rounded-lg shadow-lg' />
    </div>
  )
}

export default WelcomeTo
