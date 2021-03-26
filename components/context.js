import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cursorType, setCursorType] = useState('default');
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
                cursorType,
                setCursorType,
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
