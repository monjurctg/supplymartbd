import { Card } from "antd";
import React from "react";
import Login from "../../components/Login";

export default function index() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 128px)",
      }}
    >
      <Card style={{ width: "500px", maxWidth: "100%" }}>
        <Login />
      </Card>
    </div>
  );
}
