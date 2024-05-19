import { Link } from 'react-router-dom';
import cls from 'classnames'

import style from './Header.module.scss'

const Header = () => {
  return (
    <div className={cls(style.header, "__header")}>
      <Link to="/">Home Page</Link>
    </div>
  );
};

export default Header;
