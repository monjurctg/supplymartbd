import React from "react";
import { Divider, Layout, Menu } from "antd";
import { ApiOutlined } from "@ant-design/icons";
import { chinaCategories } from "../utils/ChinaCategories";
import Image from "next/image";
import Link from "next/link";
const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SideMenu({ setDrawer }) {
  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        style={{ borderRight: "none", fontSize: "14px" }}
      >
        {chinaCategories.length > 0 &&
          chinaCategories.map((p, k) => {
            return p.sub && p.sub.length > 0 ? (
              <SubMenu
                style={{ padding: ".175rem" }}
                key={p.id + p.name}
                id={p.id}
                icon={
                  p.icon ? (
                    <div
                      style={{ marginRight: "0.5rem", marginTop: "0.65rem" }}
                    >
                      <Image
                        className="sidebarImage"
                        width={20}
                        src={require(`../assets/vector/${p.icon}.svg`).default}
                        alt=""
                      />
                    </div>
                  ) : (
                    ""
                  )
                }
                title={<span>{p.name}</span>}
              >
                {p.sub.map((t, s) => (
                  <Menu.Item
                    key={t.id}
                    id={t.id}
                    onClick={() => {
                      if (setDrawer) {
                        setDrawer(false);
                      }
                    }}
                  >
                    <Link href={"/shop/china/" + t.name}>{t.name}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={p.name}
                id={p.id}
                onClick={() => {
                  if (setDrawer) {
                    setDrawer(false);
                  }
                }}
                icon={
                  <ApiOutlined style={{ fontSize: "16px", width: "18px" }} />
                }
              >
                <Link href={"/support-category"}>{p.name}</Link>
              </Menu.Item>
            );
          })}
      </Menu>
    </>
  );
}
