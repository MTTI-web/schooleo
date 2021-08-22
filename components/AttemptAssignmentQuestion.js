import styles from '../styles/CreateAssignment.module.css';
import FormLabel from './FormLabel';
import { FaTrash } from 'react-icons/fa';
import { useGlobalContext } from './context';

function AttemptAssignmentQuestion({
  question,
  setAssignment,
  assignment,
  index,
}) {
  const { setCursorType, log } = useGlobalContext();
  return (
    <div className={styles.question}>
      <div className={styles['question-column']}>
        <div className={styles['attempt-question-container']}>
          {question.question}
        </div>
        <div className={styles['answer-container']}>
          <FormLabel
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
            log(newAssignment);
            setAssignment(newAssignment);
          }}
        >
          <FaTrash />
        </div>
      </div>
    </div>
  );
}

export default AttemptAssignmentQuestion;
