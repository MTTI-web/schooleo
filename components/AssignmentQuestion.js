import styles from '../styles/CreateAssignment.module.css';
import FormLabel from './FormLabel';

function AssignmentQuestion({ question, setAssignment, assignment, index }) {
    return (
        <div className={styles.question}>
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
                                        (question) => question.index === index
                                    ),
                                    question: questionText,
                                },
                            ],
                        });
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
                                        (question) => question.index === index
                                    ),
                                    answer: answerText,
                                },
                            ],
                        });
                    }}
                >
                    Answer
                </FormLabel>
            </div>
        </div>
    );
}

export default AssignmentQuestion;
