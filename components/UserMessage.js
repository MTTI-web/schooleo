import { useEffect, useState } from 'react';
import styles from '../styles/UserMessage.module.css';
import { useGlobalContext } from './context';

function UserMessage({ children, id }) {
  const [hasRead, setHasRead] = useState(false);
  const { setCursorType } = useGlobalContext();
  useEffect(() => {
    const hasUserReadMessage = localStorage.getItem('read-user-message');
    if (!hasUserReadMessage) {
      localStorage.setItem('read-user-message', JSON.stringify({}));
    } else if (hasUserReadMessage && JSON.parse(hasUserReadMessage)[id]) {
      setHasRead(true);
    } else if (hasUserReadMessage && !JSON.parse(hasUserReadMessage)[id]) {
      setHasRead(false);
    }
  }, []);
  return (
    <div
      className={styles['user-message']}
      style={
        hasRead
          ? {
              transform: 'translateY(-100%)',
              opacity: '0',
              pointerEvents: 'none',
            }
          : {
              transform: 'translateY(0)',
              opacity: '100%',
              pointerEvents: 'all',
            }
      }
    >
      <div className={styles['user-message-text']}>{children}</div>
      <div
        className={styles['close-user-message-button']}
        onClick={() => {
          setHasRead(true);
          const userMessage = {};
          userMessage[id] = true;
          const previouslyReadMessages = localStorage.getItem(
            'read-user-message'
          )
            ? JSON.parse(localStorage.getItem('read-user-message'))
            : {};
          localStorage.setItem(
            'read-user-message',
            JSON.stringify({
              ...previouslyReadMessages,
              ...userMessage,
            })
          );
        }}
        onMouseEnter={() => setCursorType('pointer')}
        onMouseLeave={() => setCursorType('default')}
      >
        &times;
      </div>
    </div>
  );
}

export default UserMessage;
