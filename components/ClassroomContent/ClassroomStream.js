import styles from '../../styles/ClassroomStream.module.css';
import { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context';
import Send from '../../public/icons/send.svg';
import fetchAPI from '../../utils/fetchAPI';
import isDateInPast from '../../utils/isDateInPast';
import { io } from 'socket.io-client';

function ClassroomStream({ classroom }) {
  const { setCursorType, user, setUser } = useGlobalContext();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputElement = e.currentTarget.messageInput;
    if (!inputElement.value.trimStart().trimEnd()) return;
    console.log(`Message is: ${inputElement.value}`);
    const newMessage = {
      author: user.username,
      message: inputElement.value,
      time: Date.now(),
    };
    if (!socket) return;
    socket.emit('send_message', {
      message: newMessage,
      classroomID: classroom._id,
    });
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
    // console.log('API Data:', apiData);
    // if (apiData.success) {
    //   setMessages([...apiData.stream]);
    // } else console.log('Could not send message.');
    inputElement.value = '';
    const messagesContainer = document.querySelector('#messages');
    messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('connected', (message) => {
      console.log(message);
    });

    socket.emit('add_user', {
      classroomID: classroom._id,
      userID: user._id,
    });

    socket.on('receive_message', ({ message }) => {
      console.log('Message:', message);
      setArrivalMessage(message);
    });
  }, [socket, user]);

  useEffect(() => {
    setMessages(classroom.stream);
    setSocket(io('http://localhost:5000'));
    return () => {
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages([...messages, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    console.log('Current messages:', messages);
  }, [messages]);

  useEffect(() => {
    const messagesContainer = document.querySelector('#messages');
    messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
  }, [messages]);

  useEffect(() => {
    console.log('Loading?', loading);
  }, [loading]);

  return (
    <div className={styles['classroom-stream']}>
      <div className={styles.messages} id="messages">
        {messages.length ? (
          messages.map(({ author, message, time }, index) => (
            <div className={styles.message} key={index}>
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
