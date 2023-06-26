"use client"
import { FaMobileAlt } from 'react-icons/fa'
import { useForm } from "react-hook-form";
import Error from '@/components/alerts/error'
import { useState } from 'react';
import { signIn, useSession } from "next-auth/react"
import { useSearchParams } from 'next/navigation';



export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [resError, setResError] = useState()
    const { data: session, status } = useSession()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl')

    const onSubmit = async (data, e) => {
        e.preventDefault()
        const results = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        })
        if (results.error !== null) {
            setResError(results);
        } else {
            if (!callbackUrl) {
                window.location.href = `/`
            } else {
                window.location.href = `${callbackUrl}`
            }

        }
    };



    if (status === 'authenticated' && callbackUrl) {
        window.location.href = `${callbackUrl}`
    }

    if (status === 'authenticated' && !callbackUrl) {
        window.location.href = `/`
        return null
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl px-4 py-28 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24 bg-secondary">
            <div className="mb-4 sm:mb-6 md:mb-8">
                <label htmlFor="email" className="inline-block mb-2 font-medium">
                    E-mail
                </label>
                <input
                    placeholder="john.doe@example.org"
                    type="text"
                    className="w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    {...register("email", { required: true })}
                />
                {errors.email?.type === 'required' && (
                    <p className='text-red-700' role="alert">
                        Email is required
                    </p>
                )}
            </div>

            <div className="mb-4 sm:mb-6 md:mb-8">
                <label htmlFor="password" className="inline-block mb-2 font-medium">
                    Password
                </label>
                <input
                    placeholder="password"
                    type="password"
                    className="w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    {...register("password", { required: true })}
                />
                {errors.password?.type === 'required' && (
                    <p className='text-red-700' role="alert">
                        Password is required
                    </p>
                )}
            </div>

            <div>
                {resError && <Error message={resError.error} />}
            </div>

            <div className="mb-6 sm:mb-8 md:mb-10">
                <button type="submit" className="bg-white inline-flex justify-center items-center text-green-500 w-full h-12 px-4 py-2 border border-green-500 rounded-none">
                    <span className="mr-2">Login</span>
                    <FaMobileAlt className="w-4 h-4" />
                </button>
            </div>

            <p className="text-xs text-gray-600 sm:text-sm">
                We respect your privacy. Unsubscribe at any time.
            </p>
        </form>


    )
}