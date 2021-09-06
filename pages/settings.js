import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../components/context';
import styles from '../styles/Settings.module.css';
import Head from 'next/head';
import classNames from 'classnames';
import Loader from '../components/Loader';
import fetchAPI from '../utils/fetchAPI';

function Settings() {
  const { user, setUser, showNotification } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const saveSettings = async (settings) => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(async () => {
    if (!user) {
      router.replace('/classrooms');
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
    } else if (user.settings.clickAnimation === undefined) {
      setLoading(true);
      const apiData = await fetchAPI({
        url: '/settings/update',
        body: {
          userType: user.userType,
          email: user.email,
          newSettings: { clickAnimation: false },
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
    user && (
      <section
        className={styles['settings-section']}
        style={
          user && user.settings
            ? user.settings.cursorType === 'default'
              ? { cursor: 'auto' }
              : { cursor: 'none' }
            : { cursor: 'auto' }
        }
      >
        <Head>
          <title>Settings • Schooleo</title>
        </Head>
        <h1 className={styles['settings-section-heading']}>Settings</h1>
        <div
          className={styles['loading-screen']}
          style={
            loading
              ? { opacity: '100%', pointerEvents: 'all' }
              : { opacity: '0', pointerEvents: 'none' }
          }
        >
          <Loader />
        </div>
        <>
          <div
            className={classNames(styles.setting, styles.small)}
            onAnimationEnd={(e) => (e.currentTarget.style.opacity = '100%')}
            style={{ animationDelay: '0.1s' }}
          >
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
                    showNotification('Default cursor enabled.');
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
                    showNotification('Custom cursor enabled.');
                  }
                }}
              >
                Custom
              </SettingOption>
            </div>
          </div>
          <div
            className={classNames(styles.setting, styles.small)}
            onAnimationEnd={(e) => (e.currentTarget.style.opacity = '100%')}
            style={{ animationDelay: '0.2s' }}
          >
            <div className={styles['setting-heading']}>Developer Mode</div>
            <div className={styles['setting-options']}>
              <SettingOption
                onClick={async () => {
                  if (!user.settings.isDeveloper) {
                    await saveSettings({ isDeveloper: true });
                    showNotification('Developer Mode turned on.');
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
                    showNotification('Developer Mode turned off.');
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
          <div
            className={classNames(styles.setting, styles.small)}
            onAnimationEnd={(e) => (e.currentTarget.style.opacity = '100%')}
            style={{ animationDelay: '0.3s' }}
          >
            <div className={styles['setting-heading']}>Click Animation</div>
            <div className={styles['setting-options']}>
              <SettingOption
                onClick={async () => {
                  if (!user.settings.clickAnimation) {
                    await saveSettings({ clickAnimation: true });
                    showNotification('Click animation enabled.');
                  }
                }}
                selected={
                  user.settings
                    ? user.settings.clickAnimation
                      ? user.settings.clickAnimation === true
                      : false
                    : false
                }
              >
                On
              </SettingOption>
              <SettingOption
                onClick={async () => {
                  if (user.settings.clickAnimation) {
                    await saveSettings({ clickAnimation: false });
                    showNotification('Click animation disabled.');
                  }
                }}
                selected={
                  user.settings
                    ? user.settings.clickAnimation
                      ? user.settings.clickAnimation === false
                      : true
                    : true
                }
              >
                Off
              </SettingOption>
            </div>
          </div>
        </>
      </section>
    )
  );
}

const SettingOption = ({ selected, children, onClick }) => {
  const { setCursorType } = useGlobalContext();
  return (
    <div
      className={styles['setting-option']}
      style={selected ? { backgroundColor: '#00ffff20', color: '#00ffff' } : {}}
      onMouseEnter={() => setCursorType('pointer')}
      onMouseLeave={() => setCursorType('default')}
      onClick={() => onClick()}
    >
      {children}
    </div>
  );
};

export default Settings;
