import { HashLoading, Main } from '@/components'
import { pb } from '@/utilities/pocketbase';
import { Suspense } from 'react'
export const metadata = {
    title: 'Verixr - Blog',
    description: 'Stay updated with our informative and inspiring blog posts covering a wide range of topics related to creativity, innovation, and industry insights.',
    openGraph: {
        title: 'Verixr - Blog',
        description: 'Stay updated with our informative and inspiring blog posts covering a wide range of topics related to creativity, innovation, and industry insights.',
    },
};
export default async function Blog() {

    const blogs = await pb.collection('Blog').getFullList({
        sort: '-created',
    });

    return (
        <Suspense fallback={HashLoading}>
            <Main blogs={blogs} />
        </Suspense>
    )
}