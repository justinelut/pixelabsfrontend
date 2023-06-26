import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const useFetchChat = (path) => {
    const { data: session } = useSession();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dashboardInstance = axios.create({
                    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
                    headers: {
                        Authorization: `JWT ${session.user.payloadToken}`,
                    },
                });

                const response = await dashboardInstance.get(path);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [path, session]);

    return {
        data,
        error,
        isLoading,
    };
};

export default useFetchChat;
