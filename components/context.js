import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (user) {
            console.log('Current user:', user);
            localStorage.setItem('user', JSON.stringify(user.email));
        }
    }, [user]);
    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
