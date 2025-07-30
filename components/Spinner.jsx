import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Spinner({ color, size }) {
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: size ? size : 24, color: color ? color : "#000" }}
      spin
    />
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: "3rem",
      }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
}
