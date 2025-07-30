import React from "react";
import useSWR from "swr";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Button, Card, Carousel, Image } from "antd";
import Text from "antd/lib/typography/Text";
import Price from "./Price";
import Product from "./Product";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductSlider() {
  return (
    <Image
      src={require("../assets/banner/popup1.jpg").default.src}
      alt=""
      className="sideImage"
      style={{
        objectFit: "cover",
        borderRadius: 4,
        margin: 0,
        border: "1px solid #ddd",
        // boxShadow:
        //   "rgb(63 63 68 / 10%) 0px 0px 0px 1px, rgb(63 63 68 / 24%) 0px 0px 8px 0px",
      }}
      // width={"100%"}
      // height={"100%"}
      preview={false}
    />
  );
}
