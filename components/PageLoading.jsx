import { Spin } from "antd";
import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function PageLoading() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 250);
  }, []);

  return (
    <div
      style={{
        height: "36px",
        width: "36px",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        display: visible ? "flex" : "none",
        right: 36,
        bottom: 36,
        zIndex: 1100,
        borderRadius: 4,
        backgroundColor: "rgba(0,0,0,1)",
      }}
    >
      <Spin
        delay={100}
        style={{ display: "flex" }}
        indicator={
          <LoadingOutlined style={{ fontSize: 18, color: "white" }} spin />
        }
      />
    </div>
  );
}
