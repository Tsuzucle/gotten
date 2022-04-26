import { css } from "@emotion/css";
import _ from "lodash";
import { Button, Input, Typography } from "antd";
import React, { useCallback, useRef, useState } from "react";

import { Column, Row, Map, LoadingBackdrop } from "../components";
import useLatLng from "../hooks/useLatLng";
import { registerTreasure } from "../contract";

const { Paragraph } = Typography;

type FormValues = {
  name: string;
  password: string;
  value: string;
  lat: string;
  lon: string;
};

const TreasuresNew: React.FC = () => {
  const [formValues, setFormValues] = useState<Partial<FormValues>>({});
  const [treasureUrl, setTreasureUrl] = useState<null | string>(null);
  const formValuesRef = useRef(formValues);
  formValuesRef.current = formValues;
  const onChangeFormValue = useCallback(
    (field: keyof FormValues) => (_value: any) => {
      const value = _.get(_value, "target.value", _value);
      setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
    },
    []
  );

  const canSubmit = Boolean(
    formValues.lon && formValues.lat && formValues.name && formValues.password
  );

  const handleSubmit = useCallback(async () => {
    const resultUrl = await registerTreasure(
      formValuesRef.current as FormValues
    );
    setTreasureUrl(resultUrl);
  }, []);

  const latLng = useLatLng();

  return (
    <Column className={styles.root}>
      <Column className={styles.formContainer}>
        <Column className={styles.fields}>
          <Row className={styles.fieldContainer}>
            <Input
              onChange={onChangeFormValue("name")}
              placeholder="宝物の名前"
            />
          </Row>
          <Row className={styles.fieldContainer}>
            <Input
              onChange={onChangeFormValue("password")}
              placeholder="キーフレーズ"
            />
          </Row>
          <Row className={styles.fieldContainer}>
            <Input
              type="value"
              onChange={onChangeFormValue("value")}
              placeholder="バリュー"
            />
          </Row>

          {latLng ? (
            <Map
              defaultLatLng={latLng}
              onChange={(position) => {
                setFormValues((values) => ({
                  ...values,
                  lat: String(position.lat),
                  lon: String(position.lng),
                }));
              }}
            />
          ) : (
            <Column className={styles.loading}>
              <LoadingBackdrop>
                <Column className={styles.loadingText}>
                  GPSを取得中です。
                </Column>
              </LoadingBackdrop>
            </Column>
          )}
        </Column>
        <Button disabled={!canSubmit} onClick={handleSubmit}>
          作成
        </Button>
        {treasureUrl && <Paragraph copyable>{treasureUrl}</Paragraph>}
      </Column>
    </Column>
  );
};

const styles = {
  root: css`
    padding: 16px;
  `,
  formContainer: css`
    width: 40vw;
  `,
  fields: css`
    padding: 8px 0px;
  `,
  fieldContainer: css`
    margin: 8px 0px;
    background-color: red;
  `,
  loading: css`
    height: 240px;
    position: relative;
  `,
  loadingText: css`
    // height: 240px;
  `,
};

export default TreasuresNew;
