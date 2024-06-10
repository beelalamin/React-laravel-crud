import { createContext, useState } from "react";

export const userContext = createContext({
    user: null,
    token: null,
    updateUser: () => {},
    updateToken: () => {},
});

export const ContextProvider = ({ childern }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(123);

    const updateUser = (userData) => {
        userData && user(userData);
        return;
    };

    const updateToken = (token) => {
        setToken(token);
        token
            ? localStorage.setItem("ACCESS_TOKEN", token)
            : localStorage.removeItem("ACCESS_TOKEN");
        return;
    };

    return (
        <userContext.Provider
            value={{
                user,
                token,
                updateUser,
                updateToken,
            }}
        >
            {childern}
        </userContext.Provider>
    );
};

