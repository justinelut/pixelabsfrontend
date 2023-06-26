"use client"
import React, { useState } from 'react'
import { AppText, portfolio } from '@/components/profiles/Constants'
import SectionHeading from '@/components/profiles/Shared/SectionHeading';
import { robo } from '@/components/profiles/assets/index'
import Image from 'next/image'
import { featuredAnimations } from '@/components'
import { motion, AnimatePresence } from 'framer-motion'


const Portfolio = (params) => {
    const [portfolioList, setPortfolioList] = useState(params && params.myprojects);
    const filterPortfolio = (e) => {
        const result = params && params.myprojects.filter(item => item.myportfoliotype.toLowerCase() == e.target.value.toLowerCase());
        setPortfolioList(result)
    }


    return (
        <motion.div initial="initial" animate="animate" className='mt-5 flex justify-center flex-col'>
            <div className='flex flex-row px-6 md:px-0 items-center justify-center'>
                <SectionHeading firstTitle={AppText.Creative} secondTitle={AppText.Portfolio} />
                <Image src={robo} className="w-[70px] ml-5 animate-bounce" />
            </div>
            <div className='flex flex-row justify-evenly gap-2 px-4 md:px-72'>

                {
                    params && params.myprojects.map((type, index) => (
                        <button value={type.myportfoliotype} onClick={filterPortfolio} key={index} className='border-purple-600 border-2 
      text-purple-600 focus:text-white
      active:bg-purple-500 p-1 px-4 rounded-md
      focus:ring-violet-300 focus:bg-purple-600 focus:ring '>{type.myportfoliotype}</button>
                    ))
                }

            </div>
          <div className="py-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24">  
            <div className='py-10 grid gap-6 row-gap-6 mb-8 lg:grid-cols-3 sm:row-gap-6 sm:grid-cols-2'>
                {portfolioList && portfolioList.map((item, index) => (
                    // <AnimatePresence>
                    <a key={index} href={item.url}>
                        <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
                            <div className="card w-full bg-base-100 shadow-xl image-full">
                                <figure> <Image src={item.portfolioimage.sizes.card.url} width={item.portfolioimage.sizes.card.width} height={item.portfolioimage.sizes.card.height} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.portfoliotitle}</h2>
                                    <p>{item.portfoliodesc}</p>
                                    <div className="card-actions justify-end">
                                        <a href={item.url} className="btn btn-primary">Check it out</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            </div>
        </motion.div>

    )
}

export default Portfolio