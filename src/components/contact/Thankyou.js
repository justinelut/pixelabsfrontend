import { FaCheck } from "react-icons/fa";

export default function ThankYou() {
    return (
        <div className="w-full max-w-xl xl:px-8 xl:w-5/12 pt-10">
            <div className="bg-white rounded shadow-2xl">
                <div className="bg-rose-500 py-5 flex flex-col items-center">
                    <FaCheck size={150} color='white' className="mb-2 mt-10 font-bold" />
                </div>
                    <div className="mx-auto max-w-md overflow-hidden rounded-2xl text-gray-700 shadow-md">
                        
                        <div className="flex flex-col items-center bg-white px-4 py-10">
                            <h2 className="mb-2 text-3xl font-bold text-rose-500 sm:text-4xl">Thank you!</h2>
                            <p className="mb-8 font-medium text-gray-500">Your message was submitted & we will be getting back to you</p>
                            <div className="flex items-center rounded-xl bg-rose-500 p-4">
                                    <div className="ml-4 w-56">
                                    <p className="text-xs font-medium text-gray-100">From</p>
                                    <p className="font-medium text-white">Pixelabs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}