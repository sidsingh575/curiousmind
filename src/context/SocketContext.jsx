
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            // In development, the backend is likely on port 5000
            // In production, it would be the same host
            const newSocket = io('http://localhost:5000', {
                transports: ['websocket'], // Use websocket only to avoid polling issues
            });

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
                // Register the user with their ID
                // We assume currentUser has _id or uid. 
                // Adjust based on your AuthContext structure.
                // If currentUser comes from Firebase, it might not have the Mongo _id directly 
                // unless you are storing it. Using firebaseUid for mapping is safer if available.
                const userId = currentUser._id || currentUser.uid;
                newSocket.emit('register', userId);
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        } else {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }
    }, [currentUser]); // Re-run when user logs in/out

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
