"use client"
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import HashLoader from "react-spinners/HashLoader";
import React from 'react'


export const BeatLoading = ({settings}) => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#36d7b7");

    return (
        
        <BarLoader
                color={color}
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
     
    );
}
export const HashLoading = ({settings}) => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#36d7b7");

    return (   
        <div className="flex py-10 flex-col bg-white">
            <div className="flex items-center justify-center flex-1">
                <div className="max-w-xl px-4 py-4 mx-auto text-center">
                    <div
                        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] flex items-center justify-center"
                        >Loading...</span
                        >
                    </div>
                </div>
            </div>
        </div>
       
    );
}




