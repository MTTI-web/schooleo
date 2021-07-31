import { useEffect, useState } from 'react';
import styles from '../styles/WelcomeAnimation.module.css';
import { useGlobalContext } from './context';

function WelcomeAnimation() {
  const [visible, setVisible] = useState(true);
  const { user } = useGlobalContext();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={styles['welcome-animation']}
      style={
        !visible
          ? {
              pointerEvents: 'none',
              opacity: '0',
            }
          : null
      }
      style={
        user && user.settings
          ? user.settings.cursorType === 'default'
            ? !visible
              ? { cursor: 'auto', pointerEvents: 'none', opacity: '0' }
              : { cursor: 'auto' }
            : !visible
            ? { cursor: 'none', pointerEvents: 'none', opacity: '0' }
            : { cursor: 'none' }
          : !visible
          ? { cursor: 'auto', pointerEvents: 'none', opacity: '0' }
          : { cursor: 'auto' }
      }
    >
      <svg
        width="324"
        height="51"
        viewBox="0 0 324 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles['app-svg']}
      >
        <mask
          id="path-1-outside-1"
          maskUnits="userSpaceOnUse"
          x="0.423004"
          y="-0.150002"
          width="324"
          height="51"
          fill="black"
        >
          <rect
            fill="white"
            x="0.423004"
            y="-0.150002"
            width="324"
            height="51"
          />
          <path d="M20.948 48.65C17.0913 48.65 13.7763 48.065 11.003 46.895C8.22967 45.725 6.128 44.1867 4.698 42.28C3.268 40.3733 2.50967 38.315 2.423 36.105C2.423 35.715 2.553 35.39 2.813 35.13C3.073 34.87 3.398 34.74 3.788 34.74H9.573C10.093 34.74 10.483 34.8483 10.743 35.065C11.0463 35.2383 11.328 35.5417 11.588 35.975C12.0213 37.4483 13.018 38.6833 14.578 39.68C16.138 40.6767 18.2613 41.175 20.948 41.175C24.0247 41.175 26.343 40.6767 27.903 39.68C29.463 38.64 30.243 37.21 30.243 35.39C30.243 34.1767 29.8313 33.18 29.008 32.4C28.228 31.62 27.0363 30.9483 25.433 30.385C23.873 29.8217 21.533 29.1283 18.413 28.305C13.2997 27.0917 9.55134 25.4883 7.168 23.495C4.828 21.4583 3.658 18.5767 3.658 14.85C3.658 12.3367 4.32967 10.105 5.673 8.155C7.05967 6.205 9.03134 4.66667 11.588 3.54C14.188 2.41333 17.1997 1.85 20.623 1.85C24.1763 1.85 27.253 2.47833 29.853 3.735C32.453 4.99167 34.4247 6.57333 35.768 8.48C37.1547 10.3433 37.8913 12.2067 37.978 14.07C37.978 14.46 37.848 14.785 37.588 15.045C37.328 15.305 37.003 15.435 36.613 15.435H30.568C29.658 15.435 29.0297 15.0233 28.683 14.2C28.423 12.8133 27.5563 11.665 26.083 10.755C24.6097 9.80167 22.7897 9.325 20.623 9.325C18.1963 9.325 16.2897 9.78 14.903 10.69C13.5163 11.6 12.823 12.9217 12.823 14.655C12.823 15.8683 13.1697 16.865 13.863 17.645C14.5563 18.425 15.6397 19.1183 17.113 19.725C18.6297 20.3317 20.7963 21.0033 23.613 21.74C27.4263 22.6067 30.4597 23.5817 32.713 24.665C35.0097 25.7483 36.6997 27.1133 37.783 28.76C38.8663 30.4067 39.408 32.5083 39.408 35.065C39.408 37.8383 38.628 40.265 37.068 42.345C35.5513 44.3817 33.3847 45.9417 30.568 47.025C27.7947 48.1083 24.588 48.65 20.948 48.65Z" />
          <path d="M65.7021 48.65C60.9354 48.65 57.1221 47.3283 54.2621 44.685C51.4454 42.0417 49.9504 38.38 49.7771 33.7L49.7121 31.1L49.7771 28.5C49.9504 23.82 51.4454 20.1583 54.2621 17.515C57.1221 14.8717 60.9354 13.55 65.7021 13.55C69.0821 13.55 71.9421 14.1567 74.2821 15.37C76.6654 16.5833 78.4204 18.0783 79.5471 19.855C80.7171 21.5883 81.3454 23.235 81.4321 24.795C81.4754 25.2283 81.3238 25.5967 80.9771 25.9C80.6738 26.2033 80.3054 26.355 79.8721 26.355H74.1521C73.7188 26.355 73.3721 26.2683 73.1121 26.095C72.8954 25.8783 72.6788 25.5317 72.4621 25.055C71.8121 23.365 70.9454 22.1517 69.8621 21.415C68.8221 20.6783 67.4788 20.31 65.8321 20.31C63.6221 20.31 61.8888 21.025 60.6321 22.455C59.3754 23.8417 58.7038 25.965 58.6171 28.825L58.5521 31.23L58.6171 33.375C58.7904 39.0517 61.1954 41.89 65.8321 41.89C67.5221 41.89 68.8871 41.5217 69.9271 40.785C70.9671 40.0483 71.8121 38.835 72.4621 37.145C72.6788 36.6683 72.8954 36.3433 73.1121 36.17C73.3721 35.9533 73.7188 35.845 74.1521 35.845H79.8721C80.3054 35.845 80.6738 35.9967 80.9771 36.3C81.3238 36.6033 81.4754 36.9717 81.4321 37.405C81.3454 38.9217 80.7388 40.5467 79.6121 42.28C78.4854 44.0133 76.7521 45.5083 74.4121 46.765C72.0721 48.0217 69.1688 48.65 65.7021 48.65Z" />
          <path d="M94.8359 48C94.4026 48 94.0342 47.8483 93.7309 47.545C93.4276 47.2417 93.2759 46.8733 93.2759 46.44V3.41C93.2759 2.93333 93.4276 2.565 93.7309 2.305C94.0342 2.00167 94.4026 1.85 94.8359 1.85H100.621C101.098 1.85 101.466 2.00167 101.726 2.305C102.029 2.565 102.181 2.93333 102.181 3.41V18.23C104.781 15.11 108.291 13.55 112.711 13.55C116.698 13.55 119.883 14.8717 122.266 17.515C124.649 20.115 125.841 23.6683 125.841 28.175V46.44C125.841 46.8733 125.689 47.2417 125.386 47.545C125.126 47.8483 124.758 48 124.281 48H118.431C117.998 48 117.629 47.8483 117.326 47.545C117.023 47.2417 116.871 46.8733 116.871 46.44V28.565C116.871 26.0083 116.243 24.0367 114.986 22.65C113.773 21.22 111.996 20.505 109.656 20.505C107.359 20.505 105.539 21.22 104.196 22.65C102.853 24.08 102.181 26.0517 102.181 28.565V46.44C102.181 46.8733 102.029 47.2417 101.726 47.545C101.466 47.8483 101.098 48 100.621 48H94.8359Z" />
          <path d="M154.04 48.65C148.97 48.65 145.048 47.35 142.275 44.75C139.501 42.1067 138.006 38.51 137.79 33.96L137.725 31.1L137.79 28.24C138.006 23.7333 139.523 20.1583 142.34 17.515C145.156 14.8717 149.056 13.55 154.04 13.55C159.023 13.55 162.923 14.8717 165.74 17.515C168.556 20.1583 170.073 23.7333 170.29 28.24C170.333 28.76 170.355 29.7133 170.355 31.1C170.355 32.4867 170.333 33.44 170.29 33.96C170.073 38.51 168.578 42.1067 165.805 44.75C163.031 47.35 159.11 48.65 154.04 48.65ZM154.04 42.215C156.336 42.215 158.113 41.5 159.37 40.07C160.626 38.5967 161.32 36.4517 161.45 33.635C161.493 33.2017 161.515 32.3567 161.515 31.1C161.515 29.8433 161.493 28.9983 161.45 28.565C161.32 25.7483 160.626 23.625 159.37 22.195C158.113 20.7217 156.336 19.985 154.04 19.985C151.743 19.985 149.966 20.7217 148.71 22.195C147.453 23.625 146.76 25.7483 146.63 28.565L146.565 31.1L146.63 33.635C146.76 36.4517 147.453 38.5967 148.71 40.07C149.966 41.5 151.743 42.215 154.04 42.215Z" />
          <path d="M197.507 48.65C192.437 48.65 188.515 47.35 185.742 44.75C182.968 42.1067 181.473 38.51 181.257 33.96L181.192 31.1L181.257 28.24C181.473 23.7333 182.99 20.1583 185.807 17.515C188.623 14.8717 192.523 13.55 197.507 13.55C202.49 13.55 206.39 14.8717 209.207 17.515C212.023 20.1583 213.54 23.7333 213.757 28.24C213.8 28.76 213.822 29.7133 213.822 31.1C213.822 32.4867 213.8 33.44 213.757 33.96C213.54 38.51 212.045 42.1067 209.272 44.75C206.498 47.35 202.577 48.65 197.507 48.65ZM197.507 42.215C199.803 42.215 201.58 41.5 202.837 40.07C204.093 38.5967 204.787 36.4517 204.917 33.635C204.96 33.2017 204.982 32.3567 204.982 31.1C204.982 29.8433 204.96 28.9983 204.917 28.565C204.787 25.7483 204.093 23.625 202.837 22.195C201.58 20.7217 199.803 19.985 197.507 19.985C195.21 19.985 193.433 20.7217 192.177 22.195C190.92 23.625 190.227 25.7483 190.097 28.565L190.032 31.1L190.097 33.635C190.227 36.4517 190.92 38.5967 192.177 40.07C193.433 41.5 195.21 42.215 197.507 42.215Z" />
          <path d="M227.648 48C227.215 48 226.847 47.8483 226.543 47.545C226.24 47.2417 226.088 46.8733 226.088 46.44V3.41C226.088 2.93333 226.24 2.565 226.543 2.305C226.847 2.00167 227.215 1.85 227.648 1.85H233.043C233.52 1.85 233.888 2.00167 234.148 2.305C234.452 2.565 234.603 2.93333 234.603 3.41V46.44C234.603 46.8733 234.452 47.2417 234.148 47.545C233.888 47.8483 233.52 48 233.043 48H227.648Z" />
          <path d="M262.786 48.65C257.976 48.65 254.141 47.2633 251.281 44.49C248.464 41.6733 246.969 37.73 246.796 32.66L246.731 31.035L246.796 29.41C247.012 24.47 248.529 20.5917 251.346 17.775C254.206 14.9583 258.019 13.55 262.786 13.55C267.899 13.55 271.842 15.11 274.616 18.23C277.432 21.35 278.841 25.51 278.841 30.71V32.075C278.841 32.5083 278.689 32.8767 278.386 33.18C278.082 33.4833 277.692 33.635 277.216 33.635H255.636V34.155C255.722 36.5383 256.372 38.5533 257.586 40.2C258.842 41.8033 260.554 42.605 262.721 42.605C265.277 42.605 267.336 41.6083 268.896 39.615C269.286 39.1383 269.589 38.835 269.806 38.705C270.066 38.575 270.434 38.51 270.911 38.51H276.501C276.891 38.51 277.216 38.64 277.476 38.9C277.779 39.1167 277.931 39.3983 277.931 39.745C277.931 40.785 277.302 42.02 276.046 43.45C274.832 44.8367 273.077 46.05 270.781 47.09C268.484 48.13 265.819 48.65 262.786 48.65ZM270.001 28.175V27.98C270.001 25.4233 269.351 23.365 268.051 21.805C266.794 20.245 265.039 19.465 262.786 19.465C260.532 19.465 258.777 20.245 257.521 21.805C256.264 23.365 255.636 25.4233 255.636 27.98V28.175H270.001Z" />
          <path d="M305.69 48.65C300.62 48.65 296.699 47.35 293.925 44.75C291.152 42.1067 289.657 38.51 289.44 33.96L289.375 31.1L289.44 28.24C289.657 23.7333 291.174 20.1583 293.99 17.515C296.807 14.8717 300.707 13.55 305.69 13.55C310.674 13.55 314.574 14.8717 317.39 17.515C320.207 20.1583 321.724 23.7333 321.94 28.24C321.984 28.76 322.005 29.7133 322.005 31.1C322.005 32.4867 321.984 33.44 321.94 33.96C321.724 38.51 320.229 42.1067 317.455 44.75C314.682 47.35 310.76 48.65 305.69 48.65ZM305.69 42.215C307.987 42.215 309.764 41.5 311.02 40.07C312.277 38.5967 312.97 36.4517 313.1 33.635C313.144 33.2017 313.165 32.3567 313.165 31.1C313.165 29.8433 313.144 28.9983 313.1 28.565C312.97 25.7483 312.277 23.625 311.02 22.195C309.764 20.7217 307.987 19.985 305.69 19.985C303.394 19.985 301.617 20.7217 300.36 22.195C299.104 23.625 298.41 25.7483 298.28 28.565L298.215 31.1L298.28 33.635C298.41 36.4517 299.104 38.5967 300.36 40.07C301.617 41.5 303.394 42.215 305.69 42.215Z" />
        </mask>
        <path
          d="M20.948 48.65C17.0913 48.65 13.7763 48.065 11.003 46.895C8.22967 45.725 6.128 44.1867 4.698 42.28C3.268 40.3733 2.50967 38.315 2.423 36.105C2.423 35.715 2.553 35.39 2.813 35.13C3.073 34.87 3.398 34.74 3.788 34.74H9.573C10.093 34.74 10.483 34.8483 10.743 35.065C11.0463 35.2383 11.328 35.5417 11.588 35.975C12.0213 37.4483 13.018 38.6833 14.578 39.68C16.138 40.6767 18.2613 41.175 20.948 41.175C24.0247 41.175 26.343 40.6767 27.903 39.68C29.463 38.64 30.243 37.21 30.243 35.39C30.243 34.1767 29.8313 33.18 29.008 32.4C28.228 31.62 27.0363 30.9483 25.433 30.385C23.873 29.8217 21.533 29.1283 18.413 28.305C13.2997 27.0917 9.55134 25.4883 7.168 23.495C4.828 21.4583 3.658 18.5767 3.658 14.85C3.658 12.3367 4.32967 10.105 5.673 8.155C7.05967 6.205 9.03134 4.66667 11.588 3.54C14.188 2.41333 17.1997 1.85 20.623 1.85C24.1763 1.85 27.253 2.47833 29.853 3.735C32.453 4.99167 34.4247 6.57333 35.768 8.48C37.1547 10.3433 37.8913 12.2067 37.978 14.07C37.978 14.46 37.848 14.785 37.588 15.045C37.328 15.305 37.003 15.435 36.613 15.435H30.568C29.658 15.435 29.0297 15.0233 28.683 14.2C28.423 12.8133 27.5563 11.665 26.083 10.755C24.6097 9.80167 22.7897 9.325 20.623 9.325C18.1963 9.325 16.2897 9.78 14.903 10.69C13.5163 11.6 12.823 12.9217 12.823 14.655C12.823 15.8683 13.1697 16.865 13.863 17.645C14.5563 18.425 15.6397 19.1183 17.113 19.725C18.6297 20.3317 20.7963 21.0033 23.613 21.74C27.4263 22.6067 30.4597 23.5817 32.713 24.665C35.0097 25.7483 36.6997 27.1133 37.783 28.76C38.8663 30.4067 39.408 32.5083 39.408 35.065C39.408 37.8383 38.628 40.265 37.068 42.345C35.5513 44.3817 33.3847 45.9417 30.568 47.025C27.7947 48.1083 24.588 48.65 20.948 48.65Z"
          fill="#0DA3BF"
        />
        <path
          d="M65.7021 48.65C60.9354 48.65 57.1221 47.3283 54.2621 44.685C51.4454 42.0417 49.9504 38.38 49.7771 33.7L49.7121 31.1L49.7771 28.5C49.9504 23.82 51.4454 20.1583 54.2621 17.515C57.1221 14.8717 60.9354 13.55 65.7021 13.55C69.0821 13.55 71.9421 14.1567 74.2821 15.37C76.6654 16.5833 78.4204 18.0783 79.5471 19.855C80.7171 21.5883 81.3454 23.235 81.4321 24.795C81.4754 25.2283 81.3238 25.5967 80.9771 25.9C80.6738 26.2033 80.3054 26.355 79.8721 26.355H74.1521C73.7188 26.355 73.3721 26.2683 73.1121 26.095C72.8954 25.8783 72.6788 25.5317 72.4621 25.055C71.8121 23.365 70.9454 22.1517 69.8621 21.415C68.8221 20.6783 67.4788 20.31 65.8321 20.31C63.6221 20.31 61.8888 21.025 60.6321 22.455C59.3754 23.8417 58.7038 25.965 58.6171 28.825L58.5521 31.23L58.6171 33.375C58.7904 39.0517 61.1954 41.89 65.8321 41.89C67.5221 41.89 68.8871 41.5217 69.9271 40.785C70.9671 40.0483 71.8121 38.835 72.4621 37.145C72.6788 36.6683 72.8954 36.3433 73.1121 36.17C73.3721 35.9533 73.7188 35.845 74.1521 35.845H79.8721C80.3054 35.845 80.6738 35.9967 80.9771 36.3C81.3238 36.6033 81.4754 36.9717 81.4321 37.405C81.3454 38.9217 80.7388 40.5467 79.6121 42.28C78.4854 44.0133 76.7521 45.5083 74.4121 46.765C72.0721 48.0217 69.1688 48.65 65.7021 48.65Z"
          fill="#0DA3BF"
        />
        <path
          d="M94.8359 48C94.4026 48 94.0342 47.8483 93.7309 47.545C93.4276 47.2417 93.2759 46.8733 93.2759 46.44V3.41C93.2759 2.93333 93.4276 2.565 93.7309 2.305C94.0342 2.00167 94.4026 1.85 94.8359 1.85H100.621C101.098 1.85 101.466 2.00167 101.726 2.305C102.029 2.565 102.181 2.93333 102.181 3.41V18.23C104.781 15.11 108.291 13.55 112.711 13.55C116.698 13.55 119.883 14.8717 122.266 17.515C124.649 20.115 125.841 23.6683 125.841 28.175V46.44C125.841 46.8733 125.689 47.2417 125.386 47.545C125.126 47.8483 124.758 48 124.281 48H118.431C117.998 48 117.629 47.8483 117.326 47.545C117.023 47.2417 116.871 46.8733 116.871 46.44V28.565C116.871 26.0083 116.243 24.0367 114.986 22.65C113.773 21.22 111.996 20.505 109.656 20.505C107.359 20.505 105.539 21.22 104.196 22.65C102.853 24.08 102.181 26.0517 102.181 28.565V46.44C102.181 46.8733 102.029 47.2417 101.726 47.545C101.466 47.8483 101.098 48 100.621 48H94.8359Z"
          fill="#0DA3BF"
        />
        <path
          d="M154.04 48.65C148.97 48.65 145.048 47.35 142.275 44.75C139.501 42.1067 138.006 38.51 137.79 33.96L137.725 31.1L137.79 28.24C138.006 23.7333 139.523 20.1583 142.34 17.515C145.156 14.8717 149.056 13.55 154.04 13.55C159.023 13.55 162.923 14.8717 165.74 17.515C168.556 20.1583 170.073 23.7333 170.29 28.24C170.333 28.76 170.355 29.7133 170.355 31.1C170.355 32.4867 170.333 33.44 170.29 33.96C170.073 38.51 168.578 42.1067 165.805 44.75C163.031 47.35 159.11 48.65 154.04 48.65ZM154.04 42.215C156.336 42.215 158.113 41.5 159.37 40.07C160.626 38.5967 161.32 36.4517 161.45 33.635C161.493 33.2017 161.515 32.3567 161.515 31.1C161.515 29.8433 161.493 28.9983 161.45 28.565C161.32 25.7483 160.626 23.625 159.37 22.195C158.113 20.7217 156.336 19.985 154.04 19.985C151.743 19.985 149.966 20.7217 148.71 22.195C147.453 23.625 146.76 25.7483 146.63 28.565L146.565 31.1L146.63 33.635C146.76 36.4517 147.453 38.5967 148.71 40.07C149.966 41.5 151.743 42.215 154.04 42.215Z"
          fill="#0DA3BF"
        />
        <path
          d="M197.507 48.65C192.437 48.65 188.515 47.35 185.742 44.75C182.968 42.1067 181.473 38.51 181.257 33.96L181.192 31.1L181.257 28.24C181.473 23.7333 182.99 20.1583 185.807 17.515C188.623 14.8717 192.523 13.55 197.507 13.55C202.49 13.55 206.39 14.8717 209.207 17.515C212.023 20.1583 213.54 23.7333 213.757 28.24C213.8 28.76 213.822 29.7133 213.822 31.1C213.822 32.4867 213.8 33.44 213.757 33.96C213.54 38.51 212.045 42.1067 209.272 44.75C206.498 47.35 202.577 48.65 197.507 48.65ZM197.507 42.215C199.803 42.215 201.58 41.5 202.837 40.07C204.093 38.5967 204.787 36.4517 204.917 33.635C204.96 33.2017 204.982 32.3567 204.982 31.1C204.982 29.8433 204.96 28.9983 204.917 28.565C204.787 25.7483 204.093 23.625 202.837 22.195C201.58 20.7217 199.803 19.985 197.507 19.985C195.21 19.985 193.433 20.7217 192.177 22.195C190.92 23.625 190.227 25.7483 190.097 28.565L190.032 31.1L190.097 33.635C190.227 36.4517 190.92 38.5967 192.177 40.07C193.433 41.5 195.21 42.215 197.507 42.215Z"
          fill="#0DA3BF"
        />
        <path
          d="M227.648 48C227.215 48 226.847 47.8483 226.543 47.545C226.24 47.2417 226.088 46.8733 226.088 46.44V3.41C226.088 2.93333 226.24 2.565 226.543 2.305C226.847 2.00167 227.215 1.85 227.648 1.85H233.043C233.52 1.85 233.888 2.00167 234.148 2.305C234.452 2.565 234.603 2.93333 234.603 3.41V46.44C234.603 46.8733 234.452 47.2417 234.148 47.545C233.888 47.8483 233.52 48 233.043 48H227.648Z"
          fill="#0DA3BF"
        />
        <path
          d="M262.786 48.65C257.976 48.65 254.141 47.2633 251.281 44.49C248.464 41.6733 246.969 37.73 246.796 32.66L246.731 31.035L246.796 29.41C247.012 24.47 248.529 20.5917 251.346 17.775C254.206 14.9583 258.019 13.55 262.786 13.55C267.899 13.55 271.842 15.11 274.616 18.23C277.432 21.35 278.841 25.51 278.841 30.71V32.075C278.841 32.5083 278.689 32.8767 278.386 33.18C278.082 33.4833 277.692 33.635 277.216 33.635H255.636V34.155C255.722 36.5383 256.372 38.5533 257.586 40.2C258.842 41.8033 260.554 42.605 262.721 42.605C265.277 42.605 267.336 41.6083 268.896 39.615C269.286 39.1383 269.589 38.835 269.806 38.705C270.066 38.575 270.434 38.51 270.911 38.51H276.501C276.891 38.51 277.216 38.64 277.476 38.9C277.779 39.1167 277.931 39.3983 277.931 39.745C277.931 40.785 277.302 42.02 276.046 43.45C274.832 44.8367 273.077 46.05 270.781 47.09C268.484 48.13 265.819 48.65 262.786 48.65ZM270.001 28.175V27.98C270.001 25.4233 269.351 23.365 268.051 21.805C266.794 20.245 265.039 19.465 262.786 19.465C260.532 19.465 258.777 20.245 257.521 21.805C256.264 23.365 255.636 25.4233 255.636 27.98V28.175H270.001Z"
          fill="#0DA3BF"
        />
        <path
          d="M305.69 48.65C300.62 48.65 296.699 47.35 293.925 44.75C291.152 42.1067 289.657 38.51 289.44 33.96L289.375 31.1L289.44 28.24C289.657 23.7333 291.174 20.1583 293.99 17.515C296.807 14.8717 300.707 13.55 305.69 13.55C310.674 13.55 314.574 14.8717 317.39 17.515C320.207 20.1583 321.724 23.7333 321.94 28.24C321.984 28.76 322.005 29.7133 322.005 31.1C322.005 32.4867 321.984 33.44 321.94 33.96C321.724 38.51 320.229 42.1067 317.455 44.75C314.682 47.35 310.76 48.65 305.69 48.65ZM305.69 42.215C307.987 42.215 309.764 41.5 311.02 40.07C312.277 38.5967 312.97 36.4517 313.1 33.635C313.144 33.2017 313.165 32.3567 313.165 31.1C313.165 29.8433 313.144 28.9983 313.1 28.565C312.97 25.7483 312.277 23.625 311.02 22.195C309.764 20.7217 307.987 19.985 305.69 19.985C303.394 19.985 301.617 20.7217 300.36 22.195C299.104 23.625 298.41 25.7483 298.28 28.565L298.215 31.1L298.28 33.635C298.41 36.4517 299.104 38.5967 300.36 40.07C301.617 41.5 303.394 42.215 305.69 42.215Z"
          fill="#0DA3BF"
        />
        <path
          d="M20.948 48.65C17.0913 48.65 13.7763 48.065 11.003 46.895C8.22967 45.725 6.128 44.1867 4.698 42.28C3.268 40.3733 2.50967 38.315 2.423 36.105C2.423 35.715 2.553 35.39 2.813 35.13C3.073 34.87 3.398 34.74 3.788 34.74H9.573C10.093 34.74 10.483 34.8483 10.743 35.065C11.0463 35.2383 11.328 35.5417 11.588 35.975C12.0213 37.4483 13.018 38.6833 14.578 39.68C16.138 40.6767 18.2613 41.175 20.948 41.175C24.0247 41.175 26.343 40.6767 27.903 39.68C29.463 38.64 30.243 37.21 30.243 35.39C30.243 34.1767 29.8313 33.18 29.008 32.4C28.228 31.62 27.0363 30.9483 25.433 30.385C23.873 29.8217 21.533 29.1283 18.413 28.305C13.2997 27.0917 9.55134 25.4883 7.168 23.495C4.828 21.4583 3.658 18.5767 3.658 14.85C3.658 12.3367 4.32967 10.105 5.673 8.155C7.05967 6.205 9.03134 4.66667 11.588 3.54C14.188 2.41333 17.1997 1.85 20.623 1.85C24.1763 1.85 27.253 2.47833 29.853 3.735C32.453 4.99167 34.4247 6.57333 35.768 8.48C37.1547 10.3433 37.8913 12.2067 37.978 14.07C37.978 14.46 37.848 14.785 37.588 15.045C37.328 15.305 37.003 15.435 36.613 15.435H30.568C29.658 15.435 29.0297 15.0233 28.683 14.2C28.423 12.8133 27.5563 11.665 26.083 10.755C24.6097 9.80167 22.7897 9.325 20.623 9.325C18.1963 9.325 16.2897 9.78 14.903 10.69C13.5163 11.6 12.823 12.9217 12.823 14.655C12.823 15.8683 13.1697 16.865 13.863 17.645C14.5563 18.425 15.6397 19.1183 17.113 19.725C18.6297 20.3317 20.7963 21.0033 23.613 21.74C27.4263 22.6067 30.4597 23.5817 32.713 24.665C35.0097 25.7483 36.6997 27.1133 37.783 28.76C38.8663 30.4067 39.408 32.5083 39.408 35.065C39.408 37.8383 38.628 40.265 37.068 42.345C35.5513 44.3817 33.3847 45.9417 30.568 47.025C27.7947 48.1083 24.588 48.65 20.948 48.65Z"
          stroke="#B3F5FF"
          mask="url(#path-1-outside-1)"
        />
        <path
          d="M65.7021 48.65C60.9354 48.65 57.1221 47.3283 54.2621 44.685C51.4454 42.0417 49.9504 38.38 49.7771 33.7L49.7121 31.1L49.7771 28.5C49.9504 23.82 51.4454 20.1583 54.2621 17.515C57.1221 14.8717 60.9354 13.55 65.7021 13.55C69.0821 13.55 71.9421 14.1567 74.2821 15.37C76.6654 16.5833 78.4204 18.0783 79.5471 19.855C80.7171 21.5883 81.3454 23.235 81.4321 24.795C81.4754 25.2283 81.3238 25.5967 80.9771 25.9C80.6738 26.2033 80.3054 26.355 79.8721 26.355H74.1521C73.7188 26.355 73.3721 26.2683 73.1121 26.095C72.8954 25.8783 72.6788 25.5317 72.4621 25.055C71.8121 23.365 70.9454 22.1517 69.8621 21.415C68.8221 20.6783 67.4788 20.31 65.8321 20.31C63.6221 20.31 61.8888 21.025 60.6321 22.455C59.3754 23.8417 58.7038 25.965 58.6171 28.825L58.5521 31.23L58.6171 33.375C58.7904 39.0517 61.1954 41.89 65.8321 41.89C67.5221 41.89 68.8871 41.5217 69.9271 40.785C70.9671 40.0483 71.8121 38.835 72.4621 37.145C72.6788 36.6683 72.8954 36.3433 73.1121 36.17C73.3721 35.9533 73.7188 35.845 74.1521 35.845H79.8721C80.3054 35.845 80.6738 35.9967 80.9771 36.3C81.3238 36.6033 81.4754 36.9717 81.4321 37.405C81.3454 38.9217 80.7388 40.5467 79.6121 42.28C78.4854 44.0133 76.7521 45.5083 74.4121 46.765C72.0721 48.0217 69.1688 48.65 65.7021 48.65Z"
          stroke="#B3F5FF"
          strokeWidth="3"
          mask="url(#path-1-outside-1)"
        />
        <path
          d="M94.8359 48C94.4026 48 94.0342 47.8483 93.7309 47.545C93.4276 47.2417 93.2759 46.8733 93.2759 46.44V3.41C93.2759 2.93333 93.4276 2.565 93.7309 2.305C94.0342 2.00167 94.4026 1.85 94.8359 1.85H100.621C101.098 1.85 101.466 2.00167 101.726 2.305C102.029 2.565 102.181 2.93333 102.181 3.41V18.23C104.781 15.11 108.291 13.55 112.711 13.55C116.698 13.55 119.883 14.8717 122.266 17.515C124.649 20.115 125.841 23.6683 125.841 28.175V46.44C125.841 46.8733 125.689 47.2417 125.386 47.545C125.126 47.8483 124.758 48 124.281 48H118.431C117.998 48 117.629 47.8483 117.326 47.545C117.023 47.2417 116.871 46.8733 116.871 46.44V28.565C116.871 26.0083 116.243 24.0367 114.986 22.65C113.773 21.22 111.996 20.505 109.656 20.505C107.359 20.505 105.539 21.22 104.196 22.65C102.853 24.08 102.181 26.0517 102.181 28.565V46.44C102.181 46.8733 102.029 47.2417 101.726 47.545C101.466 47.8483 101.098 48 100.621 48H94.8359Z"
          stroke="#B3F5FF"
          strokeWidth="3"
          mask="url(#path-1-outside-1)"
        />
        <path
          d="M154.04 48.65C148.97 48.65 145.048 47.35 142.275 44.75C139.501 42.1067 138.006 38.51 137.79 33.96L137.725 31.1L137.79 28.24C138.006 23.7333 139.523 20.1583 142.34 17.515C145.156 14.8717 149.056 13.55 154.04 13.55C159.023 13.55 162.923 14.8717 165.74 17.515C168.556 20.1583 170.073 23.7333 170.29 28.24C170.333 28.76 170.355 29.7133 170.355 31.1C170.355 32.4867 170.333 33.44 170.29 33.96C170.073 38.51 168.578 42.1067 165.805 44.75C163.031 47.35 159.11 48.65 154.04 48.65ZM154.04 42.215C156.336 42.215 158.113 41.5 159.37 40.07C160.626 38.5967 161.32 36.4517 161.45 33.635C161.493 33.2017 161.515 32.3567 161.515 31.1C161.515 29.8433 161.493 28.9983 161.45 28.565C161.32 25.7483 160.626 23.625 159.37 22.195C158.113 20.7217 156.336 19.985 154.04 19.985C151.743 19.985 149.966 20.7217 148.71 22.195C147.453 23.625 146.76 25.7483 146.63 28.565L146.565 31.1L146.63 33.635C146.76 36.4517 147.453 38.5967 148.71 40.07C149.966 41.5 151.743 42.215 154.04 42.215Z"
          stroke="#B3F5FF"
          strokeWidth="3"
          mask="url(#path-1-outside-1)"
        />
        <path
          d="M197.507 48.65C192.437 48.65 188.515 47.35 185.742 44.75C182.968 42.1067 181.473 38.51 181.257 33.96L181.192 31.1L181.257 28.24C181.473 23.7333 182.99 20.1583 185.807 17.515C188.623 14.8717 192.523 13.55 197.507 13.55C202.49 13.55 206.39 14.8717 209.207 17.515C212.023 20.1583 213.54 23.7333 213.757 28.24C213.8 28.76 213.822 29.7133 213.822 31.1C213.822 32.4867 213.8 33.44 213.757 33.96C213.54 38.51 212.045 42.1067 209.272 44.75C206.498 47.35 202.577 48.65 197.507 48.65ZM197.507 42.215C199.803 42.215 201.58 41.5 202.837 40.07C204.093 38.5967 204.787 36.4517 204.917 33.635C204.96 33.2017 204.982 32.3567 204.982 31.1C204.982 29.8433 204.96 28.9983 204.917 28.565C204.787 25.7483 204.093 23.625 202.837 22.195C201.58 20.7217 199.803 19.985 197.507 19.985C195.21 19.985 193.433 20.7217 192.177 22.195C190.92 23.625 190.227 25.7483 190.097 28.565L190.032 31.1L190.097 33.635C190.227 36.4517 190.92 38.5967 192.177 40.07C193.433 41.5 195.21 42.215 197.507 42.215Z"
          stroke="#B3F5FF"
          strokeWidth="3"
          mask="url(#path-1-outside-1)"
        />
        <path
          d="M227.648 48C227.215 48 226.847 47.8483 226.543 47.545C226.24 47.2417 226.088 46.8733 226.088 46.44V3.41C226.088 2.93333 226.24 2.565 226.543 2.305C226.847 2.00167 227.215 1.85 227.648 1.85H233.043C233.52 1.85 233.888 2.00167 234.148 2.305C234.452 2.565 234.603 2.93333 234.603 3.41V46.44C234.603 46.8733 234.452 47.2417 234.148 47.545C233.888 47.8483 233.52 48 233.043 48H227.648Z"
          stroke="#B3F5FF"
          strokeWidth="3"
          mask="url(#path-1-outside-1)"
        />
        <path
          d="M262.786 48.65C257.976 48.65 254.141 47.2633 251.281 44.49C248.464 41.6733 246.969 37.73 246.796 32.66L246.731 31.035L246.796 29.41C247.012 24.47 248.529 20.5917 251.346 17.775C254.206 14.9583 258.019 13.55 262.786 13.55C267.899 13.55 271.842 15.11 274.616 18.23C277.432 21.35 278.841 25.51 278.841 30.71V32.075C278.841 32.5083 278.689 32.8767 278.386 33.18C278.082 33.4833 277.692 33.635 277.216 33.635H255.636V34.155C255.722 36.5383 256.372 38.5533 257.586 40.2C258.842 41.8033 260.554 42.605 262.721 42.605C265.277 42.605 267.336 41.6083 268.896 39.615C269.286 39.1383 269.589 38.835 269.806 38.705C270.066 38.575 270.434 38.51 270.911 38.51H276.501C276.891 38.51 277.216 38.64 277.476 38.9C277.779 39.1167 277.931 39.3983 277.931 39.745C277.931 40.785 277.302 42.02 276.046 43.45C274.832 44.8367 273.077 46.05 270.781 47.09C268.484 48.13 265.819 48.65 262.786 48.65ZM270.001 28.175V27.98C270.001 25.4233 269.351 23.365 268.051 21.805C266.794 20.245 265.039 19.465 262.786 19.465C260.532 19.465 258.777 20.245 257.521 21.805C256.264 23.365 255.636 25.4233 255.636 27.98V28.175H270.001Z"
          stroke="#B3F5FF"
          strokeWidth="3"
          mask="url(#path-1-outside-1)"
        />
        <path
          d="M305.69 48.65C300.62 48.65 296.699 47.35 293.925 44.75C291.152 42.1067 289.657 38.51 289.44 33.96L289.375 31.1L289.44 28.24C289.657 23.7333 291.174 20.1583 293.99 17.515C296.807 14.8717 300.707 13.55 305.69 13.55C310.674 13.55 314.574 14.8717 317.39 17.515C320.207 20.1583 321.724 23.7333 321.94 28.24C321.984 28.76 322.005 29.7133 322.005 31.1C322.005 32.4867 321.984 33.44 321.94 33.96C321.724 38.51 320.229 42.1067 317.455 44.75C314.682 47.35 310.76 48.65 305.69 48.65ZM305.69 42.215C307.987 42.215 309.764 41.5 311.02 40.07C312.277 38.5967 312.97 36.4517 313.1 33.635C313.144 33.2017 313.165 32.3567 313.165 31.1C313.165 29.8433 313.144 28.9983 313.1 28.565C312.97 25.7483 312.277 23.625 311.02 22.195C309.764 20.7217 307.987 19.985 305.69 19.985C303.394 19.985 301.617 20.7217 300.36 22.195C299.104 23.625 298.41 25.7483 298.28 28.565L298.215 31.1L298.28 33.635C298.41 36.4517 299.104 38.5967 300.36 40.07C301.617 41.5 303.394 42.215 305.69 42.215Z"
          stroke="#B3F5FF"
          strokeWidth="3"
          mask="url(#path-1-outside-1)"
        />
      </svg>
    </div>
  );
}

export default WelcomeAnimation;
