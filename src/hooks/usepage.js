"use client"

import React, { useState, useEffect } from "react";

function usePagination({ fetchData, pageSize = 10 }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleData, setVisibleData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const visiblePages = [];

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            const { data, total } = await fetchData(currentPage, pageSize);
            setVisibleData(data);
            setTotalPages(Math.ceil(total / pageSize));
        };

        fetchDataAndSetState();
    }, [currentPage, fetchData, pageSize]);

    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            visiblePages.push(
                <button key={i} disabled>
                    {i}
                </button>
            );
        } else if (
            i <= 3 ||
            i >= totalPages - 2 ||
            Math.abs(i - currentPage) <= 1
        ) {
            visiblePages.push(
                <button key={i} onClick={() => setCurrentPage(i)}>
                    {i}
                </button>
            );
        } else if (!visiblePages[visiblePages.length - 1].props.disabled) {
            visiblePages.push(<span key="ellipsis">...</span>);
        }
    }

    return (
        <>
            <ul>
                {visibleData.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <div>
                <button onClick={() => setCurrentPage(1)}>First</button>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Prev
                </button>
                {visiblePages}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
                <button onClick={() => setCurrentPage(totalPages)}>Last</button>
            </div>
        </>
    );
}

export default usePagination;
