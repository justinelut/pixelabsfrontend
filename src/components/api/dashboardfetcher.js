import { useSession } from 'next-auth/react';
import axios from 'axios';
import useSWR from 'swr';

export const useDashboardFetcher = (path) => {
    const { data: session } = useSession();

    const fetcher = async (path) => {
        const dashboardinstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
            headers: {
                Authorization: `JWT ${session.user.payloadToken}`,
            },
        });

        const response = await dashboardinstance.get(path);

        return response.data;
    };

    const { data, error } = useSWR(path, fetcher);

    return {
        data,
        error,
        isLoading: !data && !error,
    };
};
