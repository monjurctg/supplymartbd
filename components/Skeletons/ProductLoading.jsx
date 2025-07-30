/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Image,
  Input,
  Rate,
  Row,
  Skeleton,
  Tag,
} from "antd";
import Text from "antd/lib/typography/Text";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Product from "../../components/Product";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Theme from "../../utils/Theme";
import { getCharges, payablePercentage } from "../../utils/ShippingCharges";
import ProductDetailsImages from "../ProductDetailsImages";
import { requestData } from "../../api/requestData";

function ProductLoading({ preProduct, platform }) {
  const [type, setType] = useState("description");
  // const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);

  useEffect(() => {
    async function fetchData() {
      if (preProduct?.k) {
        let res = await requestData(
          true,
          "get",
          `/product/key-search?source=${platform ? platform : "1688"}&key=${preProduct.k ? preProduct.k : "link"
          }&q=asd`,
          null
        );
        dispatch({ type: "SET_PRODUCT", payload: res?.results });
      }
    }
    if (preProduct) {
      fetchData();
    }
  }, [platform]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const getProductSorted = (products) => {
    let filter = products.filter((el) => el.title !== preProduct.t);
    let selectedProduct = products.find((el) => el.title === preProduct.t);
    if (selectedProduct) {
      filter.unshift(selectedProduct);
    }

    console.log(filter);
    return filter && filter.length > 0 ? filter : [];
  };

  return (
    <div>
      <Row gutter={[8, 8]} style={{ margin: 0 }}>
        <Col lg={{ span: 19 }}>
          <div
            style={{
              padding: "12px",
              background: "#fff",
              paddingTop: "24px",
            }}
          >
            <Head>
              <title>{preProduct?.t}</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <meta property="og:title" content={preProduct?.t} />
              <meta property="og:image" content={preProduct?.i} />
            </Head>

            <Row gutter={[48, 16]} style={{ margin: 0 }}>
              <Col lg={{ span: 10 }}>
                <ProductDetailsImages data={{ image: preProduct?.i }} />
              </Col>
              <Col lg={{ span: 14 }}>
                <div>
                  <Text
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    {preProduct?.t}
                  </Text>

                  <div
                    className="flexCenter"
                    style={{
                      justifyContent: "flex-start",
                      marginTop: "0.275rem",
                      paddingBottom: ".75rem",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div
                      style={{
                        paddingRight: "1rem",
                        borderRight: "1px solid #eee",
                      }}
                    >
                      <span>TOTAL SOLD: {0}</span>
                    </div>
                    {/* <IoCheckmarkCircle
                      style={{
                        marginLeft: ".75rem",
                        fontSize: 20,
                        color: "#389e0d",
                      }}
                    /> */}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton.Avatar
                    active={true}
                    style={{
                      marginTop: 24,
                      width: 100,
                      borderRadius: 4,
                    }}
                    shape={"square"}
                  />
                  <Skeleton.Avatar
                    active={true}
                    style={{
                      marginTop: 18,
                      width: 200,
                      borderRadius: 4,
                      height: 16,
                    }}
                    shape={"square"}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      overflow: "auto",
                      marginTop: 16,
                    }}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
                      <Skeleton.Avatar
                        key={el}
                        active={true}
                        style={{
                          width: 52,
                          height: 52,
                          marginRight: 12,
                          marginBottom: 12,
                          borderRadius: 4,
                        }}
                        shape={"square"}
                      />
                    ))}
                  </div>
                  <Skeleton.Avatar
                    active={true}
                    style={{
                      marginTop: 18,
                      width: 160,
                      borderRadius: 4,
                      height: 16,
                    }}
                    shape={"square"}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      overflow: "auto",
                      marginTop: 16,
                    }}
                  >
                    {[0, 1, 2, 3, 4, 5].map((el) => (
                      <Skeleton.Avatar
                        key={el}
                        active={true}
                        style={{
                          width: Math.random() * (200 - 100) + 100,
                          height: 36,
                          marginRight: 12,
                          marginBottom: 12,
                          borderRadius: 4,
                        }}
                        shape={"square"}
                      />
                    ))}
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <Text
                      type="danger"
                      style={{ fontSize: "14px", fontWeight: 500 }}
                    >
                      Quantity: {1}
                    </Text>
                    <div
                      style={{
                        display: "flex",
                        margin: "1rem 0",
                      }}
                    >
                      <Button
                        type="primary"
                        icon={<MinusOutlined />}
                        size={24}
                        style={{
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          boxShadow: "none",
                        }}
                      />
                      <Input
                        value={1}
                        style={{
                          width: 64,
                          borderRadius: 0,
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                        readOnly
                      />
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size={24}
                        style={{
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}
                      />
                    </div>
                  </div>
                  <Descriptions
                    bordered
                    size="middle"
                    column={2}
                    style={{ marginTop: "1.5rem" }}
                    labelStyle={{ width: "50%" }}
                  >
                    <Descriptions.Item label={"From China"} span={2}>
                      To Bangladesh
                    </Descriptions.Item>
                    <Descriptions.Item label="Product Price" span={2}>
                      -
                    </Descriptions.Item>
                    <Descriptions.Item label="Approximate Weight" span={2}>
                      -
                    </Descriptions.Item>
                    <Descriptions.Item label="Shipping Charge" span={2}>
                      ৳ {getCharges("cn", "air")} Per 100g
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Price" span={2}>
                      ৳ Product Price + Shipping & Courier Charge
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={`Pay Now ${payablePercentage}%`}
                      span={2}
                    >
                      ৳ {0}
                    </Descriptions.Item>
                    <Descriptions.Item label="Pay on Delivery" span={2}>
                      Remaining Product Price + Shipping & Courier Charge
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </Col>
            </Row>
          </div>
          <Card
            title={
              <div>
                <Tag
                  onClick={() => {
                    if (type !== "specification") {
                      setType("specification");
                    }
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    background:
                      type === "specification" ? Theme.primary : "#fff",
                    color: type !== "specification" ? Theme.primary : "#fff",
                    cursor: "pointer",
                  }}
                >
                  Specification
                </Tag>
                <Tag
                  onClick={() => {
                    if (type !== "description") {
                      setType("description");
                    }
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    background: type === "description" ? Theme.primary : "#fff",
                    color: type !== "description" ? Theme.primary : "#fff",
                    cursor: "pointer",
                  }}
                >
                  Description
                </Tag>
              </div>
            }
            style={{ marginTop: "0.5rem" }}
          >
            <div className="productSpecification"></div>
          </Card>
        </Col>
        <Col lg={{ span: 5 }}>
          <div className="responsiveOverflow">
            <div
              className="productSliderColumn"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
              }}
            >
              {products &&
                getProductSorted(products).map((el) => (
                  <Product
                    data={el}
                    imageHeight={"240px"}
                    key={el.product_code}
                    keyword={preProduct?.k}
                  />
                ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductLoading;
