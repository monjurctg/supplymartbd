/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Product from "./Product";
import { useDispatch } from "react-redux";
import { getProductByMore } from "../api/api";
import Spinner from "./Spinner";
import { Button, Col, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { IoHeartOutline } from "react-icons/io5";
import Theme from "../utils/Theme";

const MoreProducts = React.memo(function MoreProducts({ platform }) {
  const [product, setProduct] = useState(null);
  const [productList, setProductList] = useState(null);
  const [page, setPage] = useState(1);

  let screens = useBreakpoint();

  useEffect(() => {
    setProduct(null);
    getProductByMore(setProduct, page);
  }, [page]);

  useEffect(() => {
    if (product) {
      if (Array.isArray(productList)) {
        setProductList([...productList, ...product.data]);
      } else {

        setProductList(product.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  console.log('product', product)

  return (
    <div style={{ marginTop: "1rem" }}>
      <div
        className="flexRow align-center card nombphone"
        style={{
          padding: "0.5rem 1rem",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <IoHeartOutline size={28} color={Theme.primary} />
        <h4
          className="text-center"
          style={{ width: "100%", fontSize: "20px", fontWeight: "bold" }}
        >
          MORE TO LOVE
        </h4>
        <IoHeartOutline size={28} color={Theme.primary} />
      </div>
      {productList ? (
        <div>
          <Row gutter={screens.xs ? [] : [8, 8]}>
            {productList.map((m, l) => (
              <Col
                xxl={{ span: 4 }}
                xl={{ span: 6 }}
                xs={{ span: 12 }}
                key={m.product_code}
              >
                <Product
                  data={m}
                  imageHeight={screens.xs ? "220px" : "240px"}
                />
              </Col>

              //   <Product
              //     key={m.product_code + l}
              //     m={m}
              //     l={m.product_code}
              //     p={m.source === "taobao" ? "china" : m.source}
              //     s={"link"}
              //   />
            ))}
          </Row>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            {product ? (
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Load More
              </Button>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      ) : (
        <div className="skeletonProdCon">
          {/* <ProductLoading platform={platform} size={12} /> */}
        </div>
      )}
    </div>
  );
});
export default MoreProducts;
