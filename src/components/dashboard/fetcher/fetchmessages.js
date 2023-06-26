import axios from 'axios';
import qs from 'qs'

const fetchMessages = async (chatid, sessionToken) => {
    const query = {
        chatid: {
            equals: chatid
        }
    };

    const messagesid = qs.stringify({
        where: query,
        sort: 'createdAt',
        limit: null
    }, { addQueryPrefix: true });

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages${messagesid}`,
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

export default fetchMessages;
