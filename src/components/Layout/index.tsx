// import { useEffect } from 'react';
import cls from 'classnames';
import style from './index.module.scss';
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { fetchMeSync, selectMe } from "@/redux/features/me-slice";
import Header from './Header';
import Content from './Main';
import Footer from './Footer';

const Layout = () => {
  //   const dispatch = useAppDispatch();
  //   const me = useAppSelector(selectMe);

  //   useEffect(() => {
  //     void dispatch(fetchMeSync());
  //   }, [dispatch]);

  //   if (me.status === ResponseStatus.Loading) {
  //     return (
  //       <div
  //         style={{
  //           height: "100vh",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           fontSize: "20px",
  //           color: "#fff",
  //         }}
  //       >
  //         Loading
  //       </div>
  //     );
  //   }

  return (
    <div className={cls(style.layout, '__layout')}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default Layout;
