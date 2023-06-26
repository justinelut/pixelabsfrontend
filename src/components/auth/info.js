import { toast } from 'react-toastify';

export default function Info({ message }) {
    const notify = () => toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    notify()
    return (
        <>

        </>
    )
}