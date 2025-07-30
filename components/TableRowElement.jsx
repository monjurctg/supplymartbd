import React from "react";

export default function TableRowElement({ name, data, type }) {
  return (
    <div key={name} style={{ gridColumn: "span 2 / auto" }}>
      {type === "text" && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "12px", color: "#777" }} className="heading">
            {name}
          </span>
          <span style={{ textTransform: "capitalize" }}>{data}</span>
        </div>
      )}
      {type === "node" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: "12px", color: "#777" }} className="heading">
            {name}
          </span>
          <div style={{ marginTop: "0.225rem" }}>{data}</div>
        </div>
      )}
    </div>
  );
}
