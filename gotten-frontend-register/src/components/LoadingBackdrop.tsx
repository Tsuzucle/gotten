import { css } from "@emotion/css";
import { Spin } from "antd";
import clsx from "clsx";

type LoadingBackdropProps = {
  loading?: boolean;
  children?: React.ReactNode;
};

const LoadingBackdrop: React.FC<LoadingBackdropProps> = (props) => {
  const { children, loading = true } = props;
  return (
    <>
      {children}
      {loading && <Spin size="large" className={clsx(styles.spin)} />}
    </>
  );
};

const styles = {
  spin: css`
    position: absolute !important;
    display: flex !important;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  `,
};

export default LoadingBackdrop;
