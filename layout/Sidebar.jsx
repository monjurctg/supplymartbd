import React from "react";
import { Layout, Menu } from "antd";
import SideMenu from "./SideMenu";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useRouter } from "next/router";
import AccountMenu from "../components/AccountMenu";
const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SideBar(props) {
  const screens = useBreakpoint();
  let router = useRouter();

  return (
    <>
      <div
        className="noScrollBar sideBar"
        style={{
          overflow: "auto",
          height: "calc(100vh - 64px)",
          position: "fixed",
          top: "64px",
          zIndex: 1,
          left: 0,
          bottom: 0,
          backgroundColor: "white",
          overflowX: "hidden",
          fontSize: "14px",
          borderRight: "1px solid #eee",
        }}
      >
        {router.pathname.includes("account") ? <AccountMenu /> : <SideMenu />}
      </div>
    </>
  );
}
