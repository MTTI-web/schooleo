import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../components/context';
import styles from '../styles/Settings.module.css';
import Head from 'next/head';
import classNames from 'classnames';
import fetchAPI from '../utils/fetchAPI';

function Settings() {
  const { user, setUser, setUserCursorType, userCursorType } =
    useGlobalContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const saveSettings = async (settings) => {
    const apiData = await fetchAPI({
      url: '/settings/update',
      body: {
        email: user.email,
        userType: user.userType,
        newSettings: settings,
      },
      method: 'post',
    });
    if (apiData.success) {
      setUser(apiData.user);
    }
  };

  useEffect(async () => {
    if (!user) {
      router.replace('/');
      return;
    }
    if (!user.settings) {
      setLoading(true);
      const apiData = await fetchAPI({
        url: '/settings/update',
        body: {
          userType: user.userType,
          email: user.email,
          newSettings: { isDeveloper: false, cursorType: 'default' },
        },
        method: 'post',
      });
      if (apiData.success) {
        setUser(apiData.user);
      }
      setLoading(false);
    } else if (user.settings.cursorType === undefined) {
      setLoading(true);
      const apiData = await fetchAPI({
        url: '/settings/update',
        body: {
          userType: user.userType,
          email: user.email,
          newSettings: { cursorType: 'default' },
        },
        method: 'post',
      });
      if (apiData.success) {
        setUser(apiData.user);
      }
      setLoading(false);
    } else if (user.settings.isDeveloper === undefined) {
      setLoading(true);
      const apiData = await fetchAPI({
        url: '/settings/update',
        body: {
          userType: user.userType,
          email: user.email,
          newSettings: { isDeveloper: false },
        },
        method: 'post',
      });
      if (apiData.success) {
        setUser(apiData.user);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);
  return (
    <section className={styles['settings-section']}>
      <Head>
        <title>Settings • Schooleo</title>
      </Head>
      <h1 className={styles['settings-section-heading']}>Settings</h1>
      {!loading && (
        <>
          <div className={classNames(styles.setting, styles.small)}>
            <div className={styles['setting-heading']}>Change Cursor</div>
            <div className={styles['setting-options']}>
              <SettingOption
                selected={
                  user.settings
                    ? user.settings.cursorType
                      ? user.settings.cursorType === 'default'
                      : true
                    : true
                }
                onClick={async () => {
                  if (user.settings.cursorType !== 'default') {
                    await saveSettings({ cursorType: 'default' });
                  }
                }}
              >
                Default
              </SettingOption>
              <SettingOption
                selected={
                  user.settings
                    ? user.settings.cursorType
                      ? user.settings.cursorType === 'custom'
                      : false
                    : false
                }
                onClick={async () => {
                  if (user.settings.cursorType !== 'custom') {
                    await saveSettings({ cursorType: 'custom' });
                  }
                }}
              >
                Custom
              </SettingOption>
            </div>
          </div>
          <div className={classNames(styles.setting, styles.small)}>
            <div className={styles['setting-heading']}>Developer Mode</div>
            <div className={styles['setting-options']}>
              <SettingOption
                onClick={async () => {
                  if (!user.settings.isDeveloper) {
                    await saveSettings({ isDeveloper: true });
                  }
                }}
                selected={
                  user.settings
                    ? user.settings.isDeveloper
                      ? user.settings.isDeveloper === true
                      : false
                    : false
                }
              >
                On
              </SettingOption>
              <SettingOption
                onClick={async () => {
                  if (user.settings.isDeveloper) {
                    await saveSettings({ isDeveloper: false });
                  }
                }}
                selected={
                  user.settings
                    ? user.settings.isDeveloper
                      ? user.settings.isDeveloper === false
                      : true
                    : true
                }
              >
                Off
              </SettingOption>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

const SettingOption = ({ selected, children, onClick }) => {
  return (
    <div
      className={styles['setting-option']}
      style={
        selected
          ? { backgroundColor: '#0db8d9', color: '#000', fontWeight: '500' }
          : {}
      }
      onClick={() => onClick()}
    >
      {children}
    </div>
  );
};

export default Settings;
