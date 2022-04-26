import React from "react";
import { List } from "antd";
import { css } from "@emotion/css";
import Typography from "antd/lib/typography";
const { Title, Text } = Typography;

type KeyValueListProps = {
  classes?: {
    root?: string;
  };
  items: {
    key: string;
    value: React.ReactNode;
  }[];
};

const KeyValueList: React.FC<KeyValueListProps> = (props) => {
  const { items, classes } = props;
  return (
    <List
      style={{ width: "100%" }}
      className={classes?.root}
      dataSource={items}
      renderItem={(item) => (
        <List.Item key={item.key}>
          <List.Item.Meta title={<Title level={4}>{item.key}:</Title>} />
          <div>
            <Text>{item.value}</Text>
          </div>
        </List.Item>
      )}
    />
  );
};

const styles = {
  root: css``,
  contents: css`
    width: 50%;
  `,
};

export default KeyValueList;
