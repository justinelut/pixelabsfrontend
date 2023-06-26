import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/authoptions';

const fetchDashboardData = async (path) => {
    const session = await getServerSession(authOptions);



    const dashboardInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        headers: {
            Authorization: `JWT ${session?.user?.payloadToken}`,
        },
    });

    const response = await dashboardInstance.get(path);

    return response.data;
};

export default fetchDashboardData;
