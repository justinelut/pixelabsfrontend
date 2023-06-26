"use client"
import React from 'react'
import '@/components/profiles/assets'
import { skill } from '@/components/profiles/assets'
import '@/components/profiles/Constants'
import { AppText, skillsList, workDetail } from '@/components/profiles/Constants'
import Image from 'next/image'
import { FormatDayOnly } from '@/utilities/DateFormatter'

const Skills = (params) => {
  return (
    <div className='mt-10' id="skills">
      <div className='flex flex-row justify-center items-center'>
        {/* <Image src={skill} className="w-[70px] hover:animate-bounce " /> */}
        <h1 className='text-[40px] font-bold'>{AppText.Skills}<span className='text-purple-600'>{AppText.Experties}</span></h1>
      </div>
      <div className='flex flex-col md:flex-row  justify-evenly px-8 md:px-0 mt-8 '>
        <div className='grid grid-cols-4 md:grid-cols-4 gap-8  items-center'>
          {params && params.skills.map((icon, index) => (
            <>
              <div key={index} className='w-[60px] transition ease-in-out delay-100 hover:scale-125 bg-purple-50
                 p-3 rounded-full' >
                <Image src={icon.myskillimage.sizes.faviconx64.url} width={icon.myskillimage.sizes.faviconx64.width} height={icon.myskillimage.sizes.faviconx64.height} />
              </div>
            </>
          ))}
        </div>
        <div className='flex mt-5 flex-col justify-end  md:mt-0 lg:mt-0'>
          {params && params.skills.map((item, index) => (
            <div key={index} className='flex flex-row mb-6'>
              <div className='mr-10 font-bold'>
                <h2>{FormatDayOnly(item.date)}</h2>
              </div>
              <div>
                <h3 className='font-bold w-full'>{item.myskilltitle}</h3>
                <h3 className='font-thin text-[15px] text-gray-400'>{item.myskilldesc}</h3>

              </div>
            </div>

          ))}

        </div>
      </div>
    </div>
  )
}

export default Skills