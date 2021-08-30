import styles from '../styles/CreateAssignment.module.css';
import classNames from 'classnames';
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
          <div className={styles['question-index']}>{index + 1}</div>
          <input
            id="question-text"
            value={question.question}
            type="text"
            required
            className={styles['assignment-input']}
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
            placeholder="Question"
          />
        </div>
        <div className={styles['answer-container']}>
          {question.options.map((option, i) => (
            <input
              key={i}
              id="answer-text"
              value={option.name}
              type="text"
              required
              className={classNames(
                styles['assignment-input'],
                styles['option-input']
              )}
              placeholder={`Option ${i + 1}`}
              onInput={(e) => {
                const currentOption = e.currentTarget.value;
                const question = assignment.questions.find(
                  (_q, i) => i === index
                );
                setAssignment({
                  ...assignment,
                  questions: [
                    ...assignment.questions.filter((_q, i) => i !== index),
                    {
                      ...question,
                      options: [
                        ...question.options.filter((_o, index) => index !== i),
                        {
                          ...question.options.find((_o, index) => index === i),
                          name: currentOption,
                        },
                      ],
                    },
                  ],
                });
                setShowSavedAlert(false);
              }}
            />
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
                ...assignment.questions.filter((q, i) => i !== index),
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
