import React from "react";
import { Tag } from "antd";

export default function Status({ name, type, icon, onClick, color }) {
  let value = null;
  if (name && typeof name === "string") {
    if (name.toLowerCase().includes("completed")) {
      value = { name: name, color: "#237804" };
    } else if (name.toLowerCase().includes("pending")) {
      value = { name: name, color: "#8c8c8c" };
    } else if (name.toLowerCase().includes("processing")) {
      value = { name: name, color: "#d48806" };
    } else if (name.toLowerCase().includes("partially")) {
      value = { name: name, color: "#3f6600" };
    } else if (name.toLowerCase().includes("hold")) {
      value = { name: name, color: "#F8DDA7" };
    } else if (name.toLowerCase().includes("received in bd airport")) {
      value = { name: name, color: "#ad2102" };
    } else if (name.toLowerCase().includes("received in bd warehouse")) {
      value = { name: name, color: "#096dd9" };
    } else if (name.toLowerCase().includes("collect from bd warehouse")) {
      value = { name: name, color: "#9e1068" };
    } else if (name.toLowerCase().includes("on the way to delivery")) {
      value = { name: name, color: "#391085" };
    } else if (name.toLowerCase().includes("completed")) {
      value = { name: name, color: "#3f6600" };
    } else if (
      name.toLowerCase().includes("cancelled") ||
      name.toLowerCase().includes("failed") ||
      name.toLowerCase().includes("returned")
    ) {
      value = { name: name, color: "#a8071a" };
    } else if (name.toLowerCase().includes("repurchase")) {
      value = { name: name, color: "#780650" };
    } else if (name.toLowerCase().includes("rocket")) {
      value = { name: name, color: "#89288F" };
    } else if (name.toLowerCase().includes("bkash")) {
      value = { name: name, color: "#E3106E" };
    } else if (
      name.toLowerCase().includes("ssl") ||
      name.toLowerCase().includes("sundarban")
    ) {
      value = { name: name, color: "#22639C" };
    } else if (name.toLowerCase().includes("balance")) {
      value = { name: name, color: "#000" };
    } else if (name.toLowerCase().includes("nagad")) {
      value = { name: name, color: "#D41111" };
    } else if (name.toLowerCase().includes("1688")) {
      value = { name: name, color: "#ad2102" };
    } else if (name.toLowerCase().includes("alibaba")) {
      value = { name: name, color: "#FF4D74" };
    } else {
      value = { name: name, color: "#111" };
    }
  }
  return (
    <div>
      {value ? (
        <Tag
          style={
            type === "payment_method"
              ? {
                  cursor: "pointer",
                  textTransform: "capitalize",
                  marginRight: "0.5rem",
                  marginBottom: "0.5rem",
                }
              : { cursor: "pointer", textTransform: "capitalize" }
          }
          icon={icon}
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
          color={color ? color : value.color}
        >
          {value.name}
        </Tag>
      ) : (
        "--"
      )}
    </div>
  );
}
