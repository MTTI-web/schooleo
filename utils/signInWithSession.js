import fetchAPI from './fetchAPI';

const signInWithSession = async (user, setLoadingSession) => {
  if (!user) {
    setLoadingSession(true);
    const userEmailFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    console.log(`User email from Local Storage: ${userEmailFromLocalStorage}`);

    if (userEmailFromLocalStorage) {
      const userData = await fetchAPI({
        url: '/auth/get_user',
        method: 'post',
        body: { email: userEmailFromLocalStorage },
      });
      console.log('User from Local Storage:', userData);
      if (userData && userData.success) {
        setLoadingSession(false);
        return { success: true, user: userData.user };
      } else {
        console.log('Could not find user in DB.');
        setLoadingSession(false);
        return { success: false };
      }
    } else {
      setLoadingSession(false);
      return { success: false };
    }
  } else {
    return { success: false };
  }
};

export default signInWithSession;
