"use client"

import Image from 'next/image';
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { FaArtstation } from "react-icons/fa";
import {motion} from 'framer-motion'
import {usePathname} from 'next/navigation'
import { useSession } from 'next-auth/react'

const links = [
    {
        href: '/templates',
        name: 'Templates'
    },
    {
        href: '/services',
        name: 'Services'
    },
    {
        href: '/projects',
        name: 'Projects'
    },
    {
        href: '/blog',
        name: 'Blog'
    },
    {
        href: '/contact',
        name: 'Contact us'
    }  
]

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
}

const Navbar = () => {
    const showMenu = useRef(null);
    const path = usePathname()
    const {data:session, loading, status } = useSession()

   

    function handleClick() {
        showMenu.current.classList.remove("hidden");
    }
    function closeMenu() {
        showMenu.current.classList.add("hidden");
    }

   
    return (
        <>
        
            <nav className="fixed flex justify-between py-6 w-full lg:px-48 md:px-12 px-4 content-center bg-secondary z-10">
                <div className="flex items-center">
                    <Link href="/"><FaArtstation color="black" size={30} /></Link>
                </div>
                <ul className="font-montserrat items-center hidden md:flex">

                    {
                        links && links.map(link=>(
                            <li className="mx-3">
                                <Link className='relative' href={link.href}>
                                    {link.href == path && (
                                        <motion.span layoutId='underline' className="absolute left-0 top-full block h-[1px] w-full bg-black" />
                                    )}
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                    
                    
                </ul>
                <div className="font-montserrat hidden md:block">
                    {
                        status && status == 'unauthenticated' ? (<>
                            <Link href="/auth/login" className="mr-6">Login</Link>
                            <Link href="/auth/signup" className="py-2 px-4 text-white bg-black rounded-3xl">Signup</Link>
                        </>) : (
                                <a href="/dashboard" className="py-2 px-4 text-white bg-black rounded-3xl">Dashboard</a>

                        )
                    }
                   
                </div>
                <div id="showMenu" onClick={handleClick} className="md:hidden">

                    <Image src="/image/logos/Menu.svg" alt="Menu icon" height={24} width={24} />
                </div>
            </nav>


            <motion.div 
            animate={showMenu}
            variants={variants}
            id='mobileNav' ref={showMenu} className="hidden px-4 py-6 
            fixed top-0 left-0 h-full w-full 
            bg-secondary z-20 animate-fade-in-down">

                <div id="hideMenu" onClick={closeMenu} className="flex justify-end animate-fade-out-up">
                    <Image src="/image/logos/Cross.svg" alt="" height={64} width={64} />
                </div>
                <ul className="font-montserrat flex flex-col mx-8 my-24 items-center text-3xl">
                    {
                        links && links.map(link => (
                            <li className="my-6">
                                <Link onClick={closeMenu} className='relative' href={link.href}>
                                    {link.href == path && (
                                        <motion.span layoutId='underline' className="absolute left-0 top-full block h-[1px] w-full bg-black" />
                                    )}
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                {
                    status && status == 'unauthenticated' ? (<>
                        <Link onClick={closeMenu} href="/auth/login" className="mr-6">Login</Link>
                        <Link onClick={closeMenu} href="/auth/signup" className="py-2 px-4 text-white bg-black rounded-3xl">Signup</Link>
                    </>) : (
                            <a onClick={closeMenu} href="/dashboard" className="py-2 px-4 text-white bg-black rounded-3xl">Dashboard</a>
                    )
                }

            </motion.div>
        </>
    );
};

export default Navbar;
