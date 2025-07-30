/* eslint-disable @next/next/no-img-element */
import { PlayCircleOutlined } from "@ant-design/icons";
import { Image, Skeleton } from "antd";
import React, { useState, useEffect, useRef } from "react";

export default function ProductDetailsImages({
  data,
  externalImage,
  setExternalImage,
}) {
  const [src, setSrc] = useState(data.image);
  const [url, setUrl] = useState(null);
  const ref = useRef();
  console.log('data', data)
  useEffect(() => {
    if (externalImage) {
      setSrc(externalImage);
    } else {
      setSrc(data?.product_details?.images?.length > 0 ? data?.product_details?.images[0] : data?.image);
    }
  }, [externalImage, data]);

  console.log(url);

  return (
    <div ref={ref}>
      <div>
        {url ? (
          <div>
            <video
              autoPlay
              style={{ width: "100%" }}
              controls
              src={url}
            ></video>
          </div>
        ) : (
          <Image
            src={src + "_600x600q50.jpg"}
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
              minHeight: ref && ref.current ? ref.current.clientWidth : "auto",
            }}
          />
        )}
      </div>
      <div className="responsiveOverflow mt1">
        <div
          style={{
            display: "inline-flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            overflow: "auto",
          }}
        >
          {data?.videos && data?.videos.length > 0 && data?.images?.length > 0 && (
            <div
              onClick={() => {
                setUrl(data.videos[0]);
              }}
              style={{
                width: 64,
                height: 64,
                position: "relative",
                marginRight: 16,
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <img
                src={data?.images[0] + "_200x200q50.jpg"}
                alt=""
                style={{
                  objectFit: "cover",
                  width: 64,
                  height: 64,
                  marginRight: "1rem",
                  border: "1px solid #eee",
                  borderRadius: 4,
                }}
              // preview={false}
              />
              <div
                style={{
                  width: 64,
                  height: 64,
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlayCircleOutlined style={{ color: "#fff", fontSize: 24 }} />
              </div>
            </div>
          )}

          {data?.product_details?.images?.length > 0
            ? data?.product_details?.images.map((el) => (
              <img
                key={el}
                src={el + "_200x200q50.jpg"}
                onClick={() => {
                  setUrl(null);
                  if (setExternalImage) {
                    setExternalImage("");
                  }
                  setSrc(el);
                }}
                alt=""
                style={{
                  objectFit: "cover",
                  width: 64,
                  height: 64,
                  marginRight: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: 4,
                }}
              // preview={false}
              />
            ))
            : [0, 1, 2, 3, 4, 5].map((el) => (
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
