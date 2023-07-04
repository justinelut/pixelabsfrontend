import FormatDay from '@/utilities/DateFormatter'
import Image from 'next/image'
import Share from '@/components/Blog/share'
import { imageurl } from '@/app/getImageUrls'

export default function Post({ post }) {
    return (
        <div className="w-full bg-white pt-24">
            <article className="max-w-2xl px-6 py-24 mx-auto space-y-12 dark:bg-beige-800">
                <Share url={`${process.env.NEXT_PUBLIC_URL}/blog/${post?.slug}`} title={post?.title} />
                <div className="w-full mx-auto space-y-4 text-left">
                    <h1 className="text-3xl font-bold leading-tight md:text-3xl">{post?.title}</h1>
                </div>
                <div className="w-full mx-auto space-y-4 text-center">
                    <Image src={`${imageurl(post?.collectionId, post?.id, post?.image)}?thumb=800x300`} alt={post?.title} width={800} height={300} />
                    <div className="flex items-center justify-between text-base font-medium mb-4">
                        <div className="flex items-center">
                            <span className="mr-2">by</span>
                            <a rel="noopener noreferrer" href="#" target="_blank" className="underline dark:text-violet-400">
                                <span itemprop="name">{post?.expand?.author?.name}</span>
                            </a>
                        </div>
                        <time datetime={FormatDay(post?.updated)} className="text-gray-500 dark:text-gray-400 text-base font-medium">{FormatDay(post?.updated)}</time>
                    </div>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: post?.content }} />
                </div>
                <div className="border-2 border-slate-800 p-4 rounded-sm border-t dark:border-gray-700">
                    <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                        <img src={`${imageurl(post?.expand?.author?.collectionId, post?.expand?.author?.id, post?.expand?.author?.avatar)}?thumb=800x300`} alt="" className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700" />
                        <div className="flex flex-col">
                            <h4 className="text-lg font-semibold">{post?.expand?.author?.name}</h4>
                            <p className="dark:text-gray-400">{post?.expand?.author?.aboutMe}</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}

