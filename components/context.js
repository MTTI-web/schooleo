import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cursorType, setCursorType] = useState('default');
  const [loadingSession, setLoadingSession] = useState(false);
  useEffect(() => {
    if (user) {
      log('Current user:', user);
      localStorage.setItem('user', JSON.stringify(user.email));
    }
  }, [user]);
  useEffect(() => {
    log('Is loading session?', loadingSession);
  }, [loadingSession]);

  const log = (...args) => {
    if (user && user.settings && user.settings.isDeveloper) {
      console.log(...args);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cursorType,
        setCursorType,
        loadingSession,
        setLoadingSession,
        log,
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
