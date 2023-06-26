"use client"
import React from 'react';
import { useStore } from '@/store/store';

const HowItWorks = () => {
    const { home } = useStore()
    return (

        <section className="bg-black text-white sectionSize">

            <div>
                <h2 className="secondaryTitle bg-underline2 bg-100%">How it works</h2>
            </div>
            <div className="flex flex-col md:flex-row">

                {home && home.Homes.docs[0].howitworks.map((how, index) => (
                    <div className="flex-1 mx-8 flex flex-col items-center my-4">
                        <div className="border-2 rounded-full bg-secondary text-black h-12 w-12 flex justify-center items-center mb-3">
                            {index+1}
                        </div>
                        <h3 className="font-montserrat font-medium text-xl mb-2">{how.title}</h3>
                        <p className="text-center font-montserrat">
                            {how.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
