import Layout from '@/app/rootlayout'

export const metadata = {
    title: 'Verixr Inc',
    description: "Transform your online presence with our comprehensive digital services.",
    openGraph: {
        title: "Verixr Inc",
        images: "https://frontend.verixr.com/_next/image?url=https%3A%2F%2Fserver.verixr.com%2Fmedia%2Fword-design-written-top-colorful-geometric-3d-shapes_2227-1663-1.jpg&w=1080&q=75"
    },
};

export default async function RootLayout({ children }) {


    return (
        <html lang="en">
            <body data-theme="acid" >
                <Layout>
                    {children}
                </Layout> 
            </body>
        </html>
    )
}
