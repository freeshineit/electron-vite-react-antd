import { Outlet } from 'react-router-dom';
import styles from './Auth.module.scss';

const Auth = () => {
  return (
    <div className={styles.auth}>
      <Outlet />
    </div>
  );
};

export default Auth;
