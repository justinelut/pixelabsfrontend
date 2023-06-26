import Link from 'next/link';

export default function page() {
   
    
    return (
        <section className="flex justify-center bg-secondary">
            <div className="max-w-xl px-4 py-28 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24 bg-secondary">
                <div className="mb-4 sm:mb-6 md:mb-8">
                    <label htmlFor="email" className="inline-block mb-2 font-medium">
                        End of session !
                    </label>
                    Your session has expired and you have been logged out of the dashboard
                </div>


                <div className="mb-6 sm:mb-8 md:mb-10">
                    <Link href="/auth/login" className="bg-white inline-flex justify-center items-center text-green-500 w-full h-12 px-4 py-2 border border-green-500 rounded-none">
                        <span className="mr-2">Login</span>
                    </Link>
                    <Link href="/services" className="bg-white inline-flex justify-center items-center text-green-500 w-full h-12 px-4 py-2 border border-green-500 rounded-none">
                        <span className="mr-2">Continue browsing our services & templates</span>
                    </Link>
                </div>


            </div>
        </section>
    )
}