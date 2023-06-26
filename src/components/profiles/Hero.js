import Image from 'next/image';

export default function AboutMe() {
    return (
          <div className="lg:bg-[linear-gradient(90deg,_white_70%,_pink_70%)] px-4 py-24">
                <div className="mx-auto mt-20 px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                        <div className="lg:max-w-lg lg:pr-5">
                            <div className="max-w-xl">
                                <h2 className="mb-6 max-w-lg text-3xl leading-snug tracking-tight text-blue-600 sm:text-5xl sm:leading-snug">
                                    <span className="my-1 inline-block font-serif font-bold text-blue-600">Learning model</span>
                                    of the future
                                </h2>
                                <p className="text-base text-gray-700">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque it.</p>
                                <div className="mt-8 sm:flex space-y-3 sm:space-y-0 sm:space-x-3">
                                    <div className="relative overflow-hidden rounded-xl border-4 border-blue-600 bg-white shadow">
                                        <div className="py-10 px-6">
                                            <div className="flex items-center">
                                                <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">328</h3>
                                                <span className="ml-3 text-base font-medium capitalize">Great Achievements</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative overflow-hidden rounded-xl border-4 border-blue-600 bg-white shadow">
                                        <div className="py-10 px-6">
                                            <div className="flex items-center">
                                                <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">16</h3>
                                                <span className="ml-3 text-base font-medium capitalize">Graduations sponsored</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative text-blue-600 lg:ml-32 lg:w-1/2 hidden lg:block">
                            <div className="border-b-8 border-b-blue-600 max-w-lg mx-auto mb-10">
                                <img className="w-full h-full object-contain" src="/images/sisa0dVB-OE35qZ9CRvF2.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
    );
};


