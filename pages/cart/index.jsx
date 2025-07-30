import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Input,
  Image as MyImage,
  notification,
  Row,
} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { requestData } from "../../api/requestData";
import emptyCart from "../../assets/vector/empty_cart.svg";
import Price from "../../components/Price";
import Spinner from "../../components/Spinner";
import withAuth from "../../config/withAuth";
import { getCharges, payablePercentage } from "../../utils/ShippingCharges";
import CartItemControls from "../../components/cart/CartItemControls";

const QuantityInput = ({ el, p, updateCart }) => {
  const [tempValue, setTempValue] = useState(p.qty.toString()); // Temp state

  const handleInputChange = (value) => {
    // Allow empty or numeric input
    if (value === "" || /^[0-9]+$/.test(value)) {
      setTempValue(value);
    }
  };

  const handleBlur = () => {
    // On blur, validate and update cart
    const qty = parseInt(tempValue, 10);

    if (!isNaN(qty) && qty > 0) {
      // Valid quantity: update cart
      p.qty = qty; // Update qty in p
      const prevVariations = [...el.variations];
      const currentVariation = prevVariations.find(
        (variation) => variation.variation_id === p.variation_id
      );

      if (currentVariation) {
        currentVariation.qty = qty;

        const data = prevVariations
          .filter((variation) => variation.qty > 0)
          .map(({ variation_id, qty }) => ({ variation_id, qty }));

        updateCart(el.id, { variations: data });
      }
    } else {
      // Invalid or empty: revert to last known valid qty
      setTempValue(p.qty.toString());
    }
  };

  return (
    <Input
      value={tempValue} // Controlled by temp state
      style={{
        width: 64,
        borderRadius: 0,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
      onChange={(e) => handleInputChange(e.target.value)} // Update temp value
      onBlur={handleBlur} // Validate and update on blur
    />
  );
};


function Cart() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(null);
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const [subtotal, setSubtotal] = useState(0);
  const [reload, setReload] = useState(1);

  const screens = useBreakpoint();

  const dispatch = useDispatch();

  async function fetchData() {
    setLoading(true);
    let res = await requestData(true, "get", "/user/carts", null);

    // debugger;
    setLoading(false);
    if (res && res[1688]) {
      let mSelected = [];
      let mData = [];

      res[1688].forEach((el) => {
        let safe = true;
        if (el.variations?.length > 0) {
          el.variations.forEach((el2) => {
            if (!el2.variation_id) {
              safe = false;
            }
          });
        } else {
          if (!el.product.regular_price) {
            safe = false;
          }
        }
        if (safe) {
          mSelected.push(el);
          mData.push(el);
        } else {
          // debugger;

          let tempEl = { ...el };
          tempEl.faulty = true;
          mData.push(tempEl);
        }
      });

      setData({ result: mData });
      console.log({ mData });
      // debugger;
      setSelected({ result: mSelected });
    } else {
      setData({ result: [] });
      setSelected({ result: [] });
    }
  }

  function getPrice(quantity, ranges, reguler) {
    // Sort the ranges by minimum_qty in descending order

    if (ranges?.length > 0) {
      ranges.sort((a, b) => b.minimum_qty - a.minimum_qty);

      // Loop through the sorted ranges and find the correct price for the given quantity
      for (let range of ranges) {
        if (quantity >= range.minimum_qty) {
          return range.price;
        }
      }
    }

    // If no range matches, return the regular price
    return reguler;
  }

  useEffect(() => {
    fetchData();
  }, [reload]);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const updateCart = async (id, data) => {
    setLoading(true);
    if (data?.status === "cancelled") {
      await requestData(true, "delete", `/user/carts/${id}`);
      fetchData();
      setReload(Math.random() + 100);
      return;
    }
    const payload = {
      variations: JSON.stringify(data.variations),
      qty: data?.qty,
    };
    await requestData(true, "put", `/user/carts/${id}`, payload);
    fetchData();
    setLoading(false);
  };

  useEffect(() => {
    if (selected && selected.result) {
      let subtotal = 0;
      selected?.result?.forEach((el) => {
        let qty = el?.variations?.length > 0 ? el?.variations[0]?.qty : el?.qty;
        let saleprice = getPrice(
          qty,
          el?.product?.product_details?.ranges,
          el?.product?.regular_price
        );
        if (el.variations?.length > 0) {
          el.variations.forEach((el2) => {
            if (el2?.variation_id) {
              // let total = el2.variation?.sale_price
              //   ? el2.variation?.sale_price * el2.qty
              //   : el2.variation?.regular_price * el2.qty;
              // subtotal = subtotal + total;

              let total =
                el.product?.sale_price !== 0
                  ? saleprice * el2.qty
                  : saleprice * el2.qty;
              subtotal = subtotal + total;
            }
          });
        } else {
          let total = el.product?.sale_price
            ? el.product?.sale_price * el.qty
            : el.product?.regular_price * el.qty;
          subtotal = subtotal + total;
        }
      });
      setSubtotal(subtotal);
    }
  }, [selected]);

  const getChecked = (el) => {
    // console.log(selected);

    if (selected && selected.result) {
      let index = selected.result.findIndex((s) => s.id === el.id);
      if (index >= 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleQuantityChange = async (change, el, p) => {
    console.log(el,"el test")
  
    if (!el.variations || el.variations.length === 0 || loading) return;
  
    const prevVariations = [...el.variations];
    const currentVariation = prevVariations.find(
      (variation) => variation.variation_id === p.variation_id
    );
  
    if (currentVariation) {
      currentVariation.qty = Math.max(currentVariation.qty + change, 1); // Prevent qty from going below 1
  
      const data = prevVariations
        .filter((variation) => variation.qty > 0)
        .map(({ variation_id, qty }) => ({ variation_id, qty }));

        console.log({data})
  
      updateCart(el.id, { variations: data });
    }
  };
  

  const getPercentagePrice = (price, percentage, type) => {
    let finalPrice = Math.round(price * (percentage / 100));

    if (type === "floor") {
      finalPrice = Math.floor(price * (percentage / 100));
    }

    return finalPrice;
  };

  if (!data)
    return (
      <div>
        <Row gutter={[12, 12]} style={{ margin: 0 }}>
          <Col xs={{ span: 24 }}>
            <div
              style={{
                background: "#fff",
                padding: 16,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "16px" }}>Cart</span>
              <span>{moment(new Date()).format("DD/MM/YYYY hh:mm A")}</span>
            </div>
          </Col>
          <Col md={{ span: 18 }} xs={{ span: 24 }}>
            <Card style={{ height: "400px" }}>
              <Spinner />
            </Card>
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <Card style={{ height: "200px" }}></Card>
          </Col>
        </Row>
      </div>
    );
  if (data && data?.result) {
    return (
      <div>
        <Row gutter={[12, 12]} style={{ margin: 0 }}>
          <Col xs={{ span: 24 }}>
            <div
              style={{
                background: "#fff",
                padding: 16,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "16px" }}>Cart</span>
              <span>{moment(new Date()).format("DD/MM/YYYY hh:mm A")}</span>
            </div>
          </Col>
          <Col xl={{ span: 15 }} xxl={{ span: 16 }} xs={{ span: 24 }}>
            <Card
              title="Cart Items"
              // extra={"Select All"}
              bodyStyle={{
                padding: 0,
              }}
            >
              {data.result.length > 0 ? (
                data.result.map((el, i) => {
                  let qty = el?.variations?.length > 0 ? el?.variations[0]?.qty : el?.qty;
                  
                 
                  let saleprice = getPrice(
                    qty,
                    el?.product?.product_details?.ranges,
                    el?.product?.regular_price
                  );
                  return (
                    <div
                      key={el.id}
                      className="cartList"
                      style={{
                        paddingTop: "1.5rem",
                        position: "relative",
                      }}
                    >
                      {el.faulty ? (
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                            backgroundColor: "rgba(0,0,0,0.8)",
                            zIndex: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <span style={{ color: "#fff" }}>
                            This product is unavailable or changed by the seller
                          </span>
                          <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            size={24}
                            style={{ marginTop: "1rem" }}
                            onClick={() => {
                              if (!loading) {
                                updateCart(el.id, {
                                  status: "cancelled",
                                });
                              }
                            }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {!el.faulty && (
                        <Checkbox
                          style={{ marginRight: "1.5rem" }}
                          checked={getChecked(el)}
                          onChange={() => {
                            let index = selected.result.findIndex(
                              (s) => s.id === el.id
                            );
                            let tempSelect = [...selected.result];
                            if (index >= 0) {
                              tempSelect.splice(index, 1);
                              setSelected({ result: tempSelect });
                            } else {
                              tempSelect.push(el);
                              setSelected({ result: tempSelect });
                            }
                          }}
                        ></Checkbox>
                      )}
                      <div className="cartImage">
                        <MyImage
                          src={el.product.image}
                          alt=""
                          style={{ objectFit: "cover", height: 64 }}
                          preview={true}
                        />
                      </div>

                      <div className="productDetails">
                        <p className="cartTitle">{el.product.title}</p>
                        <div></div>
                        {el.variations && el.variations.length > 0 ? (
                          el.variations.map((p, l) => (
                            <div
                              style={{
                                alignItems: "center",
                              }}
                              key={p.variation_id}
                              className="cartVariationContainer"
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {/* {console.log({ qty: el?.qty })} */}
                                {el.product.product_details?.variations[
                                  p.variation_id
                                ]?.variants &&
                                  Object.entries(
                                    el.product.product_details?.variations[
                                      p.variation_id
                                    ]?.variants
                                  ).map(([key, val]) => (
                                    <span
                                      key={key}
                                      style={{
                                        marginRight: "1rem",
                                        fontWeight: 500,
                                      }}
                                    >
                                      {key}: {val}
                                    </span>
                                  ))}
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  width: "100%",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    marginBottom: "0.275rem",
                                  }}
                                >
                                  <Button
                                    type="primary"
                                    icon={<MinusOutlined />}
                                    size={24}
                                    disabled={p.qty === 1}
                                    style={{
                                      borderTopRightRadius: 0,
                                      borderBottomRightRadius: 0,
                                      boxShadow: "none",
                                    }}
                                    onClick={() =>
                                      handleQuantityChange(-1, el, p)
                                    }
                                  />
                                  <Input
                                    value={p.qty}
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
                                    onClick={() =>
                                      handleQuantityChange(1, el, p)
                                    }
                                  />
                                </div>

                              
                                {/* {console.log(el?.product?.product_details)} */}
                                <Price
                                  // price={
                                  //   el?.product?.sale_price !== 0
                                  //     ? el?.product?.sale_price
                                  //     : el?.product?.regular_price
                                  // }
                                  price={saleprice}
                                  textStyle={{
                                    color: "#b00",
                                    fontWeight: 600,
                                    fontSize: "13px",
                                  }}
                                />
                              </div>
                              <p style={{ display: "flex" }}>
                                Total:{" "}
                                <Price
                                  price={
                                    el?.product?.sale_price !== 0
                                      ? saleprice * p.qty
                                      : saleprice * p.qty
                                  }
                                  textStyle={{
                                    color: "#b00",
                                    fontWeight: 600,
                                    marginLeft: "0.5rem",
                                  }}
                                />
                              </p>
                              <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                size={24}
                                style={{ marginLeft: "1rem" }}
                                // onClick={() => {
                                //   if (!loading) {
                                //     updateCart(el.id, {
                                //       status: "cancelled",
                                //     });
                                //   }
                                // }}
                                onClick={async () => {
                                  if (
                                    el.variations &&
                                    el.variations.length > 1 &&
                                    !loading
                                  ) {
                                    let prevVariations = [...el.variations];
                                    let currentVariation = prevVariations.find(
                                      (i) => p.variation_id === i.variation_id
                                    );
                                    if (currentVariation) {
                                      if (true) {
                                        currentVariation.qty = 0;

                                        let data = [];
                                        prevVariations.forEach((el) => {
                                          if (el.qty > 0) {
                                            data.push({
                                              variation_id: el.variation_id,
                                              qty: el.qty,
                                            });
                                          }
                                        });
                                        updateCart(el.id, {
                                          variations: data,
                                        });
                                      }
                                    }
                                  } else {
                                    if (!loading) {
                                      updateCart(el.id, {
                                        status: "cancelled",
                                      });
                                    }
                                  }
                                }}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="cartVariationContainer">
                            <div></div>
                            <p>
                              <Price
                                price={
                                  el.product.sale_price
                                    ? el.product.sale_price
                                    : el.product.regular_price
                                }
                                textStyle={{ color: "#b00", fontWeight: 600 }}
                              />
                            </p>
                            <div>
                              <CartItemControls el={el} loading={loading} updateCart={updateCart}/>
                              {/* <div
                                style={{
                                  display: "flex",
                                  marginRight: "1rem",
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
                                  onClick={() => {
                                    if (!loading) {
                                      if (el.qty > 1) {
                                        updateCart(el.id, { qty: el.qty - 1 });
                                      } else {
                                        updateCart(el.id, {
                                          qty: el.qty,
                                          status: "cancelled",
                                        });
                                      }
                                    }
                                  }}
                                />
                                <Input
                                  value={el.qty}
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
                                  onClick={() => {
                                    if (!loading) {
                                      updateCart(el.id, { qty: el.qty + 1 });
                                    }
                                  }}
                                />
                                <Button
                                  type="danger"
                                  icon={<DeleteOutlined />}
                                  size={24}
                                  style={{ marginLeft: "1rem" }}
                                  onClick={() => {
                                    if (!loading) {
                                      updateCart(el.id, {
                                        status: "cancelled",
                                      });
                                    }
                                  }}
                                />
                              </div> */}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    height: 400,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image src={emptyCart} alt="" width={300} />
                </div>
              )}
            </Card>
          </Col>
          <Col xl={{ span: 9 }} xxl={{ span: 8 }} xs={{ span: 24 }}>
            <div
              style={{
                background: "#fff",
                padding: "0.75rem",
              }}
            >
              <Descriptions
                bordered
                size="middle"
                column={2}
                labelStyle={{ width: "50%" }}
                style={screens.xs ? {} : { marginBottom: "1rem" }}
              >
                <Descriptions.Item label={"Shipping Charge"} span={2}>
                  <div style={{ display: "flex" }}>
                    <Price
                      price={getCharges("cn", "air")}
                      textStyle={{
                        fontSize: "14px",
                        fontWeight: 600,
                        marginRight: 8,
                      }}
                    />{" "}
                    Per 100g
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Total Price" span={2}>
                  <Price
                    price={subtotal}
                    textStyle={{
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  />
                </Descriptions.Item>
                <Descriptions.Item
                  label={`Pay now (${payablePercentage}%)`}
                  span={2}
                >
                  <Price
                    price={getPercentagePrice(
                      subtotal,
                      payablePercentage,
                      null
                    )}
                    textStyle={{
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Pay on Delivery" span={2}>
                  <Price
                    price={
                      subtotal -
                      getPercentagePrice(subtotal, payablePercentage, null)
                    }
                    textStyle={{
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  />{" "}
                  + Shipping & Courier Charges
                </Descriptions.Item>
              </Descriptions>
              <div
                style={
                  screens.xs
                    ? {
                        padding: 16,
                        background: "#fff",
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 12,
                        width: "100% ",
                      }
                    : {}
                }
              >
                <Button
                  type="primary"
                  loading={loading}
                  disabled={subtotal <= 0}
                  onClick={() => {
                    if (selected.result && selected.result.length > 0) {
                      let cartIds = [];
                      selected.result.forEach((el) => {
                        cartIds.push(el.id);
                      });
                      // console.log(cartIds);
                      let idString = btoa(JSON.stringify(cartIds));
                      router.push(`/checkout/` + idString);
                    }
                  }}
                  size="large"
                  style={{
                    width: "100%",
                  }}
                >
                  {loading ? "Processing" : "Checkout"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <h4>Cart Not Found</h4>;
  }
}

// export async function getServerSideProps(context) {
//   const json = await requestData(context, "get", "/user/carts", null);
//   return {
//     props: {
//       data: json,
//     }, // will be passed to the page component as props
//   };
// }

export default withAuth(Cart);
