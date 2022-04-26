import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { initContract } from "./contract";
import "./App.css";
import BottomNavigation from "./components/BottomNavigation";
import { css } from "@emotion/css";
import Find from "./pages/Find";
import Gotcha from "./pages/Gotcha";
import MyPage from "./pages/MyPage";

function App() {
  useEffect(() => {
    initContract();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Routes>
          <Route index element={<Gotcha />} />
          <Route path="gotcha" element={<Gotcha />} />
          <Route path="find" element={<Find />} />
          <Route path="wallet" element={<MyPage />} />
        </Routes>
      </div>
      <div className={styles.footer}>{<BottomNavigation />}</div>
    </div>
  );
}

const styles = {
  root: css`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  `,
  content: css`
    flex: 1 1 0;
  `,
  footer: css`
    box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.12);
    flex: 0 0 auto;
  `,
};

export default App;
