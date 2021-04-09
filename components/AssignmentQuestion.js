import styles from '../styles/CreateAssignment.module.css';
import FormLabel from './FormLabel';

function AssignmentQuestion({ question }) {
    return (
        <div className={styles.question}>
            <div className={styles['question-container']}>
                <FormLabel
                    initialValue={question.question}
                    id="question-text"
                    type="text"
                >
                    Question
                </FormLabel>
            </div>
            <div className={styles['answer-container']}>
                <FormLabel
                    initialValue={question.answer}
                    id="answer-text"
                    type="text"
                >
                    Answer
                </FormLabel>
            </div>
        </div>
    );
}

export default AssignmentQuestion;
