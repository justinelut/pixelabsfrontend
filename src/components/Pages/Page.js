"use client"

import qs from 'qs';
import useSWR from 'swr'
import { fetcher } from '@/components/api/fetchdata'
import { useState } from 'react';
import { serialize } from '@/utilities/JsonToHtml'

export default function Page({ params }) {
    const query = {
        slug: {
            equals: params.slug,
        },
    }

    const stringifiedQuery = qs.stringify({
        where: query
    }, { addQueryPrefix: true });
    const [section, setSection] = useState()

    const { isLoading, data } = useSWR(`/api/page${stringifiedQuery}`, fetcher)


    function navigateSection(event) {
        const filteredData = data.data.docs.map((item) => {
            const filteredItems = item.pages.filter((innerItem) => innerItem.cssid === event.target.id);
            return { title: item.name, items: filteredItems };
        });

        setSection(filteredData)
        console.log(filteredData)
    }


    return (
        <div className="w-full bg-white pt-24">
            <main className="relative mx-auto px-4 md:px-10 md:max-w-screen-md">
                <div className="top-20 mb-10 w-full max-w-xs lg:max-w-none lg:w-56 lg:rounded-md lg:border lg:bg-white lg:px-6 lg:py-6 lg:shadow-md lg:absolute lg:-left-56">
                    <div className="pb-2 text-xl font-medium text-orange-600">Table of Contents</div>
                    <hr className="h-1 w-10 bg-orange-600" />
                    <div className="mt-4">
                        {isLoading ? "Loading" : (
                            <>
                                {
                                    data && data.data.docs.map(page => (
                                        <>
                                            {
                                                page.pages.map(section => (
                                                    <div className="mb-3">
                                                        <button onClick={navigateSection} id={section.cssid} className="mb-1 text-sm font-medium text-orange-600 hover:text-orange-600">
                                                            {section.title}
                                                        </button>
                                                    </div>
                                                ))
                                            }
                                        </>

                                    ))
                                }
                            </>

                        )}

                    </div>
                </div>
                {
                    section ? (
                        <article className="text-gray-800">
                            {
                                section[0].items.map(item => (
                                    <>
                                        <h2 id="section-one" className="mb-4 text-3xl font-bold">{item.title}</h2>
                                        {serialize(item.content)}
                                    </>
                                ))
                            }

                        </article>
                    ) : (
                        <article className="text-gray-800">
                            {
                                data && data.data.docs.map(title => (
                                    <>
                                        <h2 id="section-one" className="mb-4 text-3xl font-bold">{title.name}</h2>
                                        <p className="mb-10 text-gray-600">{serialize(title.description)}</p>
                                    </>
                                ))
                            }
                        </article>
                    )
                }

            </main>
        </div>

    )
}