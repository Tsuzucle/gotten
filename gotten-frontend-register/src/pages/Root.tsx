import { Layout as BaseLayout, Menu, MenuProps } from "antd";
import { makeVar, useReactiveVar } from "@apollo/client";
import { Outlet, Link } from "@tanstack/react-location";
import {
  AimOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import React, { Suspense, useState } from "react";
// import LoadingBackdrop from "./components/LoadingBackdrop";
import { css } from "@emotion/css";
import { screenLoadingVar } from "../state/root";
const { Header, Content, Footer, Sider } = BaseLayout;

type MenuItemType = Required<MenuProps>["items"][number];

function MenuItem(
  label: React.ReactNode,
  path: string,
  icon?: React.ReactNode
) {
  return {
    key: path,
    icon,
    label: <Link to={path}>{label}</Link>,
  } as MenuItemType;
}

const items: MenuItemType[] = [
  MenuItem("My Page", "/mypage", <UserOutlined />),
  MenuItem("Treasures", "/treasures", <EnvironmentOutlined />),
  MenuItem("New Treasure", "/treasures/new", <AimOutlined />),
];

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const loading = useReactiveVar(screenLoadingVar);

  return (
    <BaseLayout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <BaseLayout className="site-layout">
        {/* <LoadingBackdrop loading={loading}> */}
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content className={styles.content}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>Ether Lottery ©2022</Footer>
        {/* </LoadingBackdrop> */}
      </BaseLayout>
    </BaseLayout>
  );
}

const styles = {
  content: css`
    margin: 0;
  `,
};

export default Layout;
