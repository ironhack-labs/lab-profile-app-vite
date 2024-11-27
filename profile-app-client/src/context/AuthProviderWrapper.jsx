import { createContext, useContext, useEffect, useState } from "react";
import useAxiosAPI from "../axiosAPI";

const TOKEN_NAME = "authToken";
const UserContext = createContext(null);

// eslint-disable-next-line react/prop-types
function AuthProviderWrapper({ children }) {
    const [username, setUsername] = useState("");
    const [campus, setCampus] = useState("");
    const [course, setCourse] = useState("");
    const [password, setPassword] = useState("");
    const [_id, set_id] = useState(null);
    const { axiosGet } = useAxiosAPI();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        authenticateUser();
    }, []);

    function storeToken(token) {
        console.log("TOKEN added");
        localStorage.setItem(TOKEN_NAME, token);
    }

    function getToken() {
        return localStorage.getItem(TOKEN_NAME);
    }

    function removeToken() {
        if (!getToken()) {
            return;
        }
        console.log("TOKEN removed");
        localStorage.removeItem(TOKEN_NAME);
    }

    function logoutUser() {
        removeToken();
        authenticateUser();
    }

    async function authenticateUser() {
        const token = getToken();
        const { data, success } = token ? await axiosGet("/verify", token, username ? username : null ) : { success: false };
        if (token && success) {
            logToken(data);

            setUsername(data.username);
            setCampus(data.campus);
            setCourse(data.course);
            setPassword(data.password);
            set_id(data._id);

            setIsLoggedIn(true);
            console.log("AUTH", "logged in:", data.username);
        } else {
            removeToken();

            setUsername("");
            setCampus("");
            setCourse("");
            setPassword("");
            set_id(null);

            setIsLoggedIn(false);
            console.log("AUTH", "not logged in!");
        }
    }

    function logToken(data) {
        const issuedAt = new Date(data.iat * 1000);
        const expiresAt = new Date(data.exp * 1000);
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingLifetime = data.exp - currentTime;
        console.log("TOKEN", "remaining lifetime:", formatTime(remainingLifetime), "created:", issuedAt, "expires:", expiresAt);
    }

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    }

    const exporting = { username, setUsername, campus, setCampus, course, setCourse, password, setPassword, _id, isLoggedIn, storeToken, getToken, authenticateUser, logoutUser };

    return (
        <UserContext.Provider value={exporting}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProviderWrapper;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthProvider = () => useContext(UserContext);

