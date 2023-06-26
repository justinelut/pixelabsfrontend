import { FaWhatsapp } from 'react-icons/fa';

const WhatsappChatComponent = ({ fullnames, projectTitle, whatsappNumber, projectDescription}) => {
    const handleChatClick = () => {

        const message = `${fullnames}:\n\nTitle: ${projectTitle}\nDescription: ${projectDescription}`;

        // Generate the WhatsApp URL with pre-filled message
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
    };

    return (
        <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            onClick={handleChatClick}
        >
            <FaWhatsapp className="mr-2" />
            Chat on WhatsApp
        </button>
    );
};

export default WhatsappChatComponent
