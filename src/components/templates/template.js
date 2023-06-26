"use client"
import Image from 'next/image'
import Link from 'next/link'
import { currency } from '@/utilities/Currency'
import useSWR from 'swr'
import { fetcher } from '@/components/api/fetchdata'
import { HashLoading } from '@/components/Loader'
import { featuredAnimations, NoSearchResults } from '@/components/'
import qs from 'qs'
import { useState } from 'react'

export default function Templates() {
    const [search, setSearch] = useState('')
   

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    const query = {
        name: {
            like: search
        }
    }

    const stringifiedQuery = qs.stringify({
        where: query,
        limit: 100,
    }, { addQueryPrefix: true })

    const { isLoading, data } = useSWR(`/api/sellTemplate${search ? stringifiedQuery : ''}`, fetcher)



    return (
        <section className="pt-24 md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
            <div className="py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                <div className="hero-headline flex flex-col items-center justify-center text-center">
                    <h1 className=" font-bold text-3xl text-gray-900 mb-3">Stunning web templates for your next projects</h1>
                    <p className=" font-base text-base text-gray-600">Best designed templates for Tailwind, React, Nextjs, Svelte & Vue.</p>
                </div>

                <div className="relative mt-4 mb-4 flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search by name, price, description ..."
                        onChange={handleSearch}
                        value={search}
                    />
                </div>

             
                {
                    data && data.data.docs.length == 0 ? (
                        <NoSearchResults />
                    )
                        :
                        (
                            <>
                                {isLoading ? (
                                    <>
                                        <HashLoading />
                                    </>
                                ) :
                                    <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">

                                        {data && data != undefined && data.data.docs.map((template, index) => (

                                            <div variants={featuredAnimations} transition={{ duration: 1, delay: index === 0 ? 0 : index * 0.2 }}>
                                                <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md">
                                                    <Link href={`/products/`+template.slug}>
                                                        <Image
                                                            src={template.image.sizes.card.url}
                                                            className="object-cover w-full h-64"
                                                            width={template.image.sizes.card.width}
                                                            height={template.image.sizes.card.height}
                                                            alt=""
                                                        /></Link>
                                                    <span className="absolute top-0 left-0 w-28 -translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                                                    <div className="mt-4 px-5 pb-5">
                                                        <Link href={`/products/` +template.slug}>
                                                            <h5 className="text-xl font-semibold tracking-tight text-gray-900"> {template.name}</h5>
                                                        </Link>

                                                        <div className="flex items-center justify-between mt-2">
                                                            <Link href={template.previewlink} className="flex items-center rounded-md bg-orange-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                                </svg>
                                                                Preview
                                                            </Link>
                                                            <Link href={`/products/${template.slug}`} className="flex items-center rounded-md bg-white border border-green-400 px-5 py-2.5 text-center text-sm font-medium text-slate-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                                </svg>
                                                                Details
                                                            </Link>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-2">
                                                            <p>
                                                                <span className="text-3xl font-bold text-gray-900"> {currency.format(template.plans[0].price)}</span>
                                                                {/* <span className="text-sm text-gray-900 line-through ml-2">$299</span> */}
                                                            </p>
                                                            <Link href={`/products/${template.slug}#pricing`} className="flex items-center rounded-md bg-gray-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                                </svg>
                                                                Pricing
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div >


                                        ))}
                                    </div>
                                }
                            </>
                        )
                }


            </div>
        </section>

    );
};