import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cursorType, setCursorType] = useState('default');
  const [loadingSession, setLoadingSession] = useState(false);
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    if (user) {
      log('Current user:', user);
      localStorage.setItem('user', JSON.stringify(user.email));
    }
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!notification) return;
        setNotification(null);
      },
      notification ? notification.timeout : 1
    );
    return () => clearTimeout(timeout);
  }, [notification]);

  useEffect(() => {
    log('Is loading session?', loadingSession);
  }, [loadingSession]);

  const log = (...args) => {
    if (user && user.settings && user.settings.isDeveloper) {
      console.log(...args);
    }
  };

  const showNotification = (content, timeout = 5000) => {
    setNotification(content ? { content, timeout } : null);
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
        notification,
        showNotification,
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
