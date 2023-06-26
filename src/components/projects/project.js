"use client"
import useSWR from 'swr'
import { fetcher } from "@/components/api/fetchdata";
import Image from "next/image";

export default function Projects(){
    const { isLoading, data } = useSWR(`/api/projects`, fetcher)
    return (
        <div className="px-4 py-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24">
            <div className="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
                <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:mb-6 group">
                    <span className="inline-block mb-1 sm:mb-4">
                        Explore
                        <br className="hidden md:block" />
                        Our projects.
                    </span>
                    <div className="h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-30 group-hover:scale-x-100" />
                </h2>
                
            </div>
            <div className="py-8 grid gap-6 row-gap-6 mb-8 lg:grid-cols-3 sm:row-gap-6 sm:grid-cols-2">
               
                {data && data.data.docs.map(project=>(
                    <a href={project.url}>
                        <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
                            <div className="card w-full bg-base-100 shadow-xl image-full">
                                <figure><Image src={project.image.sizes.card.url} width={project.image.sizes.card.width} height={project.image.sizes.card.height} alt={project.image.alt} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{project.title}</h2>
                                    <p>{project.description}</p>
                                    <div className="card-actions justify-end">
                                        <a href={project.url} className="btn btn-primary">Check it out</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}        
            </div>
            {/* <div className="text-center">
                <a
                    href="/"
                    aria-label=""
                    className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                    Loadmore
                    <svg
                        className="inline-block w-3 ml-2"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                    >
                        <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                    </svg>
                </a>
            </div> */}
        </div>
    );
};