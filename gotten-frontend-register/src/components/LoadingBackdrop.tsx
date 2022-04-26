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
      <Spin
        size="large"
        className={clsx(styles.spin, { [styles.notLoading]: !loading })}
      />
    </>
  );
};

const styles = {
  root: css`
    width: 100%;
    height: 100%;
    position: relative;
  `,
  spin: css`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  `,
  notLoading: css`
    display: none;
  `,
};

export default LoadingBackdrop;
