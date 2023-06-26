"use client"
import { Basic } from '@/components/services/plans'
import { useStore } from "@/store/store";
import Image from 'next/image'
import Share from '@/components/Blog/share';

export default function Plans() {
    const { SingleService } = useStore()

    return (
        <section className="pt-24 md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
            
            
            {SingleService && SingleService.Services.docs.map(service => (
                <div className="py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col justify-between lg:flex-row">
                        <div className="mb-12 lg:max-w-lg lg:pr-5 lg:mb-0">
                            <div className="max-w-xl mb-6">
                                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                                    {service.name}
                                </h2>
                                <p className="text-base text-gray-700 md:text-lg">
                                    {service.description}
                                </p>
                            </div>
                            <hr className="mb-6 border-gray-300" />
                            <div className="flex">
                                <div className="flex flex-col">
                                    <div className="text-sm font-semibold mb-4">
                                        <Image src={service.image.url} alt={service.image.url} width={500} height={100} />
                                      
                                    </div>
                                    <Share url={`${process.env.NEXT_PUBLIC_URL}/pricing/${service.slug}`} title={service.name} />
                                </div>
                            </div>
                        </div>
                        <div className="px-5 pt-6 pb-5 text-center border border-gray-300 rounded lg:w-2/5">
                            <div className="mb-5 font-semibold">Choose A Plan</div>
                        
                            <Basic plans={service.plans} slug={service.slug} pid={service.id} saletype={service.type} saleroute={service.route}/>

                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};