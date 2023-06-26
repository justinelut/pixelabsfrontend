"use client"
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useState } from 'react';
import Error from '@/components/auth/error'
import Thankyou from '@/components/contact/Thankyou'


export default function Contact() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [resError, setResError] = useState()
    const [success, setSuccess] = useState()
    const onSubmit = async (data, e) => {
        e.preventDefault()
        const results = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/api/contact", {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            message: data.message

        }).catch((error) => {
            if (error.response) {
                setResError(error.response.data);
            } else if (error.request) {
                setResError(error.request);
            } else {
                setResError('Error', error.message);
            }
        })
        if (results.data.message) {
            setSuccess(results.data.message)
            setTimeout(() => {
                window.location.reload();
            }, 60000)
        }
    }



    return (
        <div className="relative">
            <img
                src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                className="absolute inset-0 object-cover w-full h-full"
                alt=""
            />
            <div className="relative bg-opacity-75 bg-deep-purple-accent-700">
                <svg
                    className="absolute inset-x-0 bottom-0 text-white"
                    viewBox="0 0 1160 163"
                >
                    <path
                        fill="currentColor"
                        d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
                    />
                </svg>
                <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between xl:flex-row">
                        <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12 pt-10">
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                                Send us a message <br className="hidden md:block" />

                            </h2>
                            <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                                We believe that clear communication is key to building strong relationships with our clients.
                               </p>
                        </div>


                        {
                            success && success ? (<><Thankyou message={success} /></>) : (
                                <div className="w-full max-w-xl xl:px-8 xl:w-5/12 py-10">
                                    <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                                        <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                            Contact us
                                        </h3>
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="mb-1 sm:mb-2">
                                                <label
                                                    htmlFor="firstName"
                                                    className="inline-block mb-1 font-medium"
                                                >
                                                    First name
                                                </label>
                                                <input
                                                    placeholder="John"
                                                    type="text"
                                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                                    id="firstname"
                                                    name="firstname"
                                                    {...register("firstname", { required: true })}
                                                />

                                                {errors.firstname?.type === 'required' && <p className='text-red-700' role="alert">First Name is required</p>}

                                            </div>
                                            <div className="mb-1 sm:mb-2">
                                                <label
                                                    htmlFor="lastName"
                                                    className="inline-block mb-1 font-medium"
                                                >
                                                    Last name
                                                </label>
                                                <input
                                                    placeholder="Doe"
                                                    type="text"
                                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                                    id="lastname"
                                                    name="lastname"
                                                    {...register("lastname", { required: true })}
                                                />

                                                {errors.lastname?.type === 'required' && <p className='text-red-700' role="alert">Last Name is required</p>}

                                            </div>
                                            <div className="mb-1 sm:mb-2">
                                                <label
                                                    htmlFor="email"
                                                    className="inline-block mb-1 font-medium"
                                                >
                                                    E-mail
                                                </label>
                                                <input
                                                    placeholder="john.doe@example.org"
                                                    type="text"
                                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                                    id="email"
                                                    name="email"
                                                    {...register("email", { required: true })}

                                                />

                                                {errors.email?.type === 'required' && <p className='text-red-700' role="alert">Email is required</p>}

                                            </div>
                                            <div className="mb-1 sm:mb-2">
                                                <label
                                                    htmlFor="message"
                                                    className="inline-block mb-1 font-medium"
                                                >
                                                    Your message here
                                                </label>
                                                <input
                                                    placeholder="My payment failed, what should i do?"
                                                    rows="5"
                                                    type="textarea"
                                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                                    id="message"
                                                    name="message"
                                                    {...register("message", { required: true })}
                                                />

                                                {errors.message?.type === 'required' && <p className='text-red-700' role="alert">Message is required</p>}

                                            </div>
                                            <div className="mt-4 mb-2 sm:mb-4">
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                                >
                                                    Send message
                                                </button>
                                            </div>
                                            {resError && console.log(resError)}
                                            {resError && resError.errors.map(err => (<Error message={err.message} />))}
                                        </form>

                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};