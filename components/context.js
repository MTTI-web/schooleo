import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cursorType, setCursorType] = useState('default');
  const [userCursorType, setUserCursorType] = useState('default');
  useEffect(() => {
    if (user) {
      console.log('Current user:', user);
      localStorage.setItem('user', JSON.stringify(user.email));
    }
  }, [user]);
  useEffect(() => {
    const savedCursorType = localStorage.getItem('cursorType');
    if (savedCursorType) {
      setCursorType(JSON.parse(savedCursorType));
    } else {
      localStorage.setItem('cursorType', JSON.stringify('default'));
      setUserCursorType('default');
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      localStorage.setItem('cursorType', JSON.stringify(userCursorType));
    }
    console.log('User cursor type set to:', userCursorType);
  }, [userCursorType, user]);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cursorType,
        setCursorType,
        userCursorType,
        setUserCursorType,
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
