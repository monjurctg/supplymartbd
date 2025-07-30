/* eslint-disable @next/next/no-img-element */
import { Card, Tooltip, Typography, Image } from "antd";
import React, { useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import Price from "../components/Price";
import { encode, decode } from "js-base64";
import { useDispatch } from "react-redux";
import ProductLoading from "./Skeletons/ProductLoading";

export default function Product({ data, imageHeight, keyword }) {
  const dispatch = useDispatch();

  const getDiscount = (regular, sale) => {
    let discount = ((regular - sale) / regular) * 100;
    return Math.round(discount);
  };

  return (
    <div
      onClick={() => {
        if (data) {
          let mData = {
            t: data.title,
            i: data.image,
          };
          if (keyword) {
            mData.k = keyword;
          }
          dispatch({ type: "SET_PRODUCT_INFO", payload: mData });
        }
      }}
    >
      {data ? (
        <Link href={`/product/${"china"}/${data?.product_code}`}>
          <div>
            <div
              style={{
                height: "100%",
                display: "flex",
                borderRadius: 0,
                width: "100%",
                border: "1px solid #eee",
                cursor: "pointer",
                backgroundColor: "#fff",
                flexDirection: "column",
                padding: "10px",
              }}
              size="small"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={data.img + "_310x310q50.jpg"}
                  alt=""
                  style={{
                    objectFit: "cover",
                    height: imageHeight,
                    width: "100%",
                  }}
                />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <Tooltip
                  title={data.title}
                  color="#fff"
                  overlayInnerStyle={{ color: "#000" }}
                >
                  <div
                    style={{
                      height:
                        data.sale_price &&
                          getDiscount(data.regular_price, data.sale_price) > 0
                          ? "20px"
                          : "40px",
                      overflow: "hidden",
                    }}
                  >
                    <Typography.Text>{data.title}</Typography.Text>
                  </div>
                </Tooltip>
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                {data.sale_price ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Price
                      price={data.sale_price}
                      type={"danger"}
                      textStyle={{ fontWeight: 600 }}
                    />
                    {data.total_sold && (
                      <span style={{ fontSize: "12px" }}>
                        SOLD: {data.total_sold}
                      </span>
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Price
                      price={data.regular_price}
                      type={"danger"}
                      textStyle={{ fontWeight: 600 }}
                    />
                    {data.total_sold && (
                      <span style={{ fontSize: "12px" }}>
                        SOLD: {data.total_sold}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                {data.sale_price &&
                  getDiscount(data.regular_price, data.sale_price) > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      height: "20px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#aaa",
                        marginRight: 16,
                      }}
                    >
                      ৳ {data.regular_price}
                    </span>
                    <span
                      style={{
                        backgroundColor: "rgb(255, 230, 230)",
                        color: "#c10",
                        fontSize: "12px",
                        padding: "2px 6px",
                        borderRadius: 4,
                        fontWeight: "bold",
                      }}
                    >
                      {getDiscount(data.regular_price, data.sale_price)}% Off
                    </span>
                  </div>
                ) : (
                  <div style={{ height: "0px" }}></div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            borderRadius: 0,
            width: "100%",
            border: "1px solid #eee",
            cursor: "pointer",
            backgroundColor: "#fff",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: imageHeight,
              width: "100%",
              backgroundColor: "#eee",
            }}
          ></div>
          <div style={{ marginTop: "1rem" }}>
            <div
              style={{
                height: "20px",
                overflow: "hidden",
                background: "#eee",
                width: "100%",
              }}
            ></div>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <div
              style={{
                height: "20px",
                overflow: "hidden",
                background: "#eee",
                width: 100,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
