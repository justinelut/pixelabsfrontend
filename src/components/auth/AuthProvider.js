import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export const fetcher = async (path) => {
    try {
        const res = await axios.get(path, {
            // headers: {
            //     "Authorization": "account API-Key 24d76c42-cfa8-431f-bda7-6a8773e30880"
            // }
        });
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const AuthProvider = () => {
    const [loggedin, setLoggedin] = useState(false);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const data = await fetcher("/api/account/me");
                setLoggedin(data);
            } catch (error) {
                console.error(error);
            }
        };
        checkLoggedIn();
    }, []);

    const isLoggedIn = useMemo(() => loggedin !== null && loggedin !== false, [loggedin]);
    const isNotLoggedIn = useMemo(() => loggedin === null || loggedin === false, [loggedin]);

    if (loggedin.user == null) {
        return isNotLoggedIn;
    } else {
        return isLoggedIn;
    }
   
};