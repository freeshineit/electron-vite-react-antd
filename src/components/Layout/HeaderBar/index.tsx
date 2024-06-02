import { type MouseEventHandler, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MinusOutlined, ExpandOutlined, CloseCircleOutlined } from '@ant-design/icons';
import cls from 'classnames';
import IPC_CONST from '../../../../constant/ipc';
import styles from './Header.module.scss';

const HeaderBar = () => {
  // 需要一些状态
  //
  const handleClose = useCallback((e: any) => {
    window.ipcRenderer.invoke(IPC_CONST.WINDOW_CLOSE);
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleMin = useCallback((e: any) => {
    window.ipcRenderer.invoke(IPC_CONST.WINDOW_MIN);
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFullscreen = useCallback((e: any) => {
    window.ipcRenderer.invoke(IPC_CONST.WINDOW_FULL_SCREEN);
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDoubleClick = useCallback((e: any) => {
    window.ipcRenderer.invoke(IPC_CONST.WINDOW_MAXIMIZE);
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div className={cls('drag', styles.header, '__header')} onDoubleClick={handleDoubleClick}>
      <div className={cls(styles.left, 'drag-none')}>
        <Link to="/">Home Page</Link>
        &nbsp;|&nbsp;
        <div>
          <Link to="/login">Login</Link>
          &nbsp;|&nbsp;
          <Link to="./register">Register</Link>
          &nbsp;|&nbsp;
          <Link to="./profile">Profile</Link>
        </div>
      </div>
      <div className={cls(styles.right, 'drag-none')}>
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
