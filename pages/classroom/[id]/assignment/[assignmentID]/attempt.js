import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../../components/context';
import NoQuestionsMessage from '../../../../../components/NoQuestionsMessage';
import styles from '../../../../../styles/CreateAssignment.module.css';
import AssignmentQuestion from '../../../../../components/AttemptAssignmentQuestion';
import Loader from '../../../../../components/Loader';
import fetchAPI from '../../../../../utils/fetchAPI';

function CreateAssignment() {
  const { user, setCursorType, log } = useGlobalContext();
  const router = useRouter();
  const [assignment, setAssignment] = useState({});
  const [loading, setLoading] = useState(true);
  const [classroom, setClassroom] = useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  useEffect(async () => {
    if (!user) {
      router.replace('/');
      return;
    } else if (user && user.userType === 'student') {
      router.replace('/');
      return;
    }
    setLoading(true);
    const classData = await fetchAPI({
      url: '/class/assignment/get_details',
      method: 'post',
      body: {
        assignmentID: router.query.assignmentID,
      },
    });
    log('Class data:', classData);
    if (classData.success) {
      setAssignment(classData.assignment);
    } else {
      log('Could not find details for the given class.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    log('Assignment updated', assignment);
  }, [assignment]);
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
            setIsSubmitLoading(true);
            const apiData = await fetchAPI({
              url: '/class/assignment/update',
              method: 'post',
              body: {
                assignment,
                teacherEmail:
                  user.userType === 'teacher'
                    ? user.email
                    : classroom.teacherEmail,
                classroomID: classroom.creationTime,
                assignmentID: assignment.creationTime,
              },
            });
            setIsSubmitLoading(false);
            log('Assignment save data:', apiData);
          }}
        >
          <div className={styles['assignment-name-container']}>
            <div className={styles['attempt-assignment-name']}>
              {assignment.name}
            </div>
          </div>
          {assignment.questions?.length ? (
            assignment.questions.map((question, index) => (
              <AssignmentQuestion
                question={question}
                key={index}
                index={index}
                setAssignment={setAssignment}
                assignment={assignment}
              />
            ))
          ) : (
            <>
              <NoQuestionsMessage />
              <button
                type="submit"
                className={styles['submit-assignment-button']}
                disabled={isSubmitLoading}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
              >
                {isSubmitLoading ? 'Submitting...' : 'Submit'}
              </button>
            </>
          )}
        </form>
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default CreateAssignment;
