"use client"
import {useState} from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { FaMobileAlt, } from 'react-icons/fa'
import Error from '@/components/alerts/error'
import Success from '@/components/alerts/success'

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [resError, setResError] = useState()
    const [success, setSuccess] = useState()    

    const onSubmit = async (data, e) => {
        e.preventDefault()
        const results = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+"/api/account", {
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            password: data.password,
        }).catch((error) => {
            if (error.response) {
                setResError(error.response.data);
            } else if (error.request) {
                setResError(error.request);
            } else {
                setResError('Error', error.message);
            }
        })
       
        if(results.data.message){
            setSuccess(results.data.message)
            setTimeout(()=>{
                window.location.reload();
            },3000)
        }
       
       
    };



    return (

        <form className="max-w-xl px-4 py-28 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24 bg-secondary" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1 sm:mb-2 ">
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
                {errors.firstname?.type === 'required' && <p className='text-red-700' role="alert">Firstname is required</p>}
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
                {errors.lastname?.type === 'required' && <p className='text-red-700' role="alert">Lastname is required</p>}
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
                    htmlFor="email"
                    className="inline-block mb-1 font-medium"
                >
                    Password
                </label>
                <input
                    placeholder="password"
                    type="password"
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    {...register("password", { required: true })}
                />
                {errors.password?.type === 'required' && <p className='text-red-700' role="alert">Password is required</p>}
            </div>
            <div className="mt-4 mb-2 sm:mb-4">
                {resError && <Error message={resError.errors[0].data[0].message} />}
                {success && <Success message={success} />}
                <button type="submit" className="bg-white inline-flex justify-center text-green-500 w-full h-12 px-4 py-2 border border-green-500 rounded-none">
                    Signup
                    <FaMobileAlt className="mr-2 mt-2" />
                </button>
            </div>


            <p className="text-xs text-gray-600 sm:text-sm">
                We respect your privacy. Unsubscribe at any time.
            </p>
        </form>

    )
}