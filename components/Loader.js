import styles from '../styles/Loader.module.css';
import { FaSpinner } from 'react-icons/fa';

function Loader() {
  return <div className={styles.loader}>{/* <FaSpinner /> */}</div>;
  // (
  // <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     xmlnsXlink="http://www.w3.org/1999/xlink"
  //     style={{
  //         margin: 'auto',
  //         background: 'transparent',
  //         display: 'block',
  //     }}
  //     width="200px"
  //     height="200px"
  //     viewBox="0 0 100 100"
  //     preserveAspectRatio="xMidYMid"
  // >
  //     <path
  //         fill="none"
  //         d="M50 30A20 20 0 0 1 50 70A20 20 0 0 1 50 30"
  //         stroke="#0051a2"
  //         strokeWidth={40}
  //     >
  //         <animate
  //             attributeName="stroke-dasharray"
  //             repeatCount="indefinite"
  //             dur={1}
  //             values="0 0 0 126;0 0 126 126;0 126 126 126"
  //             keyTimes="0;0.5;1"
  //             keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
  //             calcMode="spline"
  //         />
  //         <animate
  //             attributeName="stroke"
  //             values="#0051a2;#1b75be;#408ee0;#89bff8;#0051a2"
  //             keyTimes="0;0.25;0.5;0.75;1"
  //             dur="4s"
  //             calcMode="discrete"
  //             repeatCount="indefinite"
  //         />
  //     </path>
  // </svg>
  // );
}

export default Loader;
