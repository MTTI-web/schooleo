import { useEffect, useState } from 'react';
import styles from '../styles/InAppNotification.module.css';
import { useGlobalContext } from './context';

function InAppNotification() {
  const { notification, showNotification, log } = useGlobalContext();
  const [currentNotif, setCurrentNotif] = useState(null);

  useEffect(() => {
    if (notification) {
      setCurrentNotif(notification.content);
    }
  }, [notification]);

  useEffect(() => {
    log(currentNotif);
  }, [currentNotif]);
  return (
    <div
      className={styles['in-app-notification']}
      style={{
        opacity: notification ? '100%' : '0',
        transform: notification ? 'translateY(0)' : 'translateY(10px)',
        pointerEvents: notification ? 'all' : 'none',
      }}
    >
      <div className={styles['notification-content']}>{currentNotif}</div>
      <div
        className={styles['close-notification-button']}
        onClick={() => showNotification(null)}
      >
        &times;
      </div>
    </div>
  );
}

export default InAppNotification;
