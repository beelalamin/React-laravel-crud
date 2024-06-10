import { createContext, useState } from "react";

export const userContext = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState(
        localStorage.getItem("ACCESS_TOKEN") || null
    );

    const updateUser = (userData) => {
        userData && setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return;
    };

    const updateToken = (token) => {
        setToken(token);
        localStorage.setItem("ACCESS_TOKEN", token);
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
            {children}
        </userContext.Provider>
    );
};

// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState({});

//     const [token, setToken] = useState(
//         JSON.parse(localStorage.getItem("ACCESS_TOKEN")) || null
//     );

//     const updateUser = (data) => {
//         setCurrentUser(data);
//     };

//     const updateToken = (data) => {
//         setToken(data);
//     };

//     useEffect(() => {
//         localStorage.setItem("user", JSON.stringify(currentUser));
//     }, [currentUser]);

//     return (
//         <AuthContext.Provider
//             value={{ currentUser, token, updateUser, updateToken }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };
