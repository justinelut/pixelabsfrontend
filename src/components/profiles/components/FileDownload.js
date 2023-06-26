import React from 'react';

function DownloadButton(props) {
    const handleClick = (e) => {
        e.preventDefault()
        const pdfUrl = props.pdfUrl;
        const fileName = props.fileName;
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button className='hover:z-50 transition-all duration-300 ease-in-out  hover:scale-125 bg-purple-600 p-2 rounded-md text-white ' onClick={handleClick}>{props.text}</button>
    );
}

export default DownloadButton;
