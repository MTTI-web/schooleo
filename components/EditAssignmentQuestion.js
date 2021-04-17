import styles from '../styles/CreateAssignment.module.css';
import FormLabel from './FormLabel';
import { FaTrash } from 'react-icons/fa';
import { useGlobalContext } from './context';

function AssignmentQuestion({
    question,
    setAssignment,
    assignment,
    index,
    setShowSavedAlert,
}) {
    const { setCursorType } = useGlobalContext();
    return (
        <div className={styles.question}>
            <div className={styles['question-column']}>
                <div className={styles['question-container']}>
                    <FormLabel
                        initialValue={question.question}
                        id="question-text"
                        type="text"
                        onInput={(e) => {
                            const questionText = e.currentTarget.value;
                            setAssignment({
                                ...assignment,
                                questions: [
                                    ...assignment.questions.filter(
                                        (question) => question.index !== index
                                    ),
                                    {
                                        ...assignment.questions.find(
                                            (question) =>
                                                question.index === index
                                        ),
                                        question: questionText,
                                    },
                                ],
                            });
                            setShowSavedAlert(false);
                        }}
                    >
                        Question
                    </FormLabel>
                </div>
                <div className={styles['answer-container']}>
                    <FormLabel
                        initialValue={question.answer}
                        id="answer-text"
                        type="text"
                        onInput={(e) => {
                            const answerText = e.currentTarget.value;
                            setAssignment({
                                ...assignment,
                                questions: [
                                    ...assignment.questions.filter(
                                        (question) => question.index !== index
                                    ),
                                    {
                                        ...assignment.questions.find(
                                            (question) =>
                                                question.index === index
                                        ),
                                        answer: answerText,
                                    },
                                ],
                            });
                            setShowSavedAlert(false);
                        }}
                    >
                        Answer
                    </FormLabel>
                </div>
            </div>
            <div className={styles['options-column']}>
                <div
                    className={styles['delete-question-button']}
                    onMouseEnter={() => setCursorType('pointer')}
                    onMouseLeave={() => setCursorType('default')}
                    onClick={() => {
                        const newAssignment = {
                            ...assignment,
                            questions: [
                                ...assignment.questions.slice(0, index),
                                ...assignment.questions.slice(index + 1),
                            ],
                        };
                        console.log(newAssignment);
                        setAssignment(newAssignment);
                    }}
                >
                    <FaTrash />
                </div>
            </div>
        </div>
    );
}

export default AssignmentQuestion;
