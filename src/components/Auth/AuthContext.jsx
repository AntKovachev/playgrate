import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token) {
            if (user) {
                setIsLoggedIn(true);
                setUserData({ token, ...JSON.parse(user) });
            } else {
                axios
                    .get("http://localhost:5000/api/auth/profile", {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        setIsLoggedIn(true);
                        setUserData({ token, ...response.data.user });
                        localStorage.setItem("user", JSON.stringify(response.data.user));
                    })
                    .catch((error) => {
                        console.error("Error fetching user data:", error);
                        setIsLoggedIn(false);
                        setUserData(null);
                    });
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};