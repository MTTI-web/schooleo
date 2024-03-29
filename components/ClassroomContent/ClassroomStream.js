import styles from '../../styles/ClassroomStream.module.css';
import { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context';
import Send from '../../public/icons/send.svg';
import isDateInPast from '../../utils/isDateInPast';
import { io } from 'socket.io-client';
import getApiUrl from '../../utils/getApiUrl';

function ClassroomStream({ classroom, open }) {
  const { setCursorType, user, log, showNotification } = useGlobalContext();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const sendNotification = (content = '') => {
    log(`Notification to send: ${content}`);
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications.');
    }
  };

  const handleSubmit = async (e) => {
    log(e);
    e.preventDefault();
    e.stopPropagation();
    const inputElement = e.currentTarget.messageInput;
    const messageContent = inputElement.value.trimStart().trimEnd();
    if (!messageContent) return;
    if (messageContent.split('').length > 50) {
      return showNotification(
        'Message cannot be more than 50 characters long.'
      );
    }
    log(`Message is: ${messageContent}`);
    const newMessage = {
      author: user.username,
      message: messageContent,
      time: Date.now(),
    };
    if (!socket) return;
    socket.emit('send_message', {
      message: newMessage,
      classroomID: classroom._id,
    });
    sendNotification('Hello');
    setLoading(true);
    // setLoading(true);
    // const apiData = await fetchAPI({
    //   url: '/class/stream/add_message',
    //   method: 'post',
    //   body: {
    //     classroomID: classroom._id,
    //     newMessage,
    //   },
    // });
    // setLoading(false);
    // log('API Data:', apiData);
    // if (apiData.success) {
    //   setMessages([...apiData.stream]);
    // } else log('Could not send message.');
    inputElement.value = '';
    const messagesContainer = document.querySelector('#messages');
    messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
  };

  useEffect(() => {
    log('Socket:', socket);
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on('connected', (message) => {
      log(message);
    });

    socket.emit('add_user', {
      classroomID: classroom._id,
      userID: user._id,
    });

    socket.on('receive_message', ({ message }) => {
      log('Message:', message);
      setArrivalMessage(message);
      setLoading(false);
    });
  }, [socket, user]);

  useEffect(() => {
    setMessages(classroom.stream);
    setSocket(io(getApiUrl()));
    return () => {
      if (socket) {
        socket.disconnect();
        socket.off();
      }
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages([...messages, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    log('Current messages:', messages);
  }, [messages]);

  useEffect(() => {
    const messagesContainer = document.querySelector('#messages');
    messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
  }, [messages]);

  useEffect(() => {
    log('Loading?', loading);
  }, [loading]);

  return (
    <div
      className={styles['classroom-stream']}
      style={
        open
          ? { opacity: '100%', pointerEvents: 'all' }
          : { opacity: '0', pointerEvents: 'none' }
      }
    >
      <div className={styles.messages} id="messages">
        {messages.length ? (
          messages.map(({ author, message, time }, index) => (
            <div className={styles.message} key={index}>
              <div className={styles['message-author-dp']}>
                {author.split('')[0]}
              </div>
              <div className="message-content">
                <div className={styles['message-header']}>
                  <div className={styles['message-author']}>{author}</div>
                  <div className={styles['message-time']}>
                    {isDateInPast(time)
                      ? new Date(time).toLocaleDateString()
                      : `${
                          new Date(time).getHours() > 12
                            ? new Date(time).getHours() - 12
                            : new Date(time).getHours()
                        }:${new Date(time).getMinutes()} ${
                          new Date(time).getHours() > 12 ? 'pm' : 'am'
                        }`}
                  </div>
                </div>
                <div className={styles['message-text']}>{message}</div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles['no-message']}>No messages :/</div>
        )}
      </div>
      <form className={styles['message-entry-form']} onSubmit={handleSubmit}>
        <input
          type="text"
          name="messageInput"
          id="messageInput"
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
          autoComplete="off"
          placeholder="Post a message..."
        />
        <button
          type="submit"
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
        >
          {loading ? <Loader /> : <Send />}
        </button>
      </form>
    </div>
  );
}

const Loader = () => {
  return (
    <div className={styles['send-message-loader']}>
      <div className={styles['loader-ring']}></div>
    </div>
  );
};

export default ClassroomStream;
