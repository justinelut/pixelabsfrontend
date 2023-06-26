"use client"
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';


const ExpirationChecker = () => {
    const { data: session, status } = useSession()

    useEffect(() => {
        const checkExpiration = () => {
            const currentTime = new Date();
            const targetTime = new Date(session.expires);

            if (currentTime >= targetTime) {
                // Time has expired, perform your desired action here
                signOut()
            } 
        };

        checkExpiration();
    }, [expirationTime]);

    return null;
};

export default ExpirationChecker;
