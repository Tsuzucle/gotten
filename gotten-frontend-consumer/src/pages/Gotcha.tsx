import { useReactiveVar } from "@apollo/client";
import qs from "qs";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { contractVar } from "../contract";
import Column from "../components/Column";
import { Button } from "antd-mobile";
import { Result, Typography } from "antd";
import { css } from "@emotion/css";
import { accountVar, openMetaMaskApp } from "../web3";

const { Text } = Typography;

const exploreBaseUrl = "https://polygonscan.com/tx/";

const Gotcha = () => {
  const account = useReactiveVar(accountVar);
  const contract = useReactiveVar(contractVar);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [exploreUrl, setExploreUrl] = useState("");

  const params = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as Record<string, string>;

  const { r: rand, p: password } = params;
  const key = `${rand}${password}`;

  const handleClickGotcha = useCallback(async () => {
    try {
      setLoading(true);
      const tx = await contract!.gotcha(key);
      navigate(`/gotcha`);
      setExploreUrl(`${exploreBaseUrl}${tx.hash}`);
    } catch (e) {
      console.log({ e });
      setError('"gotcha" しっぱいしました');
    } finally {
      setLoading(false);
    }
  }, [contract]);

  const handleClickGoExplore = useCallback(() => {
    window.location.href = exploreUrl;
  }, [exploreUrl]);

  const handleClickMetaMask = useCallback(() => {
    openMetaMaskApp();
  }, []);

  return (
    <Column className={styles.root}>
      {!account ? (
        <Button onClick={handleClickMetaMask}>Go To Metamask</Button>
      ) : exploreUrl ? (
        <Result
          status="success"
          title="Successfully Gotcha"
          extra={[
            <Button onClick={handleClickGoExplore}>Go To Explore</Button>,
          ]}
        />
      ) : error ? (
        <Text type="danger">{error}</Text>
      ) : (
        <Column>
          <Text type="secondary">パスワード:{password}</Text>
          <Button
            className={styles.gotchaButton}
            loading={loading}
            size="large"
            color="success"
            disabled={!password}
            onClick={handleClickGotcha}
          >
            Gotcha
          </Button>
        </Column>
      )}
    </Column>
  );
};

const styles = {
  root: css`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  `,
  gotchaButton: css`
    width: 80vw;
  `,
};
export default Gotcha;
