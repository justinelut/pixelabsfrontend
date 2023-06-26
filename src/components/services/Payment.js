"use client"
import { useStore } from '@/store/store'
import axios from 'axios'
import { currency } from '@/utilities/Currency'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import ConfirmPayment from '@/components/services/confirmPayment'
import { AiOutlineArrowRight } from "react-icons/ai";
import { AuthProvider } from '@/components/auth/AuthProvider'
import Info from '@/components/auth/info'
import MpesaLogo from '@/components/services/Mpesalogo'

export default function Payment({ plans, name, projectid, slug }) {
    const { planType } = useStore()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [initiatepayments, setInitiatePayments] = useState()
    const [disabledButton, setDisableButton] = useState(false)
    const [reloadMessage, setReloadMessage] = useState()
    const isLoggedIn = AuthProvider();
    const selectedPlan = plans && plans.filter(plan => {
        if (plan.type === planType) {
            return { price: plan.price, type: plan.type }
        }
    });

    const onSubmit = async (data, e) => {
        e.preventDefault()
        setDisableButton(true)
        if (isLoggedIn) {

            const paymentinitiater = await axios.post('/api/initiatedpayments', {
                amount: selectedPlan[0].price,
                phonenumber: data.countrycode + data.phonenumber,
                projectid: projectid
            })

            if (paymentinitiater)
                setInitiatePayments(paymentinitiater)
        } else {
            setReloadMessage("Your session has expired, Please Login again...")
            setTimeout(() => {
                useStore.setState({ loginToken: '', userid: '' })
                window.location.reload();
            }, 5000)
        }
    }

    const showConfirm = () => {
        setInitiatePayments(true)
    }

    return (

        <>
            {
                !initiatepayments ? (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}> 
                            <div className="flex items-center justify-center mb-1 text-3xl font-bold sm:mb-2">
                                <MpesaLogo />
                             </div>
                            <div className="flex items-center justify-center mb-1 text-2xl font-bold sm:mb-2">
                                Pay with mpesa
                            </div>
                            <div className="mb-1 sm:mb-2">
                                <label
                                    htmlFor="email"
                                    className="inline-block mb-1 font-medium"
                                >
                                    Phone number
                                </label>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        placeholder="254"
                                        type="text"
                                        className="w-16 h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded-l shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                        id="countrycode"
                                        name="countrycode"
                                        value={254}
                                        {...register("countrycode", { required: true })}
                                        readOnly
                                    />
                                    <input
                                        placeholder="712345678"
                                        type="number"
                                        className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded-r shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                        id="phonenumber"
                                        name="phonenumber"
                                        {...register("phonenumber", { required: true })}
                                    />
                                </div>
                                {errors.phonenumber?.type === 'required' && <p className='text-red-700' role="alert">Phone Number required</p>}

                            </div>
                            <div class="mt-6 flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-900">Total</p>
                                <p class="text-2xl font-semibold text-gray-900">{currency.format(selectedPlan[0].price)}</p>
                            </div>
                            <div className="mt-4 mb-2 sm:mb-4">
                                <button disabled={disabledButton == false ? false : true} type="submit" className={`text-white font-bold ${disabledButton == false ? "bg-green-700" : "bg-green-200"} w-full h-12 inline-flex justify-center hover:${disabledButton == false ? "bg-green-800" : "pointer-events-none"} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center rounded-none`}>

                                    {
                                        disabledButton == false ? (
                                            <>
                                                <svg aria-hidden="true" role="img" class="inline mr-3 w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.272 7.807H2.728C1.773 7.807 1 8.58 1 9.535v5.93c0 .955.773 1.728 1.728 1.728h18.544c.955 0 1.728-.773 1.728-1.728v-5.93c0-.955-.773-1.728-1.728-1.728zm-.944 7.658c0 .52-.424.944-.944.944H3.616a.944.944 0 01-.944-.944V9.535c0-.52.424-.944.944-.944h16.768c.52 0 .944.424.944.944v5.93z" fill="#34A852" />
                                                    <path d="M12.625 13.81l1.628 1.628a.5.5 0 10.707-.707l-2-2a.5.5 0 00-.707 0l-2 2a.5.5 0 10.707.707l1.628-1.628v5.158a.5.5 0 001 0v-5.158z" fill="#FFF" />
                                                    <path d="M16.305 9.193a.5.5 0 00-.707 0l-1.628 1.628v-5.16a.5.5 0 00-1 0v5.16l-1.628-1.628a.5.5 0 10-.707.707l2 2a.5.5 0 00.707 0l2-2a.5.5 0 000-.707z" fill="#FFF" />
                                                </svg>

                                                Pay
                                            </>
                                        )
                                            :
                                            (
                                                <>
                                                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                                    </svg>
                                                    Processing ...
                                                </>
                                            )

                                    }
                                </button>
                            </div>
                            <div className="mt-4 mb-2 sm:mb-4">
                                <button onClick={showConfirm} className="relative group inline-block w-full sm:w-auto py-4 px-6 text-white font-semibold rounded-md bg-orange-900 overflow-hidden">
                                    <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                                    <div className="relative flex items-center justify-center">
                                        <span className="mr-4">Already paid ? confirm</span>
                                        <span>
                                            <svg width="8" height="12" viewbox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.83 5.29L2.59 1.05C2.49704 0.956274 2.38644 0.881879 2.26458 0.83111C2.14272 0.780342 2.01202 0.754204 1.88 0.754204C1.74799 0.754204 1.61729 0.780342 1.49543 0.83111C1.37357 0.881879 1.26297 0.956274 1.17 1.05C0.983753 1.23736 0.879211 1.49082 0.879211 1.755C0.879211 2.01919 0.983753 2.27264 1.17 2.46L4.71 6L1.17 9.54C0.983753 9.72736 0.879211 9.98082 0.879211 10.245C0.879211 10.5092 0.983753 10.7626 1.17 10.95C1.26344 11.0427 1.37426 11.116 1.4961 11.1658C1.61794 11.2155 1.7484 11.2408 1.88 11.24C2.01161 11.2408 2.14207 11.2155 2.26391 11.1658C2.38575 11.116 2.49656 11.0427 2.59 10.95L6.83 6.71C6.92373 6.61704 6.99813 6.50644 7.04889 6.38458C7.09966 6.26272 7.1258 6.13201 7.1258 6C7.1258 5.86799 7.09966 5.73728 7.04889 5.61543C6.99813 5.49357 6.92373 5.38297 6.83 5.29Z" fill="#FFF2EE"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </form>
                        {reloadMessage && <Info message={reloadMessage} />}
                    </>
                )
                    :
                    (
                        <>
                            <ConfirmPayment projectid={projectid} name={name} plans={plans} slug={slug} />
                        </>
                    )
            }
        </>
    )
}