import Product from '@/components/products/product'
import React from 'react'
import { fetcher } from '@/components/api/fetchdata'
import { currency } from '@/utilities/Currency'



export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
    const data = await fetcher(`/api/sellTemplate?slug=${params.slug}`)
    const templates = data && data.data.docs[0]

    if (templates) {
        return {
            title: templates.name + " || " + currency.format(templates.plans[0].price),
            description: templates.description,
            openGraph: {
                title: templates.name + " || " + currency.format(templates.plans[0].price),
                description: templates.description,
                images: templates.image.url
            },
        }
    }
}


async function Page({params}) {
    const data = await fetcher(`/api/sellTemplate?slug=${params.slug}`)
   
    return (
        <Product data={data.data} slug={params.slug}/>
    )
}

export default Page