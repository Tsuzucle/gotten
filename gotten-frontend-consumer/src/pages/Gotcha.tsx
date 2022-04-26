import { useReactiveVar } from "@apollo/client";
import qs from "qs";
import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { contractVar } from "../contract";
import Column from "../components/Column";
import { Button } from "antd-mobile";
import { Result, Typography } from "antd";
import { css } from "@emotion/css";

const { Text } = Typography;

const exploreBaseUrl = "https://polygonscan.com/tx/";

const Gotcha = () => {
  const contract = useReactiveVar(contractVar);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [exploreUrl, setExploreUrl] = useState("");

  const params = qs.parse(location.search, { ignoreQueryPrefix: true });

  const { r: rand, p: password } = params;
  const key = `${rand}${password}`;

  const handleClickGotcha = useCallback(async () => {
    try {
      const tx = await contract!.gotcha(key);
      navigate(`/gotcha`);
      setExploreUrl(`${exploreBaseUrl}${tx.hash}`);
    } catch (e) {
      console.log({ e });
      setError('"gotcha" しっぱいしました');
    }
  }, [contract]);

  const handleClickGoExplore = useCallback(() => {
    (window as any).location = exploreUrl;
  }, [exploreUrl]);

  return (
    <Column className={styles.root}>
      {exploreUrl ? (
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
        <Button color="success" onClick={handleClickGotcha}>
          Gotcha
        </Button>
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
};
export default Gotcha;
