import React from 'react'

export default function serializeContent(content) {
    let html = '';
    let jsx = [];

    for (const item of content) {
        if (item.type) {
            switch (item.type) {
                case 'h1':
                    html +=
                        '<h1 class="text-4xl font-bold">' +
                        item.children.map((child) => child.text).join('') +
                        '</h1>';
                    jsx.push(
                        <h1 className='text-4xl font-bold'>
                            {item.children.map((child) => child.text)}
                        </h1>
                    );
                    break;
                case 'h2':
                    html +=
                        '<h2 class="text-2xl font-semibold">' +
                        item.children.map((child) => child.text).join('') +
                        '</h2>';
                    jsx.push(
                        <h2 className='text-2xl font-semibold'>
                            {item.children.map((child) => child.text)}
                        </h2>
                    );
                    break;
                case 'h3':
                    html +=
                        '<h3 class="text-lg font-medium">' +
                        item.children.map((child) => child.text).join('') +
                        '</h3>';
                    jsx.push(
                        <h3 className='text-lg font-medium'>
                            {item.children.map((child) => child.text)}
                        </h3>
                    );
                    break;
                case 'p':
                    html +=
                        '<p class="my-4">' +
                        item.children.map((child) => child.text).join('') +
                        '</p>';
                    jsx.push(
                        <p className='my-4'>{item.children.map((child) => child.text)}</p>
                    );
                    break;
                case 'blockquote':
                    html +=
                        '<blockquote class="my-4 px-4 border-l-4 border-gray-300 italic">' +
                        item.children.map((child) => child.text).join('') +
                        '</blockquote>';
                    jsx.push(
                        <blockquote className='my-4 px-4 border-l-4 border-gray-300 italic'>
                            {item.children.map((child) => child.text)}
                        </blockquote>
                    );
                    break;
                case 'img':
                    html +=
                        '<img class="my-4 w-full" src="' +
                        item.url +
                        '" alt="' +
                        item.alt +
                        '"/>';
                    jsx.push(
                        <img
                            className='my-4 w-full'
                            src={item.url}
                            alt={item.alt}
                        />
                    );
                    break;
                default:
                    break;
            }
        } else if (item.text) {
            html += item.text;
            jsx.push(item.text);
        } else if (item.children) {
            const serialized = serializeContent(item.children);
            html += serialized.html;
            jsx.push(...serialized.jsx);
        }
    }

    return { html, jsx };
}
