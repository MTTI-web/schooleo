import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    return (
        <AppContext.Provider
            value={{
                isSignedIn,
                setIsSignedIn,
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
