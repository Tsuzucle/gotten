import { useReactiveVar } from "@apollo/client";
import { css } from "@emotion/css";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import Column from "../components/Column";
import { getBalance } from "../contract";
import { accountVar } from "../web3";

const { Title, Text } = Typography;

const Wallet = () => {
  const [balance, setBalance] = useState("0");
  const account = useReactiveVar(accountVar);
  useEffect(() => {
    getBalance().then((_balance) => {
      setBalance(_balance);
    });
  }, []);
  return (
    <Column className={styles.root}>
      <Title>{balance} GTN</Title>
      <Text>Address</Text>
      <Text copyable>{account}</Text>
    </Column>
  );
};

const styles = {
  root: css`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  `,
};

export default Wallet;
