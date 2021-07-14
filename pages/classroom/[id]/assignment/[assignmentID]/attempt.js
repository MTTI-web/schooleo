import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../../components/context';
import NoQuestionsMessage from '../../../../../components/NoQuestionsMessage';
import styles from '../../../../../styles/CreateAssignment.module.css';
import AssignmentQuestion from '../../../../../components/AttemptAssignmentQuestion';
import Loader from '../../../../../components/Loader';
import fetchAPI from '../../../../../utils/fetchAPI';
import { FaCheck, FaSave } from 'react-icons/fa';

function CreateAssignment() {
  const { user, setCursorType } = useGlobalContext();
  const router = useRouter();
  const [assignment, setAssignment] = useState({});
  const [loading, setLoading] = useState(true);
  const [classroom, setClassroom] = useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  useEffect(async () => {
    if (!user) {
      router.replace('/');
      return;
    } else if (user && user.userType === 'teacher') {
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
    console.log('Class data:', classData);
    if (classData.success) {
      setClassroom(classData.classroom);
      console.log('New classroom details set:', classData.classroom);
      setAssignment(
        classData.classroom.assignments.find(
          ({ creationTime }) =>
            creationTime === parseInt(router.query.assignmentID)
        )
      );
    } else {
      console.log('Could not find details for the given class.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log('Assignment updated', assignment);
  }, [assignment]);
  return (
    <section className={styles['create-assignment-section']}>
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
            console.log('Assignment save data:', apiData);
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
