import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import {
  IoChevronForwardCircle,
  IoChevronBackCircleSharp,
} from "react-icons/io5";

export default function SearchTags({ data }) {
  const ref = useRef();

  console.log(data);

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <IoChevronBackCircleSharp
        size={28}
        style={{
          marginRight: 8,
          cursor: "pointer",
        }}
        onClick={() => {
          if (ref && ref.current) ref.current.scrollBy(-500, 0);
        }}
      />
      <div className="responsiveOverflow" ref={ref} style={{ flex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            overflow: "auto",
            alignItems: "center",
          }}
        >
          {data.map((p, k) => (
            <Link key={p} href={"/shop/china/" + p}>
              <div
                style={{
                  padding: "0.355rem 0.975rem",
                  backgroundColor: "#ddd",
                  borderRadius: "10px",
                  marginRight: "0.75rem",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                  }}
                >
                  {p}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <IoChevronForwardCircle
        size={28}
        style={{ cursor: "pointer", marginLeft: 8 }}
        onClick={() => {
          if (ref && ref.current) ref.current.scrollBy(500, 0);
        }}
      />
    </div>
  );
}
