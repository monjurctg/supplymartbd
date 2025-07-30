import React from "react";
import Spinner from "./Spinner";

export default function ClickPreventer() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: "rgba(0,0,0,0.1)",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </div>
  );
}
