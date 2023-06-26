//import NextDynamic  from 'next/dynamic'
import { Herosection, serverClient, Howitworks, Features, Faq, Featured, HashLoading } from '@/components'
import { useStore } from '@/store/store'
import StoreInitializer from '@/store/Storeinitializer'
import { services, home } from '@/components/graphql/query'
import { Suspense } from 'react'

export async function generateMetadata() {
    const data = await serverClient.query({
        query: home,
        fetchPolicy: 'network-only',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
    })

    const homepage = data && data.data.Homes.docs[0]

    if (homepage) {
        return {
            title: homepage.headline,
            description: homepage.subheadline,
            openGraph: {
                title: homepage.headline,
                description: homepage.subheadline,
                images: homepage.image.url
            },
        }
    }
}

export const dynamic = 'force-dynamic'

export default async function Home() {

    const { data } = await serverClient.query({
        query: services,
        fetchPolicy: 'network-only',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
    })

    const Homepage = await serverClient.query({
        query: home,
        fetchPolicy: 'network-only',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
    })

    useStore.setState({ services: data, home: Homepage.data })

    return (
        <>
            <StoreInitializer services={data} home={Homepage.data} />
            <Herosection />
            <Suspense fallback={HashLoading}>
                <Featured />
            </Suspense>
            <Suspense fallback={HashLoading}>
                <Howitworks />
            </Suspense>
            <Suspense fallback={HashLoading}>
                <Features />
            </Suspense>
            <Suspense fallback={HashLoading}>
                <Faq />
            </Suspense>
        </>
    )
}