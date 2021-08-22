import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../../components/context';
import NoQuestionsMessage from '../../../../../components/NoQuestionsMessage';
import styles from '../../../../../styles/CreateAssignment.module.css';
import CreateButton from '../../../../../components/CreateButton';
import AssignmentQuestion from '../../../../../components/EditAssignmentQuestion';
import Loader from '../../../../../components/Loader';
import fetchAPI from '../../../../../utils/fetchAPI';
import { FaCheck, FaSave } from 'react-icons/fa';

function CreateAssignment() {
  const { user, setCursorType, log, showNotification } = useGlobalContext();
  const router = useRouter();
  const [assignment, setAssignment] = useState({});
  const [loading, setLoading] = useState(true);
  const [classroom, setClassroom] = useState(null);
  const [showSavedAlert, setShowSavedAlert] = useState(true);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  useEffect(async () => {
    if (!user) {
      router.replace('/');
      return;
    }
    setLoading(true);
    const classData = await fetchAPI({
      url: '/class/get_classroom_details',
      method: 'post',
      body: {
        classroomID: router.query.id,
      },
    });
    log('Class data:', classData);
    if (classData.success) {
      setClassroom(classData.classroom);
      log('New classroom details set:', classData.classroom);
      setAssignment(
        classData.classroom.assignments.find(
          ({ creationTime }) =>
            creationTime === parseInt(router.query.assignmentID)
        )
      );
    } else {
      log('Could not find details for the given class.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    log('Assignment updated', assignment);
  }, [assignment]);

  const handleCreateQuestionButtonClick = () => {
    setShowSavedAlert(false);
    const newQuestion = {
      question: '',
      answer: '',
      index: assignment.questions.length,
    };
    log('New question:', newQuestion);
    setAssignment({
      ...assignment,
      questions: [...assignment.questions, newQuestion],
    });
  };
  return (
    <section
      className={styles['create-assignment-section']}
      style={
        user && user.settings
          ? user.settings.cursorType === 'default'
            ? { cursor: 'auto' }
            : { cursor: 'none' }
          : { cursor: 'auto' }
      }
    >
      <Head>
        <title>
          {loading ? 'Loading...' : `${assignment.name} • Schooleo`}
        </title>
      </Head>
      {!loading ? (
        <form
          className={styles['questions-form']}
          onSubmit={async (e) => {
            e.preventDefault();
            setShowSavedAlert(true);
            setIsSaveLoading(true);
            const apiData = await fetchAPI({
              url: '/class/assignment/update',
              method: 'post',
              body: {
                assignment,
                classroomID: classroom._id,
                assignmentID: assignment.creationTime,
              },
            });
            setIsSaveLoading(false);
            showNotification('Changes to this assignment are saved.');
            log('Assignment save data:', apiData);
          }}
        >
          <div className={styles['assignment-name-container']}>
            <div
              className={styles['back-to-classroom-button']}
              onClick={() => router.replace(`/classroom/${classroom._id}`)}
            >
              ←
            </div>
            <input
              type="text"
              name="assignmentName"
              id="assignmentName"
              value={assignment.name}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              onInput={(e) => {
                setAssignment({
                  ...assignment,
                  name: e.currentTarget.value,
                });
                setShowSavedAlert(false);
              }}
            />
          </div>
          {assignment.questions?.length ? (
            assignment.questions.map((question, index) => (
              <AssignmentQuestion
                question={question}
                key={index}
                index={index}
                setAssignment={setAssignment}
                assignment={assignment}
                setShowSavedAlert={setShowSavedAlert}
              />
            ))
          ) : (
            <NoQuestionsMessage handleClick={handleCreateQuestionButtonClick} />
          )}
          <button
            type="submit"
            className={styles['save-button']}
            onMouseOver={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            onClick={() => setShowSavedAlert(true)}
          >
            <div className={styles['saved-alert']}>
              {showSavedAlert ? 'Saved' : 'Not Saved'}
            </div>
            {isSaveLoading ? (
              <Loader />
            ) : showSavedAlert ? (
              <FaCheck />
            ) : (
              <FaSave />
            )}
          </button>
        </form>
      ) : (
        <Loader />
      )}

      <CreateButton handleClick={handleCreateQuestionButtonClick} />
    </section>
  );
}

export default CreateAssignment;
