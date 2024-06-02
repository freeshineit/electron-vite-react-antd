// import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import cls from 'classnames';
import style from './index.module.scss';
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { fetchMeSync, selectMe } from "@/redux/features/me-slice";

const Main = () => {
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
    <main className={cls(style.main, '__main')}>
      <Outlet />
    </main>
  );
};

export default Main;
