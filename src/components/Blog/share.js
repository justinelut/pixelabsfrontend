"use client"

import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from "next-share";

const Share = ({ url, title }) => {
    return (
        
        <div className="flex items-center space-x-4">
            <FacebookShareButton quote={'Pixelabs Inc'}
                hashtag={'#pixelabsinc'} url={url}>
                <FacebookIcon
                    size={32}
                    round
                    className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                />
            </FacebookShareButton>
            <TwitterShareButton url={url}>
                <TwitterIcon
                    size={32}
                    round
                    className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                />
            </TwitterShareButton>
            <WhatsappShareButton url={url} title={title} separator=":: ">
                <WhatsappIcon
                    size={32}
                    round
                    className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                />
            </WhatsappShareButton>
            <LinkedinShareButton url={url}>
                <LinkedinIcon
                    size={32}
                    round
                    className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                />
            </LinkedinShareButton>
        </div>
    );
};

export default Share;
