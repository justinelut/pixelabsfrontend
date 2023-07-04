"use client"
import './globals.css'
import { Navbar, Footer } from '@/components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PageAnimations } from '@/components'
import { AnimatePresence } from 'framer-motion'
import { serverClient } from '@/components'
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from "next-auth/react"
//import { useEffect } from 'react';



export default function Layout({ children, session }) {
    // useEffect(() => {
    //     const loadFacebookSDK = () => {
    //         window.fbAsyncInit = function () {
    //             FB.init({
    //                 xfbml: true,
    //                 version: 'v17.0'
    //             });
    //         };

    //         (function (d, s, id) {
    //             var js, fjs = d.getElementsByTagName(s)[0];
    //             if (d.getElementById(id)) return;
    //             js = d.createElement(s);
    //             js.id = id;
    //             js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    //             fjs.parentNode.insertBefore(js, fjs);
    //         })(document, 'script', 'facebook-jssdk');
    //     };

    //     loadFacebookSDK();
    // }, []);

    // useEffect(() => {
    //     const initializeChatbox = () => {
    //         const chatbox = document.getElementById('fb-customer-chat');
    //         if (chatbox) {
    //             chatbox.setAttribute('page_id', '102040791354575');
    //             chatbox.setAttribute('attribution', 'biz_inbox');
    //         }
    //     };

    //     initializeChatbox();
    // }, []);
    
    return (
        <SessionProvider session={session}>
            <ApolloProvider client={serverClient}>
                <AnimatePresence>
                    <PageAnimations>
                        <Navbar />
                        {children}
                        <div id="fb-root"></div>
                        <div id="fb-customer-chat" class="fb-customerchat">
                        </div>
                        <Footer />
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </PageAnimations>
                </AnimatePresence>
            </ApolloProvider>
        </SessionProvider>
    )
}