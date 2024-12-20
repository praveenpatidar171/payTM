import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const userContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const nevigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) setUser(userInfo);
        setLoading(false);
        if (!userInfo && location.pathname !== '/' && location.pathname !== '/login') {
            nevigate('/');
        }
    }, [nevigate, location]);

    if (loading) return null;

    return <userContext.Provider value={{ user, setUser }} >
        {children}
    </userContext.Provider>
}

export const UserState = () => {
    return useContext(userContext);
}

export default UserProvider;