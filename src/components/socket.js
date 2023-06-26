import { io } from 'socket.io-client';

export async function establishSocketConnection(session) {
    try {
        if (session) {
            // Set the Authorization header on the socket connection
            const socket = io(process.env.NEXT_PUBLIC_SERVER_URL + '/api/messages',
                {
                    extraHeaders: {
                        Authorization: `JWT ${session}`
                    }
                }
            );


            // Connect to the Socket.IO server
            socket.connect();

            // Optional: Add event listeners or perform other Socket.IO setup here
            socket.on('connect', () => {
                console.log('Connected to Socket.IO server');
            });

            // Return the established socket connection
            return socket;
        } else {
            console.error('User session not found');
        }
    } catch (error) {
        console.error('Error establishing Socket.IO connection:', error);
    }
}
