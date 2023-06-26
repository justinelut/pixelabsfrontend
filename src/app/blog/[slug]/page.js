import { PostDetail, serverClient } from '@/components'
import { blogPost } from '@/components/graphql/query'
import { pb } from '@/utilities/pocketbase'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
    const { data } = await serverClient.query({
        query: blogPost,
        fetchPolicy: 'network-only',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
        variables: { slug: params.slug }
    })
    const post = data && data.Blogs.docs[0]

    if (post) {
        return {
            title: post.title,
            description: post.featured,
            openGraph: {
                title: post.title,
                description: post.featured,
                images: post.image.sizes.feature.url,
                twitter: {
                    title: post.title,
                    description: post.featured,
                    images: post.image.sizes.feature.url,
                }
            },
        }
    }

}



export default async function Post({ params }) {
    const { data } = await serverClient.query({
        query: blogPost,
        fetchPolicy: 'network-only',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
        variables: { slug: params.slug }
    })
    
    // const records = await pb.collection('Blog').getFullList({
    //     sort: '-created',
    // });

    // records && console.log(records)

    return (
        <PostDetail post={data} />
    )
}