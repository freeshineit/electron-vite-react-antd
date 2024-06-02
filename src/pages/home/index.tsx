import cls from 'classnames';
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import reactLogo from '@/assets/react.svg';
import viteLogo from '@/assets/vite.svg';
import electronLogo from '@/assets/electron.svg';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { increment } from '@/redux/features/counter-slice';
import styles from './index.module.scss';

const Home = () => {
  // const [count, setCount] = useState(0);

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.home}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://www.electronjs.org/" target="_blank" rel="noreferrer">
          <img src={electronLogo} className={cls(styles.logo, 'electron')} alt="electron logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className={cls(styles.logo, 'react')} alt="React logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
            className={cls(styles.logo, 'ts')}
            alt="typescript logo"
          />
        </a>
        <a href="https://react-redux.js.org/" target="_blank" rel="noreferrer">
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg"
            className={cls(styles.logo, 'redux')}
            alt="redux logo"
          />
        </a>
      </div>
      <h1 className={styles.title}>Vite + Electron + React + Ts + Redux</h1>
      <div className={styles.card}>
        <button
          onClick={() => {
            dispatch(increment(count + 1));
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/pages/home/index.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles['read-the-docs']}>Click on the Vite、Electron、React、Ts and Redux logos to learn more</p>
      {/* <Link to="/login">login</Link> */}
    </div>
  );
};

export default Home;
