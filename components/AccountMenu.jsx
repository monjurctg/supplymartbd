import { Menu, Card, Row, Col, Image, Tag } from "antd";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Text from "antd/lib/typography/Text";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {
  IoHomeOutline,
  IoBagOutline,
  IoCarOutline,
  IoPeopleOutline,
  IoSettingsOutline,
  IoExitOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { requestData } from "../api/requestData";
import Cookies from "js-cookie";
import { removeCookie } from "../utils/cookiesHandler";
import { useDispatch } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

export default function AccountMenu() {
  let pathname = "";
  const screens = useBreakpoint();

  const [profile, setProfile] = useState(null);
  console.log('profile', profile)

  // const profile = useSelector((state) => state.auth.profile);

  useEffect(() => {
    var myElement = document.getElementById(pathname);
    if (myElement) {
      var pos = myElement.offsetLeft;
      document.getElementById("scrollTab").scrollLeft = pos - 16;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (document.cookie) {
        let res = await requestData(true, "get", "/user/profile");
        console.log('res', res)
        // debugger;
        setProfile(res?.data);
      }
    }
    fetchData();
  }, []);

  const dispatch = useDispatch();

  return (
    <div style={{ padding: 0, background: "#fff" }} className="accountMenu">
      <div
        style={{
          padding: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 12,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 160,
            border: "1px solid #eee",
            overflow: "hidden",
          }}
        >
          {profile?.picture ? (
            <Image
              src={profile?.picture}
              alt=""
              style={{
                width: 80,
                height: 80,
                borderRadius: 160,
              }}
            />
          ) : (
            <Avatar size={80} icon={<UserOutlined />} />
          )}
        </div>
        <Text style={{ fontSize: "16px", marginTop: 12 }}>{profile?.name}</Text>
        <Tag style={{ marginTop: "0.5rem" }} color="volcano">
          Balance: {profile?.balance}
        </Tag>
      </div>
      <Menu
        theme="light"
        mode="inline"
        style={
          !screens.xs
            ? {
              borderRight: "none",
              fontSize: "14px",
              marginBottom: 12,
            }
            : {
              borderRight: "none",
              fontSize: "14px",
              marginBottom: 12,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }
        }
      >
        <Menu.Item
          icon={<IoHomeOutline style={{ fontSize: "14px", width: "18px" }} />}>
          <Link href="/account">Dashboard</Link>
        </Menu.Item>
        <Menu.Item
          icon={<IoBagOutline style={{ fontSize: "14px", width: "18px" }} />}>
          <Link href="/account/orders">Orders</Link>
        </Menu.Item>
        <Menu.Item
          icon={<IoWalletOutline style={{ fontSize: "16px", width: "18px" }} />}>
          <Link href="/account/balance">Balance</Link>
        </Menu.Item>
        {/* <Menu.Item
          icon={<IoCarOutline style={{ fontSize: "16px", width: "18px" }} />}
        >
          <Link href="/account/delivery">Delivery</Link>
        </Menu.Item> */}
        {/* <Menu.Item
          icon={<IoPeopleOutline style={{ fontSize: "16px", width: "18px" }} />}
        >
          <Link href="/account/support">Support</Link>
        </Menu.Item> */}
        <Menu.Item
          icon={<IoSettingsOutline style={{ fontSize: "16px", width: "18px" }} />}>
          <Link href="/account/setting">Setting</Link>
        </Menu.Item>
        <Menu.Item
          icon={<IoExitOutline style={{ fontSize: "16px", width: "18px" }} />}
          onClick={() => {
            Cookies.remove("site_jwt");
            removeCookie("site_jwt");
            dispatch({
              type: "SET_USER_PROFILE",
              payload: null,
            });
            dispatch({
              type: "SET_EXTRA",
              payload: {},
            });
            window.location.href = "/";
          }}
        >
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </div>
  );
}
