import Image from 'next/image'
export default function Loader() {
    return (
        <div className="w-full h-full fixed block top-0 left-0 bg-secondary opacity-100 z-50">
            <span className="w-full h-full fixed top-0 left-0 bg-secondary opacity-100 z-50 flex justify-center items-center">
                <div className="flex justify-center items-center w-32 h-32">
                    <Image src="/assets/logo.png" alt="Logo" width={38} height={38} />
                </div>
            </span>
        </div>
    )
}
