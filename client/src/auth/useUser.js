import { useState, useEffect } from 'react';
import { useToken } from './useToken';

export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload));
    }

    // const [user, setUser] = useState(() => {
    //     if (!token) return null;
    //     return getPayloadFromToken(token);
    // });
    const [user, setUser] = useState({
        id: 123,
        email: 'example@example.com',
        isVerified: true,
        info: {
            name: 'John Doe',
            age: 30,
            country: 'USA'
        }
    })



    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getPayloadFromToken(token));
        }
    }, [token]);

    
    return user;
}