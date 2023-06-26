import { toast } from 'react-toastify';

export default function Success({ message }) {
    const notify = () => toast.success(message, {
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