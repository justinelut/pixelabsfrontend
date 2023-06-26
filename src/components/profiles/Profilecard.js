"use client"

import React from 'react'
//import useSWR from 'swr'
import { useQuery } from '@apollo/client'
import { profiles } from '@/components/graphql/query'
import Link from 'next/link'
import Image from 'next/image'

export default function Profilecardrofilecard() {
    const { loading, data } = useQuery(profiles,
        {
            context: {
                fetchOptions: {
                    next: { revalidate: 0 },
                },
            }
        },)


    return (
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">

            {
                loading ? (
                    <div> Loading </div>
                )
                    :
                    (
                        data && data.Portfolios.docs.map(portfolio => (
                            <div className="flex w-full items-center justify-center py-28">
                                <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white">
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                                        <div className="grid-cols-1 lg:col-span-3">
                                            <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full bg-blue-100 p-4">
                                                <Image src={portfolio.myaccount.profilephoto.sizes.profile.url}
                                                    alt={portfolio.myaccount.profilephoto.alt}
                                                    width={portfolio.myaccount.profilephoto.sizes.profile.width}
                                                    height={portfolio.myaccount.profilephoto.sizes.profile.height}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-1 lg:col-span-9">
                                            <div className="text-center lg:text-left">
                                                <h2 className="text-2xl font-bold text-zinc-700">{portfolio.myname}</h2>
                                                <p className="mt-2 font-semibold text-zinc-700">@{portfolio.slug}</p>
                                                <p className="mt-4 text-zinc-500">{portfolio.headline}</p>
                                            </div>

                                            <div className="mt-6 grid grid-cols-2 gap-4">
                                                <Link href={`/portfolio/${portfolio.slug}`} className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">Follow</Link>

                                                <Link href={`/portfolio/${portfolio.slug}`} className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">View Profile</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                        )

                    )
            }

        </div>
    )
}
