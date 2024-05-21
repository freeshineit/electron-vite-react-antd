import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MinusOutlined, ExpandOutlined, CloseCircleOutlined } from '@ant-design/icons';
import cls from 'classnames';
import IPC_CONST from '../../../../constant/ipc';
import styles from './Header.module.scss';

const HeaderBar = () => {
  // 需要一些状态
  //
  const handleClose = useCallback(() => {
    window.ipcRenderer.invoke(IPC_CONST.WINDOW_CLOSE);
  }, []);

  const handleMin = useCallback(() => {
    window.ipcRenderer.invoke(IPC_CONST.WINDOW_MIN);
  }, []);

  const handleFullscreen = useCallback(() => {
    window.ipcRenderer.invoke(IPC_CONST.WINDOW_FULL_SCREEN);
  }, []);

  return (
    <div className={cls(styles.header, '__header')}>
      <div className={styles.left}>
        <Link to="/">Home Page</Link>
        <div>
          <Link to="/login">Login</Link>
          &nbsp;|&nbsp;
          <Link to="./register">Register</Link>
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.winIcon} onClick={handleMin}>
          <MinusOutlined />
        </span>
        <span className={styles.winIcon} onClick={handleFullscreen}>
          <ExpandOutlined />
        </span>
        <span className={styles.winIcon} onClick={handleClose}>
          <CloseCircleOutlined />
        </span>
      </div>
    </div>
  );
};

export default HeaderBar;
