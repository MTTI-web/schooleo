import styles from '../../styles/ClassroomStream.module.css';
import { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useGlobalContext } from '../context';
import Send from '../../public/icons/send.svg';
import fetchAPI from '../../utils/fetchAPI';
import { useRouter } from 'next/router';

// const socket = io.connect('http://localhost:4000');

function ClassroomStream({ classroom }) {
  const { setCursorType, user, setUser } = useGlobalContext();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputElement = e.currentTarget.messageInput;
    console.log(`Message is: ${inputElement.value}`);
    const newMessage = {
      author: user.username,
      message: inputElement.value,
      time: Date.now(),
    };
    setLoading(true);
    const apiData = await fetchAPI({
      url: '/class/stream/add_message',
      method: 'post',
      body: {
        classroomID: classroom._id,
        newMessage,
      },
    });
    setLoading(false);
    console.log('API Data:', apiData);
    if (apiData.success) {
      setMessages([...apiData.stream]);
      setUser({ ...user, stream: apiData.stream });
    } else console.log('Could not send message.');
    inputElement.value = '';
    const messagesContainer = document.querySelector('#messages');
    messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
  };
  useEffect(() => {
    setLoading(true);
    // let apiData = {};
    // if (user.userType === 'student') {
    //   apiData = await fetchAPI({
    //     url: '/class/stream/get_messages',
    //     method: 'post',
    //     body: {
    //       teacherEmail: classroom.teacherEmail,
    //       classroomID: classroom.creationTime,
    //     },
    //   });
    // } else {
    //   apiData = await fetchAPI({
    //     url: '/class/stream/get_messages',
    //     method: 'post',
    //     body: {
    //       teacherEmail: user.email,
    //       classroomID: classroom.creationTime,
    //     },
    //   });
    // }
    // if (apiData.success) setMessages(apiData.stream);
    setMessages(classroom.stream);
    setLoading(false);
    setLoading(false);
    const messagesContainer = document.querySelector('#messages');
    messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
  }, []);
  return (
    <div className={styles['classroom-stream']}>
      <div
        className={styles.messages}
        id="messages"
        style={
          loading
            ? { justifyContent: 'center', alignItems: 'center' }
            : { justifyContent: 'normal', alignItems: 'normal' }
        }
      >
        {messages.length ? (
          messages.map(({ author, message, time }, index) => (
            <div className={styles.message} key={index}>
              <div className={styles['message-header']}>
                <div className={styles['message-author']}>{author}</div>
                <div className={styles['message-time']}>
                  {Date.now() - time > 24 * 60 * 60 * 1000
                    ? new Date(time).toLocaleDateString()
                    : new Date(time).toLocaleTimeString()}
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
