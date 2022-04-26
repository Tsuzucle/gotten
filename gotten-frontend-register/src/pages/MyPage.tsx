import { useReactiveVar } from "@apollo/client";
import { css } from "@emotion/css";

import Button from "antd/lib/button";
import Result from "antd/lib/result";
import Typography from "antd/lib/typography";
import React, { useCallback } from "react";
import { Column } from "../components";
import { screenLoadingVar } from "../state/root";
import { accountVar, connectWeb3 } from "../web3";

const { Paragraph } = Typography;

const MyPage: React.FC = () => {
  const account = useReactiveVar(accountVar);
  const handleClick = useCallback(async () => {
    screenLoadingVar(true);
    try {
      await connectWeb3();
    } finally {
      screenLoadingVar(false);
    }
  }, []);

  return (
    <Column className={styles.root}>
      {account ? (
        <Result
          status="success"
          title="Successfully Connect Web3!"
          subTitle={
            <Typography>
              Your Account: <Paragraph copyable>{account}</Paragraph>
            </Typography>
          }
        />
      ) : (
        <Result
          status="warning"
          title="Connect Web3"
          subTitle={`Your Account: ${account}`}
          extra={[<Button onClick={handleClick}>Connect Wallet</Button>]}
        />
      )}
    </Column>
  );
};

const styles = {
  root: css`
    padding: 16px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export default MyPage;
