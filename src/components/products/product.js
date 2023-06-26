"use client"

import React, {useEffect} from 'react'
import ProductPricing from '@/components/products/pricing'
import ProductDescription from '@/components/products/description'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Share from '@/components/Blog/share';
import { serialize } from '@/utilities/JsonToHtml';

function Product({data}) {
  const pathname = usePathname();


  useEffect(() => {
    // Get the hash value from the URL
    const hash = window.location.hash.substring(1);

    // If the hash exists, scroll to the element with the corresponding ID
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);


  return (
    <section className={`pt-24 pb-24 rounded-b-10xl overflow-hidden md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4`} style={{ backgroundColor: data && data.docs[0].templatebgcolor.color}}>
      <div className="py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="mb-10 lg:max-w-lg lg:pr-5 lg:mb-0">
            <div className="max-w-xl mb-6">
              <div className='mb-6'>
                <Share url={`${process.env.NEXT_PUBLIC_URL}/products/${data && data.docs[0].slug}`} title={data && data.docs[0].name} />
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                {data && data.docs[0].name}
                <br className="hidden md:block" />
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
               {data && data.docs[0].description}
              </p>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <a
                href={data && data.docs[0].previewlink}
                className="inline-flex items-center justify-center w-full h-12 px-6 mb-3 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto md:mr-4 md:mb-0 bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                <span className="mr-3">View Demo</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4"
                >
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    points="4,4 22,4 19,14 4,14 "
                  />
                  <circle
                    cx="4"
                    cy="22"
                    r="2"
                    strokeLinejoin="miter"
                    strokeLinecap="square"
                    stroke="none"
                    fill="currentColor"
                  />
                  <circle
                    cx="20"
                    cy="22"
                    r="2"
                    strokeLinejoin="miter"
                    strokeLinecap="square"
                    stroke="none"
                    fill="currentColor"
                  />
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    points="1,1 4,4 4,14 2,18 23,18 "
                  />
                </svg>
              </a>
              <Link
                href={`${pathname}#pricing`}
                aria-label=""
                className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
              >
                Price List
              </Link>
            </div>
          </div>
          <div className="relative lg:w-1/2">
            <Image
              className="object-cover w-full h-56 rounded sm:h-96"
              src={data && data.docs[0].image.url}
              alt=""
            />     
          </div>
        </div>
      </div>
      <ProductDescription documentation={data && data.docs[0].documentation} />
      <div id="pricing">
        <ProductPricing pricing={data && data.docs[0].plans} slug={data && data.docs[0].slug} pid={data && data.docs[0].id} saletype={data && data.docs[0].type} saleroute={data && data.docs[0].route} />
      </div>
    </section>
  )
}

export default Product