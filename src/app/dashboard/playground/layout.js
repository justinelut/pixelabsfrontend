import Nav from '@/components/dashboard/nav';
import { Suspense } from 'react';


export const metadata = {
    title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
    description:
        'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({ children }) {

    return (
        <html lang="en" className="h-full bg-gray-50">
            <body data-theme="acid" className="h-full">

                <Nav />

                {children}
              
            </body>
        </html>
    );
}
