"use client"
import React from 'react'

export default function Notfounderr({title, message}) {

    return (
        <div className="flex py-10 flex-col bg-white">
            <div className="flex items-center justify-center flex-1">
                <div className="max-w-xl px-4 py-4 mx-auto text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                       {title && title}
                    </h1>

                    <p className="mt-4 text-gray-500">
                        {message && message}
                    </p>

                </div>
            </div>
        </div>

    )
}