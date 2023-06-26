import Nav from '@/components/dashboard/nav';




export const metadata = {
    title: 'Verixr - Services',
    description:
        'Purchased Services'
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
