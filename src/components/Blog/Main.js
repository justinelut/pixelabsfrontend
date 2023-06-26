"use client"
import Image from 'next/image'
import Link from 'next/link'
import FormatDay from '@/utilities/DateFormatter'
import { ComponentsAnimations } from '@/components/'



export default function Blog(blogs) {
    return (
        <section className="pt-24 md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
            {blogs && console.log(blogs)}
            <div className="py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">

                    <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                        <>
                            {blogs && blogs.blogs.map(blog => (
                                <ComponentsAnimations>
                                    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded">
                                        <Link href={"/blog/" + blog.slug} aria-label="Article">

                                            <Image
                                                src={`https://api.verixr.com/api/files/Blog/${blog.id}/${blog.image}?thumb=640x480`}
                                                className="object-cover w-full h-64 rounded"
                                                alt={blog.title}
                                                width={640}
                                                height={480}
                                            />
                                        </Link>
                                        <div className="py-5 p-5">
                                            <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                                                {FormatDay(blog.updated)}
                                            </p>
                                            <Link
                                                href={"/blog/" + blog.slug}
                                                aria-label="Article"
                                                className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                                            >
                                                <p className="text-2xl font-bold">{blog.title.slice(0, 50)} ...</p>
                                            </Link>
                                            <p className="mb-4 text-gray-700">
                                                {blog.featured_text.slice(0, 50)} ...
                                            </p>
                                        </div>
                                    </div>
                                </ ComponentsAnimations>
                            ))}
                        </>

                    </div>
              
            </div>
        </section>
    );
};