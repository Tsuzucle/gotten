import { css } from "@emotion/css";
import _ from "lodash";
import { Button, Input } from "antd";
import React, { useCallback, useRef, useState } from "react";

import { Column, Row, Map, LoadingBackdrop } from "../components";
import useLatLng from "../hooks/useLatLng";

type FormValues = {
  name: string;
  password: string;
  lat: string;
  lon: string;
};

const TreasuresNew: React.FC = () => {
  const [formValues, setFormValues] = useState<Partial<FormValues>>({});
  const formValuesRef = useRef(formValues);
  formValuesRef.current = formValues;
  const onChangeFormValue = useCallback(
    (field: keyof FormValues) => (_value: any) => {
      const value = _.get("target.value", _value, _value);
      setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
    },
    []
  );

  const canSubmit = Boolean(
    formValues.lon && formValues.lat && formValues.name && formValues.password
  );

  const handleSubmit = useCallback(() => {
    console.log(formValuesRef.current);
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
              type="password"
              onChange={onChangeFormValue("password")}
              placeholder="キーフレーズ"
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
            <LoadingBackdrop loading={true}>
              <Column className={styles.loadToGeo}>GPSを取得中です。</Column>
            </LoadingBackdrop>
          )}
        </Column>
        <Button disabled={!canSubmit} onClick={handleSubmit}>
          作成
        </Button>
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
  loadToGeo: css`
    height: 240px;
  `,
};

export default TreasuresNew;
