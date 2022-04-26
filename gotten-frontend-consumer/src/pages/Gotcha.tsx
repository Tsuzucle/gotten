import { useReactiveVar } from "@apollo/client";
import qs from "qs";
import { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { contractVar } from "../contract";
import Column from "../components/Column";
import { Button } from "antd-mobile";
import { Typography } from "antd";

const { Text } = Typography;

const Gotcha = () => {
  const contract = useReactiveVar(contractVar);
  const location = useLocation();
  const [error, setError] = useState("");
  console.debug({ location });
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  console.debug({ params });
  const { r: rand, p: password } = params;
  const key = `${rand}${password}`;

  const handleClickGotcha = useCallback(async () => {
    try {
      const txHash = await contract!.gotcha(key);
    } catch (e) {
      console.log({ e });
      setError('"gotcha" しっぱいしました');
    }
  }, [contract]);

  return (
    <Column>
      {key}
      <Button onClick={handleClickGotcha}>Gotcha</Button>
      {error && <Text type="danger">{error}</Text>}
    </Column>
  );
};

export default Gotcha;
