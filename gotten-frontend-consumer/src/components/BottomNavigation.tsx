import React, { FC, useCallback } from "react";
import { TabBar } from "antd-mobile";
import {
  AimOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  {
    key: "/gotcha",
    title: "ホーム",
    icon: <EnvironmentOutlined />,
  },
  {
    key: "/find",
    title: "最初",
    icon: <AimOutlined />,
  },
  {
    key: "/mypage",
    title: "マイページ",
    icon: <UserOutlined />,
  },
];

const BottomNavigation: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const handleTabChange = useCallback(
    (value: string) => {
      navigate(value);
    },
    [location]
  );

  return (
    <TabBar onChange={handleTabChange} activeKey={pathname}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default BottomNavigation;
