"use client"
import React from 'react'
import '@/components/profiles/Constants'
import { AppText } from '@/components/profiles/Constants'
import '@/components/profiles/assets'
import { homeImage } from '@/components/profiles/assets'
import '@/components/profiles/components/Home.css'
import Typewriter from 'typewriter-effect';
import Image from 'next/image'
import Link from 'next/link'
import DownloadButton from '@/components/profiles/components/FileDownload';


const Home = ({ featured, iam, resume }) => {
  return (

    <div className='flex p-[20px] md:px-20 justify-between flex-col md:flex-row'>
      <div className='flex w-full flex-row  justify-end'>
        <div className='flex w-full flex-col  items-start content-end'>
          <h1 className='text-[35px] md:text-[40px] font-bold '>{AppText.hello}</h1>
          <div className='flex'>
            <h1 className='text-[35px]  md:text-[40px] font-bold mr-3'>{AppText.Iam}</h1>
            <Typewriter
              options={{
                strings: iam && iam.map(item => item.Skills),
                autoStart: true,
                loop: true,
              }}
              className="text-lg md:text-2xl"
            />
          </div>
          <div className="mt-4 py-6 sm:py-6">
          <DownloadButton pdfUrl={resume && resume.url} fileName="resume.pdf" text="Download Resume" className="my-[20px]" />
          </div>
        </div>
      </div>
      <div className=' w-full flex justify-center'>
        <Image src={featured && featured.sizes.card.url} width={featured.sizes.card.width} height={featured.sizes.card.height} className="w-full md:w-[300px]" />
      </div>
      <div className="my-10">
        {/* contents below */}
      </div>
    </div>


  )
}

export default Home