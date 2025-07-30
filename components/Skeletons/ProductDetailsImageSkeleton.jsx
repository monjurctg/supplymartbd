/* eslint-disable @next/next/no-img-element */
import { Image, Skeleton } from "antd";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";

export default function ProductDetailsImageSkeleton({ image }) {
  const ref = useRef();
  return (
    <div ref={ref}>
      <Image
        src={image}
        alt=""
        style={{
          objectFit: "cover",
          width: "100%",
          minHeight: ref && ref.current ? ref.current.clientWidth : "auto",
        }}
      />
      <div className="responsiveOverflow mt1">
        <div
          style={{
            display: "inline-flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            overflow: "auto",
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((el) => (
            <Skeleton.Avatar
              key={el}
              active={true}
              style={{ width: 64, height: 64, marginRight: 8 }}
              shape={"square"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
