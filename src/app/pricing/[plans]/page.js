import React from 'react'
import { Plans } from '@/components'
import { useStore } from '@/store/store'
import StoreInitializer from '@/store/Storeinitializer'
import { SingleService } from '@/components/graphql/query'
import { serverClient } from '@/components'
import { currency } from '@/utilities/Currency'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
    const { data } = await serverClient.query({
        query: SingleService,
        fetchPolicy: 'network-only',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
        variables: { slug: params.plans }
    })

    const services = data && data.Services.docs[0]

    if (services) {
        return {
            title: services.name + " || " + currency.format(services.plans[0].price),
            description: services.description,
            openGraph: {
                title: services.name + " || " + currency.format(services.plans[0].price),
                description: services.description,
                images: services.image.url
            },
        }
    }
}


export default async function Singleservice({ params }) {
    const { data } = await serverClient.query({
        query: SingleService,
        fetchPolicy: 'network-only',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
        variables: { slug: params.plans }
    })


    useStore.setState({ SingleService: data })


    return (
        <>
            <StoreInitializer SingleService={data} />
            <Plans />
        </>
    )
}
