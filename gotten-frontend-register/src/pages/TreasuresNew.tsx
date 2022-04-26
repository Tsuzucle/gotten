import { css } from "@emotion/css";
import _ from "lodash";
import { Button, Input } from "antd";
import React, { useCallback, useRef, useState } from "react";

import { Column, Row, Map } from "../components";

type FormValues = {
  name: string;
  password: string;
  lot: string;
  lon: string;
};

const TreasuresNew: React.FC = () => {
  const [formValues, _setFormValues] = useState<Partial<FormValues>>({});
  const formValuesRef = useRef(formValues);
  formValuesRef.current = formValues;
  const setFormValues = useCallback(
    (field: keyof FormValues) => (_value: any) => {
      const value = _.get("target.value", _value, _value);
      _setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
    },
    []
  );

  const canSubmit = Boolean(
    formValues.lon && formValues.lot && formValues.name && formValues.password
  );

  const handleSubmit = useCallback(() => {
    console.log(formValuesRef.current);
  }, []);

  return (
    <Column className={styles.root}>
      <Column className={styles.formContainer}>
        <Column className={styles.fields}>
          <Row className={styles.fieldContainer}>
            <Input onChange={setFormValues("name")} placeholder="宝物の名前" />
          </Row>
          <Row className={styles.fieldContainer}>
            <Input
              type="password"
              onChange={setFormValues("password")}
              placeholder="キーフレーズ"
            />
          </Row>
          <Map />
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
};

export default TreasuresNew;
