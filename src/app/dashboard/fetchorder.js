import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/authoptions';
import qs from 'qs'

const fetchOrder = async (path, chatid) => {
    const session = await getServerSession(authOptions);

    const query = {
        id: {
            equals: chatid
        }
    };

    const salesType = qs.stringify({
        where: query,
        limit: 10
    }, { addQueryPrefix: true });


    const dashboardInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        headers: {
            Authorization: `JWT ${session?.user?.payloadToken}`,
        },
    });

    const response = await dashboardInstance.get(`${path}${salesType}`);

    return response.data;
};

export default fetchOrder;
