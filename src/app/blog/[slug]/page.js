import { imageurl } from '@/app/getImageUrls';
import { PostDetail } from '@/components'
import { pb } from '@/utilities/pocketbase'

export async function generateMetadata({ params }) {
    const data = await pb.collection('Blog').getList(1, 50, {
        '$autoCancel': false,
        filter: `slug = "${params.slug}"`,
        sort: '-created',
        expand: 'author',
    });
    const post = data && data.items[0]

    if (post) {
        return {
            title: post.title,
            description: post.featured_text,
            openGraph: {
                title: post.title,
                description: post.featured_text,
                images: `${imageurl(post?.collectionId, post?.id, post?.image)}?thumb=800x300`,
                twitter: {
                    title: post.title,
                    description: post.featured_text,
                    images: `${imageurl(post?.collectionId, post?.id, post?.image)}?thumb=800x300`,
                }
            },
        }
    }

}


export const revalidate = 0

export default async function Post({ params }) {
    const data = await pb.collection('Blog').getList(1, 50, {
        '$autoCancel': false,
        filter: `slug = "${params.slug}"`,
        sort: '-created',
        expand: 'author',
    });


    return (
        <PostDetail post={data.items[0]} />
    )
}