import styles from '../../styles/ClassroomStream.module.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useGlobalContext } from '../context';

// const socket = io.connect('http://localhost:5000');

function ClassroomStream() {
    const { setCursorType } = useGlobalContext();
    const [messages, setMessages] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
    };
    useEffect(() => {}, []);
    return (
        <div className={styles['classroom-stream']}>
            <div className={styles.messages}>
                {messages.map(({ author, message }) => (
                    <div className={styles.message}>
                        <div className={styles['message-author']}>{author}</div>
                        <div className={styles['message-text']}>{message}</div>
                    </div>
                ))}
            </div>
            <form
                className={styles['message-entry-form']}
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="message-input"
                    id="message-input"
                    onMouseOver={() => setCursorType('pointer')}
                    onMouseLeave={() => setCursorType('default')}
                />
                <button
                    type="submit"
                    onMouseOver={() => setCursorType('pointer')}
                    onMouseLeave={() => setCursorType('default')}
                >
                    <FaPaperPlane />
                </button>
            </form>
        </div>
    );
}

export default ClassroomStream;
