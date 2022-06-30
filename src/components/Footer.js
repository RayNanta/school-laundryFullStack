import React from 'react'
import gitHub from '../images/githubFooter.svg'
import insta from '../images/instagramFooter.svg'
import twitt from '../images/twitterFooter.svg'
import youtube from '../images/youtubeFooter.svg'

const Footer = () => {
  return (
    <div>
        <div className='mt-20 bg-black text-white font-sourceSans text-lg'>
            <div className='mx-20 flex justify-between'>
                <div className='mt-16 mr-10'>
                    <h1 className='font-bold'>About Us</h1>
                    <p className='mt-5 max-w-md'>LaundryMu adalah startup yang kini bergerak dalam bidang penyedia jasa laundry dan clothes cleaning. Cabang kami tersebar mulai dari Jawa Timur hingga Jakarta.</p>
                </div>
                <div className='mt-16'>
                    <h1 className='font-bold'>Social Media</h1>
                    <p className='mt-5 hover:text-blue duration-300'>Twitter</p>
                    <p className='mt-3 hover:text-blue duration-300'>Instagram</p>
                    <p className='mt-3 hover:text-blue duration-300'>TikTok</p>
                </div>
                <div className='mt-16 ml-20'>
                    <h1 className='font-bold'>Our Partner</h1>
                    <p className='mt-5 hover:text-blue duration-300'>CafeMu.id</p>
                    <p className='mt-3 hover:text-blue duration-300'>KosanMu.id</p>
                    <p className='mt-3 hover:text-blue duration-300'>ProjectMu.id</p>
                </div>
                <div className='mt-16 ml-20'>
                    <h1 className='font-bold'>Developers</h1>
                    <p className='mt-5 hover:text-blue duration-300'>UI/UX Designer</p>
                    <p className='mt-3 hover:text-blue duration-300'>BackEnd</p>
                    <p className='mt-3 hover:text-blue duration-300'>FrontEnd</p>
                </div>
            </div>
            <div className='pb-10 mx-20'>
                <div className='flex mt-14 mb-10'>
                    <img className='w-6 mr-7' src={gitHub} alt="" />
                    <img className='w-6 mr-7' src={insta} alt="" />
                    <img className='w-6 mr-7' src={twitt} alt="" />
                    <img className='w-9 mr-7' src={youtube} alt="" />
                    <p className='ml-auto'>©Copyright 2022 by Ray</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer