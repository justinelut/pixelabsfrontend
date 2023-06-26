import axios from 'axios';
import qs from 'qs'

const fetchOrders = async (salestype, fetchroute, sessionToken) => {
    const query = {
        salestype: {
            equals: salestype
        }
    };

    const salesType = qs.stringify({
        where: query,
        limit: null
    }, { addQueryPrefix: true });

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}${fetchroute}${salesType}`,
            {
                headers: {
                    Authorization: `JWT ${sessionToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default fetchOrders;
