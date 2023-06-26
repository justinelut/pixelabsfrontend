"use client"
import Image from 'next/image';
import { useStore } from "@/store/store";

const FeaturesSection = () => {
    const { home } = useStore()
    return (
        <section className="sectionSize bg-secondary">
            <div>
                <h2 className="secondaryTitle bg-underline3 bg-100%">Features</h2>
            </div>
            <div className="md:grid md:grid-cols-2 md:grid-rows-2">

                {home && home.Homes.docs[0].features.map((feature, key)=>(
                    <div className="flex items-start font-montserrat my-6 mr-10">
                        <Image src='/image/logos/Heart.svg' alt='' width={28} height={28} className="h-7 mr-4" />
                        <div>
                            <h3 className="font-semibold text-2xl">{feature.title} #{key+1}</h3>
                            <p>
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
        
            </div>
        </section>
    );
};

export default FeaturesSection;