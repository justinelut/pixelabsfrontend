"use client"

import { useState } from 'react';
import { currency } from '@/utilities/Currency'
import Link from 'next/link'

export default function Plans({ plans, slug, saletype, pid, saleroute }) {

    const [selectedPlan, setSelectedPlan] = useState(plans[0]);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    return (
        <div>
            <div className="flex justify-center">
                {plans && plans.map((plan) => (
                    <button
                        key={plan.name}
                        className={`${plan.name === selectedPlan.name
                            ? 'bg-orange-200 text-white'
                            : 'bg-gray-200 text-gray-700'
                            } mx-2 px-4 py-2 rounded`}
                        onClick={() => handlePlanSelect(plan)}
                    >
                        {plan.name}
                    </button>
                ))}
            </div>




            <div className="mb-6">
                <div className="flex items-center justify-between pb-6 mb-6 border-b">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <p className="font-bold text-2xl mt-4 uppercase">
                                {currency.format(selectedPlan.price)}
                            </p>
                            <p className="text-5xl font-extrabold">{selectedPlan.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-blue-gray-50">
                        <svg
                            className="w-10 h-10 text-gray-600"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLidth="2"
                        >
                            <path
                                d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                                fill="none"
                                stroke="currentColor"
                            />
                            <path
                                d="M15,23H9v-5H7v-6 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                                fill="none"
                                stroke="currentColor"
                            />
                        </svg>
                    </div>
                </div>


                <div>
                    <p className="mb-2 font-bold tracking-wide">Features</p>
                    <ul className="space-y-2">
                        {selectedPlan.details.map(detail => (
                            <li className="flex items-center">
                                <div className="mr-2">
                                    <svg
                                        className="w-4 h-4 text-deep-purple-accent-400"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLidth="2"
                                    >
                                        <polyline
                                            fill="none"
                                            stroke="currentColor"
                                            points="6,12 10,16 18,8"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            fill="none"
                                            r="11"
                                            stroke="currentColor"
                                        />
                                    </svg>
                                </div>
                                <p className="font-medium text-gray-800">
                                    {detail.Details}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                
                <Link
                    href={slug && `/checkout/?p=${selectedPlan.type}&s=${slug}&cat=${saletype}&srt=${saleroute}&id=${pid}&plidx=${selectedPlan.id}`}
                    className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
                >
                    Buy
                </Link>
            </div>
        </div>
    );
};


