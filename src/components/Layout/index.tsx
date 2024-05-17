import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import style from './index.module.scss';
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { fetchMeSync, selectMe } from "@/store/features/me-slice";
// import { ResponseStatus } from "@/constant";
import Header from './Header';
// import Footer from "./Footer";

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
    <div className={style['center']}>
      <Header />
      <main className="_main">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
