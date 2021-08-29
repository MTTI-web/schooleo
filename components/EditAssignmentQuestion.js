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
  const { setCursorType, log } = useGlobalContext();
  return (
    <div className={styles.question}>
      <div className={styles['question-column']}>
        <div className={styles['question-container']}>
          <div className={styles['add-option-button']}>+</div>
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
              setShowSavedAlert(false);
            }}
          >
            Question
          </FormLabel>
        </div>
        <div className={styles['answer-container']}>
          {question.options.map((option, i) => (
            <FormLabel
              initialValue=""
              style={{
                height: '40px',
                marginTop: '20px',
              }}
              inputStyle={{
                border: 'none',
                borderBottom: '1.5px solid #0ff',
                borderRadius: '0',
                fontSize: '0.8rem',
                paddingBottom: '3px',
                paddingLeft: '7px',
              }}
              labelStyle={{ left: '2px' }}
              id="answer-text"
              type="text"
              onInput={(e) => {
                const currentOption = e.currentTarget.value;
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
                      options: [
                        ...assignment.questions
                          .find((question) => question.index === index)
                          .options.filter((o) => o.index !== i),
                        {
                          ...assignment.questions
                            .find((question) => question.index === index)
                            .options.find((o) => o.index === i),
                          name: currentOption,
                        },
                      ],
                    },
                  ],
                });
                setShowSavedAlert(false);
              }}
            >
              Option {i + 1}
            </FormLabel>
          ))}
        </div>
      </div>
      <div className={styles['options-column']}>
        <div
          className={styles['question-option']}
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
          style={{ fontSize: '1.5rem' }}
          onClick={() => {
            const question = assignment.questions.find(
              (q) => q.index === index
            );
            const newAssignment = {
              ...assignment,
              questions: [
                ...assignment.questions.filter((q) => q.index !== index),
                {
                  ...question,
                  options: [
                    ...question.options,
                    { name: '', index: question.options.length },
                  ],
                },
              ],
            };
            log(newAssignment);
            setAssignment(newAssignment);
          }}
        >
          +
        </div>
        <div
          className={styles['question-option']}
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

export default AssignmentQuestion;
