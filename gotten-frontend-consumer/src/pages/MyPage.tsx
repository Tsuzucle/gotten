import { useReactiveVar } from "@apollo/client";
import { css } from "@emotion/css";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { Earth } from "../components";
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
    <>
      <Earth />
      <Column className={styles.root}>
        <Title style={{ color: "white" }}>{balance} GTN</Title>
        <Text style={{ color: "white" }}>Address</Text>
        <Text style={{ color: "white" }} copyable>
          {account}
        </Text>
      </Column>
    </>
  );
};

const styles = {
  root: css`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  `,
};

export default Wallet;
