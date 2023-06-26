"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios"; // Add this line to import axios
import fetchMessages from '@/components/dashboard/fetcher/fetchmessages';
import Image from "next/image";
import { formatTime } from "@/utilities/DateFormatter";
import { useForm } from "react-hook-form";



export default function ({ data }) {
    const searchParams = useSearchParams();
    const chatid = searchParams.get('chatid')
    const { data: session } = useSession();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState();
    const [updateMessages, setUpdateMessages] = useState()
    const messagesRef = useRef(null);
    const { register, handleSubmit, reset} = useForm();




    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedMessages = await fetchMessages(chatid, session && session.user.payloadToken);
                setMessages(fetchedMessages);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [chatid, session, updateMessages]);



    const onSubmit = async (data, e) => {
        e.preventDefault()
        console.log(data)
        console.log(e)
        const results = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + `/api/messages`, {
            message: data.newmessage,
            chatid: chatid,
            fullnames: session.user.name,
            role: session.user.role,
            profilepic: session.user.image,
            isread: 'false'
        },
            {

                headers: {
                    Authorization: `JWT ${session.user.payloadToken}`
                }

            })

        if (results) {
            setUpdateMessages(results)
            reset()
        }

    };


    const handleSend = () =>{
        onSubmit()
    }

    useEffect(() => {
        messagesRef.current.scrollIntoView()
    }, [chatid, messages, session])

    return (
        <>
        
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-10 lg:px-8 lg:py-20">
                <div className="grid gap-10 lg:grid-cols-2">
                    <div className="lg:pr-10">
                        <a
                            href="/"
                            aria-label="Go Home"
                            title="Logo"
                            className="inline-block mb-5"
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                                <svg
                                    className="w-10 h-10 text-deep-purple-accent-400"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>
                        </a>
                        <h5 className="mb-4 text-4xl font-extrabold leading-none">
                            {data && data.docs[0].productinfo.name || data && data.docs[0].productinfo2.name}
                        </h5>
                        {
                            data && data.docs[0].productinfo.name ? (
                                data.docs[0].productinfo.plans[0].details.map((detail, index) => (
                                    <ul key={index} className="menu bg-base-100 w-56 rounded-box">
                                        <li className="bordered">{`${index + 1}${' '}${detail.Details}`}</li>
                                    </ul>
                                ))
                            ) : (
                                data.docs[0].productinfo2.plans[0].details.map((detail, index) => (
                                    <ul key={index} className="menu bg-base-100 w-56 rounded-box">
                                        <li className="bordered">{`${index + 1}${' '}${detail.Details}`}</li>
                                    </ul>
                                ))
                            )

                        }
                        <hr className="mb-5 border-gray-300" />

                        {
                            session && session.user.role === 'user' ? (
                                <div className="card w-full bg-neutral text-neutral-content">
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">Please Include the following Info</h2>
                                        <ul className="menu bg-base-100 w-56 rounded-box">
                                            <li className="bordered">Whatsapp Phone Number</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                                :
                                (
                                    ''
                                )
                        }
                    </div>
                    <div>
                        <div className="flex flex-col max-h-96">
                            <header className="bg-gray-800 text-white h-16 flex justify-center items-center p-4">
                                <h3>Describe the service</h3>
                            </header>
                            <div className="overflow-y-scroll max-h-96 p-4">
                                <h5 className="mb-4 text-4xl font-extrabold leading-none">
                                    {data && data.docs[0].productinfo.name || data && data.docs[0].productinfo2.name}
                                </h5>
                                {
                                    data && data.docs[0].productinfo.name ? (
                                        data.docs[0].productinfo.plans[0].details.map((detail, index) => (
                                            <ul key={index} className="menu bg-base-100 w-56 rounded-box">
                                                <li className="bordered">{`${index + 1}${' '}${detail.Details}`}</li>
                                            </ul>
                                        ))
                                    ) : (
                                        data.docs[0].productinfo2.plans[0].details.map((detail, index) => (
                                            <ul key={index} className="menu bg-base-100 w-56 rounded-box">
                                                <li className="bordered">{`${index + 1}${' '}${detail.Details}`}</li>
                                            </ul>
                                        ))
                                    )

                                }
                                {messages && messages.docs.map((message, index) => (
                                    <>
                                        {message.role === session.user.role ? (
                                            <div key={index} className="chat chat-end">
                                                <div className="chat-image avatar">
                                                    <div className="w-10 rounded-full">
                                                        <Image src={message.createdBy.profilephoto.sizes.profile.url} width={message.createdBy.profilephoto.sizes.profile.width} height={message.createdBy.profilephoto.sizes.profile.height} />
                                                    </div>
                                                </div>
                                                <div className="chat-header">
                                                    {message.createdBy.firstName}
                                                    <time className="text-xs opacity-50">{formatTime(message.createdAt)}</time>
                                                </div>
                                                <div className="chat-bubble">{message.message}</div>
                                                <div className="chat-footer opacity-50">
                                                    {message.isread === 'true' ? 'seen' : 'sent'}
                                                </div>
                                            </div>
                                        ) : (
                                            <div key={index} className="chat chat-start">
                                                <div className="chat-image avatar">
                                                    <div className="w-10 rounded-full">
                                                        {message.createdBy.profilephoto ? (
                                                            <Image src={message.createdBy.profilephoto.sizes.profile.url} width={message.createdBy.profilephoto.sizes.profile.width} height={message.createdBy.profilephoto.sizes.profile.height} />
                                                        ) : ('')}

                                                    </div>
                                                </div>
                                                <div className="chat-header">
                                                    {message.fullnames}
                                                    <time className="text-xs opacity-50">{formatTime(message.createdAt)}</time>
                                                </div>
                                                <div className="chat-bubble">{message.message}</div>
                                            </div>
                                        )}

                                    </>
                                ))}
                                <div ref={messagesRef}></div>
                            </div>
                            

                                <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="h-16 bg-gray-200 flex items-center p-4">
                                <input
                                    type="text"
                                    placeholder="Type your description here..."
                                    name="newmessage"
                                    onKeyDown={handleSend}
                                    {...register("newmessage", { required: true })}
                                    className="flex-grow p-2 rounded-lg border border-gray-400"
                                />
                                <button
                                    type="submit"
                                    className="h-10 w-20 bg-gray-800 text-white rounded-lg ml-4"
                                >
                                    Send
                                </button>
                                </div>
                                </form>
                           
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
