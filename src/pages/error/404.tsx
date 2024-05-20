import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const Error404 = () => {
  return (
    <div className={styles.error}>
      <div>404</div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Error404;
