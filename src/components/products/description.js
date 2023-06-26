import { serialize } from "@/utilities/JsonToHtml";

export default function ProductDescription({ documentation }) {
    return (
        <div className="py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span className="relative inline-block">
                        <svg
                            viewBox="0 0 52 24"
                            fill="currentColor"
                            className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                        >
                            <defs>
                                <pattern
                                    id="ace59d72-08d5-4850-b9e4-d9d0b86c0525"
                                    x="0"
                                    y="0"
                                    width=".135"
                                    height=".30"
                                >
                                    <circle cx="1" cy="1" r=".7" />
                                </pattern>
                            </defs>
                            <rect
                                fill="url(#ace59d72-08d5-4850-b9e4-d9d0b86c0525)"
                                width="52"
                                height="24"
                            />
                        </svg>
                        <span className="relative">Template description</span>
                    </span>{' '}
                    & Documentation
                </h2>
            </div>
            <div className="mx-auto lg:max-w-2xl">
                {documentation && serialize(documentation)}
            </div>
        </div>
    );
};