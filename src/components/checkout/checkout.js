"use client"

import React from 'react'
import Paypal from '@/components/checkout/paypal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr'
import { fetcher } from '@/components/api/fetchdata'
import {formatCurrency}from '@/utilities/Currency';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function Checkout() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession()
    const pathname = usePathname();
    const plantype = searchParams.get('p')
    const productslug = searchParams.get('s')
    const productapiroute = searchParams.get('srt')
    const salestype = searchParams.get('cat')
    const pid = searchParams.get('id')
    const plidx = searchParams.get('plidx')
    const callbackUrl = `${process.env.NEXT_PUBLIC_URL}${pathname}?p=${plantype}&s=${productslug}&cat=${salestype}&srt=${productapiroute}&id=${pid}&plidx=${plidx}`

    if (status === 'unauthenticated') {
        router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl.replace(/\s/g, ''))}`)
        return null
    }


    if (plantype === null || productslug === null || salestype === null || pid === null || productapiroute === null || plidx === null) {
        router.push('/')
        return null
    }

    const { isLoading, data } = useSWR(`/api/${productapiroute && productapiroute}/${pid}`, fetcher)



    return (
        <>
            <section className="pt-24 pb-10 md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
                <div class="flex flex-col items-center border-b bg-secondary py-4 sm:flex-row sm:px-2">
                    <span class="text-2xl font-bold text-gray-800 mx-auto">Complete checkout</span>
                </div>
                <div class="grid lg:grid-cols-2 lg:px-16 xl:px-26">
                    <div class="pt-8">
                        <p class="text-xl font-medium">Order Summary</p>
                        <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
                        <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 ">
                            {
                                isLoading ? (<></>) : (
                                   
                                        <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                                        <Image class="h-full w-full md:w-40 lg:w-40 xl:w-40 lg:h-full xl:h-full md:h-full rounded-md border object-cover object-center" src={data && data.data.image.url} width={data && data.data.image.width} height={data && data.data.image.height} alt={data && data.data.image.alt} />
                                            <div class="flex w-full flex-col p-2">
                                            <span class="text-2xl font-bold">{data && data.data.name}</span>
                                            <p class="text-2xl font-bold">{data && formatCurrency(data.data.plans.find(plan => plan.type.replace(/\s+/g, "-").toLowerCase() === plantype.replace(/\s+/g, "-").toLowerCase()).price , 'en-US')}</p>
                                            </div>
                                        </div>
                        
                                )
                            }
                        </div>

                        <p class="mt-8 text-lg font-medium">Payment Methods</p>
                        <form class="mt-5 grid gap-6">
                            <div class="relative">
                                <input class="peer hidden" id="radio_2" type="radio" name="radio" checked />
                                <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                                    <img class="w-14 object-contain" src="/assets/paypal.png" alt="" />
                                    <div class="ml-5">
                                        <span class="mt-2 font-semibold">Paypal</span>
                                        <p class="text-slate-500 text-sm leading-6">Quick Checkout with Paypal</p>
                                    </div>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                        <p class="text-xl font-medium">Payment Details</p>
                        <p class="text-gray-400">Complete your order by providing your payment details.</p>
                        <div class="">
                            <div class="mt-6 border-t border-b py-2">
                                <div class="flex items-center justify-between">
                                    <p class="text-sm font-medium text-gray-900">Subtotal</p>
                                    <p class="font-semibold text-gray-900">{data && formatCurrency(data.data.plans.find(plan => plan.type.replace(/\s+/g, "-").toLowerCase() === plantype.replace(/\s+/g, "-").toLowerCase()).price, 'en-US')}</p>
                                </div>
                            </div>
                            <div class="mt-6 flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-900">Total</p>
                                <p class="text-2xl font-semibold text-gray-900">{data && formatCurrency(data.data.plans.find(plan => plan.type.replace(/\s+/g, "-").toLowerCase() === plantype.replace(/\s+/g, "-").toLowerCase()).price, 'en-US')}</p>
                            </div>
                        </div>
                        <div className="relative border-slate-800">
                        <Paypal planid={plidx && plidx} productname={data && data.data.name} salestype={salestype} productapiroute={productapiroute && productapiroute} plantype={plantype && plantype} productid={pid && pid} amount={data && data.data.plans.find(plan => plan.type.replace(/\s+/g, "-").toLowerCase() === plantype.replace(/\s+/g, "-").toLowerCase()).price} />
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Checkout