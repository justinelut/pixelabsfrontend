"use client"
import { useStore } from '@/store/store'
import axios from 'axios'
// import { currency } from '@/components/utilities/Currency'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { fetcher } from '@/components/api/fetchdata'
import Info from '@/components/auth/info'
import qs from 'qs'
import { AuthProvider } from '@/components/auth/AuthProvider'
import SuccessMessage from '@/components/services/PaymentSuccess'
import Message from '@/components/services/Message'
import MpesaLogo from '@/components/services/Mpesalogo'

export default function ConfirmPayment({ plans, name, projectid, slug }) {
    const { planType, serviceType, userid } = useStore()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [disabledButton, setDisableButton] = useState(false)
    const [message, setMessage] = useState()
    const [reloadMessage, setReloadMessage] = useState()
   const [successPurchase, setSuccessPurchase] = useState(false)
    const [Paymentstatus, setPaymentStatus] = useState()
    const isLoggedIn = AuthProvider();



    const selectedPlan = plans && plans.filter(plan => {
        if (plan.type === planType) {
            return { price: plan.price, type: plan.type }
        }
    });




    const onSubmit = async (results, e) => {
        e.preventDefault()
        setDisableButton(true)
        if (isLoggedIn) {
            const query = {
                MpesaReceiptNumber: {
                    equals: results.confirmationcode
                }, and: [
                    {
                        userId: {
                            equals: userid
                        }
                    },
                    {
                        projectId: {
                            equals: projectid
                        }
                    },
                    {
                        confirmed: {
                            equals: "false"
                        }
                    }
                ]

            }
            const stringifiedQuery = qs.stringify({
                where: query
            }, { addQueryPrefix: true })

            const confirmpayment = await fetcher(`/api/payments${stringifiedQuery}`)

            if (confirmpayment) {
                if (confirmpayment.data.docs.length == 0) {
                    setMessage("We have received 0 payed amount")
                    setPaymentStatus('notsuccess')
                    setDisableButton(false)
                } else if (confirmpayment.data.docs.length > 0) {
                    const updateConfirm = await axios.patch("/api/payments/" + confirmpayment.data.docs[0].id,
                        {
                            confirmed: 'true'
                        })
                    if (updateConfirm) {

                        const results = await axios.post('/api/projects', {
                            service: name,
                            price: selectedPlan && selectedPlan[0].price,
                            amountpayed: selectedPlan && selectedPlan[0].price,
                            plan: selectedPlan[0].type,
                            paymentstatus: "payed",
                            status: "pending",
                            iscomplete: "false",
                            type: serviceType,
                        },
                        )
                        if (results) {
                            setDisableButton(false)
                            setPaymentStatus('success')
                            setMessage("Payment was successful, redirecting ...")
                            setSuccessPurchase(true)
                        }

                    }
                }
            }
        } else {
            setReloadMessage("Your session has expired, Please Login again...")
            setTimeout(() => {
                useStore.setState({ loginToken: '', userid: '' })
                window.location.reload();
            }, 5000)
        }

    }


    return (
        <>
            {

                successPurchase == true ? (
                    <>
                        <SuccessMessage />
                    </>
                )
                    :
                    (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex items-center justify-center mb-1 text-3xl font-bold sm:mb-2">
                                <MpesaLogo />
                            </div>
                            <div className="flex items-center justify-center mb-1 text-2xl font-bold sm:mb-2">
                                Confirm Payment
                            </div>
                            <div className="mb-1 sm:mb-2">
                                {message && <Message message={message} Paymentstatus={Paymentstatus} />}                              
                            </div>
                            <div class="mt-2 flex items-center justify-between">
                                <ol className="list-decimal list-inside">
                                    <li>A pop-up message will appear on your phone.</li>
                                    <li>Enter your PIN and click "send".</li>
                                    <li>Wait for an Mpesa message with confirmation code, </li>
                                    <li>Input the confirmation code, then click "confirm" below.</li>
                                </ol>
                            </div>

                            <div className="mb-1 sm:mb-2">
                                <label
                                    htmlFor="email"
                                    className="inline-block mb-1 font-medium"
                                >
                                    Mpesa Confirmation Code
                                </label>
                                <div style={{ display: 'flex' }}>

                                    <input
                                        placeholder="RD43E0ZV6P"
                                        type="text"
                                        className="flex-grow h-12 px-4 mb-2 w-full transition duration-200 bg-white border border-gray-300 rounded-r shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                        id="confirmationcode"
                                        name="confirmationcode"
                                        {...register("confirmationcode", { required: true })}
                                    />
                                </div>
                                {errors.confirmationcode?.type === 'required' && <p className='text-red-700' role="alert">Confirmation Code required</p>}

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

                                                Confirm
                                            </>
                                        )
                                            :
                                            (
                                                <>
                                                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                                    </svg>
                                                    Confirming ...
                                                </>
                                            )

                                    }
                                </button>
                            </div>
                            <div className="mt-4 mb-2 sm:mb-4">
                                <button type="button" className="text-white font-bold bg-blue-700 h-12 inline-flex justify-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center rounded-none">
                                    <AiOutlineArrowLeft />
                                </button>
                            </div>
                            {reloadMessage && <Info message={reloadMessage} />}
                        </form>


                    )

            }
        </>

    )
}