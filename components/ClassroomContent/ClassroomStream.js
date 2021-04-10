import styles from '../../styles/ClassroomStream.module.css';
import { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useGlobalContext } from '../context';
import Loader from '../Loader';
import fetchAPI from '../../utils/fetchAPI';
import { useRouter } from 'next/router';

// const socket = io.connect('http://localhost:4000');

function ClassroomStream({ classroom }) {
    const { setCursorType, user } = useGlobalContext();
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
        let apiData = {};
        if (user.userType === 'student') {
            apiData = await fetchAPI({
                url: '/class/stream/add_message',
                method: 'post',
                body: {
                    teacherEmail: classroom.teacherEmail,
                    classroomID: classroom.creationTime,
                    newMessage,
                },
            });
        } else {
            apiData = await fetchAPI({
                url: '/class/stream/add_message',
                method: 'post',
                body: {
                    teacherEmail: user.email,
                    classroomID: classroom.creationTime,
                    newMessage,
                },
            });
        }
        setLoading(false);
        console.log('API Data:', apiData);
        if (apiData.success) {
            setMessages([...apiData.stream]);
        } else console.log('Could not send message.');
        inputElement.value = '';
        const messagesContainer = document.querySelector('#messages');
        messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
    };
    useEffect(async () => {
        setLoading(true);
        let apiData = {};
        if (user.userType === 'student') {
            apiData = await fetchAPI({
                url: '/class/stream/get_messages',
                method: 'post',
                body: {
                    teacherEmail: classroom.teacherEmail,
                    classroomID: classroom.creationTime,
                },
            });
        } else {
            apiData = await fetchAPI({
                url: '/class/stream/get_messages',
                method: 'post',
                body: {
                    teacherEmail: user.email,
                    classroomID: classroom.creationTime,
                },
            });
        }
        setLoading(false);
        if (apiData.success) setMessages(apiData.stream);
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
                {loading ? (
                    <Loader />
                ) : (
                    messages.map(({ author, message, time }, index) => (
                        <div className={styles.message} key={index}>
                            <div className={styles['message-header']}>
                                <div className={styles['message-author']}>
                                    {author}
                                </div>

                                <div className={styles['message-time']}>
                                    {Date.now() - time > 24 * 60 * 60 * 1000
                                        ? new Date(time).toLocaleDateString()
                                        : new Date(time).toLocaleTimeString()}
                                </div>
                            </div>
                            <div className={styles['message-text']}>
                                {message}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <form
                className={styles['message-entry-form']}
                onSubmit={handleSubmit}
            >
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
                    <FaPaperPlane />
                </button>
            </form>
        </div>
    );
}

export default ClassroomStream;
