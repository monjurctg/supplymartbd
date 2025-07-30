import { Button, Card, Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Product from "./Product";
import {
  IoChevronForwardCircle,
  IoChevronBackCircleSharp,
} from "react-icons/io5";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import url from "../utils/url";
import { requestData } from "../api/requestData";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductContainer({
  keyword,
  platform,
  containerStyle,
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let res = await requestData(
        true,
        "get",
        `/product/key-search?source=${platform ? platform : "1688"}&key=${keyword ? keyword : "link"
        }`,
        null
      );
      setData(res);
    }
    fetchData();
  }, [keyword, platform]);

  const ref = useRef();

  return (
    <Card
      title={keyword.toUpperCase()}
      style={{ marginTop: "0.5rem" }}
      headStyle={{ border: "none" }}
      bodyStyle={{ ...{ padding: 0 }, ...containerStyle }}
      extra={
        <div>
          <IoChevronBackCircleSharp
            size={28}
            style={{ marginRight: 8, cursor: "pointer" }}
            onClick={() => {
              if (ref && ref.current) ref.current.scrollBy(-1000, 0);
            }}
          />
          <IoChevronForwardCircle
            size={28}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (ref && ref.current) ref.current.scrollBy(1000, 0);
            }}
          />
        </div>
      }
    >
      <div className="responsiveOverflow" ref={ref}>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            overflow: "auto",
          }}
        >
          <>
            {data ? (
              data.results?.map((el) => (
                <div className="productHolder" key={el.product_code}>
                  <Product data={el} imageHeight={220} keyword={keyword} />
                </div>
              ))
            ) : (
              <>
                {[...Array(12)].map((el, i) => (
                  <div className="productHolder" key={i}>
                    <Product data={null} imageHeight={220} />
                  </div>
                ))}
              </>
            )}
          </>
        </div>
      </div>
    </Card>
  );
}
