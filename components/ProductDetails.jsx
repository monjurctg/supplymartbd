import { HeartFilled, HeartOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Descriptions, Input, notification } from "antd";
import Text from "antd/lib/typography/Text";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getUsersExtra } from "../actions/authAction";
import { requestData } from "../api/requestData";
import Price from "../components/Price";
import Variation from "../components/Variation";
import { getCharges, payablePercentage } from "../utils/ShippingCharges";
import Theme from "../utils/Theme";
import Quantity from "./Quantity";

export default function ProductDetails({ product, setExternalImage,showPrice,setShowPrice,selected,setSelected }) {
  const totalPricered = useSelector((state) => state.products.totalPrice);
  // const totalQty = useSelector((state) => state.products.totalQty);
  const [totalQty, setTotalQty] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payNow, setPayNow] = useState(0);
  const [payOnDelivery, setPayOnDelivery] = useState(0);
  const [w_out_quantity, setW_out_quantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // debugger;

  const [variation, setVariation] = useState(null);
  // console.log('variation', variation);
  const [current, setCurrent] = useState(null);
  // console.log("current",current)
  // const [totalQty, settotalQty] = useState(0)
  // console.log

  const handleQuantityChange = (type, value) => {
    if (type === "increment") {
      setW_out_quantity(prev => prev + 1);
    } else if (type === "decrement" && w_out_quantity > 1) {
      setW_out_quantity(prev => prev - 1);
    } else if (type === "input") {
     
      if (/^\d*$/.test(value)) {
        setW_out_quantity(value); 
      }
    }
  };
  
  const handleBlur = () => {
   
    const parsedValue = parseInt(w_out_quantity, 10);
    if (isNaN(parsedValue) || parsedValue < 1) {
      setW_out_quantity(1);
    } else {
      setW_out_quantity(parsedValue);
    }
  };
  

  useEffect(() => {
    if (quantity?.length > 0) {
      let total = quantity.reduce((acc, item) => acc + item.quantity, 0);
      // console.log('total', total)
      setTotalQty(total);
      dispatch({ type: "SET_TOTAL_PRODUCT", payload: total });
      // settotalQty(total)
    }
  }, [current]);

  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const router = useRouter();

  const updatePrices = () => {
    // const quantityPrice = quantity.filter(item => item.quantity > 0)?.quantity || 1;
    // const totalQuantity = quantity.reduce(
    //   (acc, item) => acc + item.quantity,
    //   0,
    // );
    // const quantityPrice2 = quantity.filter(item => item.quantity > 0)

    // debugger;
    const basePrice = totalPricered?.price || product?.regular_price;
    
    const calculatedProductPrice = basePrice * totalQty;

    const shippingCharge = getCharges("cn", "air"); // Customize if needed
    const calculatedTotalPrice = calculatedProductPrice + shippingCharge;
    // debugger;
    setProductPrice(calculatedProductPrice);
    setTotalPrice(calculatedTotalPrice);
    setPayNow((calculatedTotalPrice * payablePercentage) / 100);
    setPayOnDelivery((calculatedTotalPrice * (100 - payablePercentage)) / 100);
  };

  // Call this function inside relevant useEffect hooks or event handlers
  useEffect(() => {
    if (product && variation && quantity) {
      updatePrices();
    }
  }, [product, variation, totalQty, totalPricered]);

  useEffect(() => {
    if (product) {
      if (product?.product_details?.variations) {
        let data = Object.entries(product?.product_details?.variations)
          .map(([key, data]) => ({
            id: key,
            ...data,
          }))
          .map((item) => ({
            id: item?.id,
            stock: item?.stock,
            quantity: 0,
            variants: item?.variants,
          }));
      
        setQuantity([...data]);
      } else {
    
        const defaultProduct = {
          id: product?.id || "default", 
          stock: product?.stock || 0,
          quantity: 1,
          variants: [], 
        };
      
        setQuantity([defaultProduct]);
      }
      
      setInWishlist(product?.wishlist_id);
    }
  }, [product]);

  useEffect(() => {
    if (product?.product_details?.variations) {
      // Extract and filter variations with stock > 0
      let tempVariations = Object.entries(product?.product_details?.variations)
        .map(([key, data]) => ({
          id: key,
          ...data,
        }))
        .filter((elm) => elm.stock !== 0);
    
      if (tempVariations.length > 0) {
        let tempVariant = tempVariations[0].variants;
        let variantData = {
          ...tempVariations[0],
          quantity: 1,
        };
    
        // Set initial variation
        setVariation([variantData]);
    
        // Handle groups (if available)
        if (product?.product_details?.groups) {
          let tempGroup = Object.entries(product.product_details.groups)
            .map(([key, data]) => ({
              key: key,
              ...data,
            }))
            .filter((elm) => elm.has_image === 1);
    
          const result = tempGroup.map((item) => {
            const firstValue = Object.keys(item.values)?.[0]; // Safely get the first value
            return {
              key: item.key,
              value: firstValue,
            };
          });
    
          // Set selected groups
          setSelected([...selected, ...result]);
        }
      }
    } else {
      // Handle products without variations
      const fallbackVariant = {
        id: product?.id || "default",
        stock: product?.stock || 0,
        quantity: 1,
        variants: {}, // Empty variant data
      };
    
      setVariation([fallbackVariant]);
      setSelected([]); // No groups available
    }
    
   
    // debugger;

  }, [product?.product_details.variations]);

  useEffect(() => {
    let arr = Object.entries(selected);
    if (arr.length > 0 && product?.product_details?.variations) {
      let data = Object.entries(product?.product_details?.variations)
        .map(([key, value]) => ({
          id: key,
          ...value,
          quantity: 1,
        }))
        .find((elem) => {
          let meta = true;
          Object.entries(elem.variants).forEach(([key, el2]) => {
            // debugger;

            if (selected[key] && selected[key] !== el2) {
              meta = false;
            }
          });
          return meta;
        });
      // debugger;

      setVariation(data);
    } else {
      // debugger;

      setVariation(null);
    }
  }, [selected, product?.product_details?.variations]);

  // console.log(selected);
  // console.log(variation);

  const dispatch = useDispatch();

  const isAvailAble = (key, name) => {
    let data = [];
    if (selected && product?.product_details.variations) {
      let tempSelected = { ...selected };
      tempSelected[key] = name;

      // debugger;
      data = Object.values(product?.product_details?.variations).filter(
        (elem) => {
          let meta = true;

          // Object.entries(tempSelected).forEach((el) => {
          Object.entries(elem.variants).forEach(([key, el2]) => {
            // debugger;
            if (tempSelected[key] && tempSelected[key] !== el2) {
              meta = false;
            }
          });
          // debugger;
          if (elem.stock === 0) {
            meta = false;
          }
          // });
          return meta;
        }
      );
    }
    if (data.length === 0) {
      return false;
    } else return true;
  };

  const isAllVariationSelected = () => {
    let productGroups = product?.product_details.groups
      ? Object.values(product?.product_details.groups).length
      : 0;
    let mSelected = selected ? Object.keys(selected).length : 0;
    console.log("first", productGroups === mSelected);
    return productGroups === mSelected;
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  // const getProductPrice = (variation, percentage, type) => {
  //   let price = 0;
  //   if (variation) {
  //     let quantityPrice =
  //       quantity.find((item) => item.id === variation.id).quantity == 0
  //         ? 1
  //         : quantity.find((item) => item.id === variation.id).quantity;
  //     if (variation && variation.price) {
  //       // console.log('variation:', variation, quantityPrice)
  //       price = quantityPrice * variation.price;
  //     } else {
  //       price = product.regular_price * quantityPrice;
  //     }

  //     price =
  //       type === 'floor'
  //         ? Math.round(Math.floor(price * (percentage / 100)))
  //         : Math.round(price * (percentage / 100));
  //   }

  //   // debugger;
  //   return price;
  // };

  const addToCartFn = async () => {
    // console.log('product', product);
    let data = {
      product: product.id,
      shipping_method: "air",
      product_code: product?.product_code,
      source: product?.source,
      // qty:current
    };
    let total;
    if(product?.product_details?.variations){

    if (quantity) {
      total = quantity
        .filter((item) => item?.quantity > 0 && item?.stock > 0)
        .reduce((acc, item) => acc + item.quantity, 0);

     
          
      data.variations = JSON.stringify(
        quantity
          .filter((item) => item?.quantity > 0 && item?.stock > 0)
          .map((item) => ({
            variation_id: item.id,
            qty: item.quantity,
          }))
      );
      
          
        }
    data.qty = total;
    
       

    }else{
      data.qty = w_out_quantity
      data.variation=[]

    }
    setLoading("cart");
  
    // debugger;

    let res = await requestData(true, "post", "/user/carts", data);
    // console.log(res);
    if (res) {
      dispatch(getUsersExtra());
      openNotificationWithIcon(
        "success",
        "Success",
        "Product added successfully"
      );
    } else {
      openNotificationWithIcon("error", "Failed", "Failed to add product");
    }
    setLoading(false);
  };

  const updateWishlistFn = async () => {
    setWishlistLoading(true);
    let data = {
      product_code: product.product_code,
      source: 1688,
      title: product.title,
      price: product.regular_price,
      image: product.image,
    };
    setWishlistLoading(true);

    if (!inWishlist) {
      let res = await requestData(true, "post", "/user/wish-list", data);
     
      if (res) {
        dispatch(getUsersExtra());
        setInWishlist(res.wishlist_id);
        openNotificationWithIcon(
          "success",
          "Success",
          "Product added successfully"
        );
      } else {
        openNotificationWithIcon("error", "Failed", "Failed to add product");
      }
    } else {
      let res = await requestData(
        true,
        "delete",
        `/user/wish-list/${inWishlist}`
      );
      if (res) {
        dispatch(getUsersExtra());
        setInWishlist(false);
        openNotificationWithIcon(
          "success",
          "Success",
          "Product removed successfully"
        );
      } else {
        openNotificationWithIcon("error", "Failed", "Failed to remove product");
      }
    }

    setWishlistLoading(false);
  };

  const buyNowFn = async () => {
    let data = {
      product: product.id,
      shipping_method: "air",
      product_code: product?.product_code,
      source: product?.source,
    };

    let total;
    if (quantity) {
      total = quantity
        .filter((item) => item?.quantity > 0 && item?.stock > 0)
        .reduce((acc, item) => acc + item.quantity, 0);

      data.variations = JSON.stringify(
        quantity
          .filter((item) => item?.quantity > 0 && item?.stock > 0)
          .map((item) => ({
            variation_id: item.id,
            qty: item.quantity,
          }))
      );
    }
    data.qty = total;

    data.direct_checkout = true;
    setLoading("buying");
    // debugger;

    // debugger;
    if (data?.qty > 0) {
      let res = await requestData(true, "post", "/user/carts", data);
      // console.log("res",res)
      // debugger;

      if (res) {
        let cartIds = [res.cart.id];
        let idString = btoa(JSON.stringify(cartIds));
        router.push(`/checkout/` + idString);
      } else {
        openNotificationWithIcon("error", "Failed", "Failed to purchase");
      }
    } else {
      openNotificationWithIcon("error", "Failed", "Please select quantity");
      setLoading(false);
    }
  };

  // console.log("product?.regular_price",product,"variation.price",variation.price)
  return (
    <div className="mt1">
      {/* {!screens.xs ? ( */}
      {true ? (
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <Price
              price={showPrice}
              textStyle={{ fontSize: 22, fontWeight: 500 }}
            />
            {/* <Price
              price={
                totalPricered?.price
                  ? totalPricered.price
                  : product?.regular_price
              }
              textStyle={{ fontSize: 22, fontWeight: 500 }}
            /> 
            {/* {variation?.price && (
      <div
        style={{
          display: 'flex',
          height: '20px',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            textDecoration: 'line-through',
            color: '#aaa',
            marginRight: 16,
            fontSize: '16px',
          }}
        >
          ৳ {product.regular_price}
        </span>
      </div>
    )} */}
          </div>
          
          {!product?.product_details?.variations && (
            <div> 
              <div style={{ display: 'flex', margin: '1rem 0', justifyContent: 'center' }}>
                <Button
                  type="primary"
                  icon={<MinusOutlined />}
                  size="large"
                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, boxShadow: 'none' }}
                  onClick={() => handleQuantityChange("decrement")}
                />
                <Input
                  value={w_out_quantity}
                  onChange={(e) => handleQuantityChange("input", e.target.value)}
                  onBlur={handleBlur}
                  style={{ width: 64, borderRadius: 0, textAlign: 'center' }}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  onClick={() => handleQuantityChange("increment")}
                />
              </div>
              <p style={{ textAlign: 'center' }}>{product?.product_details?.simple_data?.stock} in stock</p>
              </div>
      )}
          

          {product?.product_details?.groups && Object.values(product?.product_details?.groups)?.length > 0 &&
            Object.entries(product?.product_details?.groups)
              .map(([key, data]) => {
                return {
                  key,
                  ...data,
                };
              })
              ?.map((group, index) => {
                if (index === 0) {
                  return (
                    <div
                      key={index}
                      style={group.has_image ? {} : { marginBottom: "1rem" }}
                    >
                      <div style={{ marginBottom: "0.5rem" }}>
                        <Text
                          type="danger"
                          style={{ fontSize: "14px", fontWeight: 500 }}
                        >
                          {group.key}
                        </Text>
                        <Text
                          style={{
                            fontSize: "14px",
                            marginLeft: 6,
                            fontWeight: 500,
                          }}
                        >
                          : {selected?.length > 0 && selected[0].value}
                        </Text>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          flexDirection: "column",
                        }}
                        data-id={group}
                      >
                        <Variation
                          // idx={idx}
                          // Use idx as fallback if name isn't unique
                          showPrice={showPrice}
                        
                          elements={product?.product_details.groups}
                          el={group}
                          isAvailAble={isAvailAble}
                          setCurrent={setCurrent}
                          setVariation={setVariation}
                          selected={selected}
                          setSelected={setSelected}
                          setExternalImage={setExternalImage}
                          variation={variation}
                          mainVariant={product?.product_details?.variations}
                          quantity={quantity}
                          setQuantity={setQuantity}
                        />
                      </div>
                    </div>
                  );
                }
              })}
        </div>
      ) : (
        <div>
          {variation && isAllVariationSelected() ? (
            <Price
              price={
                variation.sale_price
                  ? variation.sale_price
                  : variation.regular_price
              }
              textStyle={{ fontSize: 22, fontWeight: 500 }}
              containerStyle={{ marginBottom: "1rem" }}
            />
          ) : (
            <div>
              {variation ? (
                <h2 style={{ color: "#b00" }}>Please select all variations</h2>
              ) : (
                <Price
                  price={
                    product.sale_price
                      ? product.sale_price
                      : product.regular_price
                  }
                  textStyle={{ fontSize: 22, fontWeight: 500 }}
                  containerStyle={{ marginBottom: "1rem" }}
                />
              )}
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#eee",
              padding: "8px",
            }}
            onClick={() => {
              setDrawer(true);
            }}
          >
            <span>
              Choose from{" "}
              {product?.product_details?.variations
                ? product?.product_details.variations.length
                : 0}{" "}
              variations
            </span>
            <div
              style={{
                background: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 6,
                borderRadius: 32,
              }}
            >
              <IoChevronForward
                size={16}
                style={{
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <Descriptions
          bordered
          size="middle"
          column={2}
          style={{ marginTop: "1.5rem" }}
          labelStyle={{ width: "50%" }}
        >
          <Descriptions.Item
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "none",
                }}
              >
                <span>From China</span>
                <img
                  src="https://flagcdn.com/w20/cn.png" // URL to the China flag image
                  alt="China"
                  style={{ marginLeft: "8px", width: "24px" }}
                />
              </div>
            }
            span={2}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>To Bangladesh</span>
              <img
                src="https://flagcdn.com/w20/bd.png" // URL to the Bangladesh flag image
                alt="Bangladesh"
                style={{ marginLeft: "8px", width: "24px" }}
              />
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Product Quantity" span={2}>
            {totalQty}
          </Descriptions.Item>
          <Descriptions.Item label="Product Price" span={2}>
            ৳ {productPrice}
          </Descriptions.Item>

          <Descriptions.Item label="Shipping charge" span={2}>
            ৳730/1130kg
          </Descriptions.Item>
          <Descriptions.Item label="Total Price" span={2}>
            ৳ {totalPrice} + Shipping & Courier Charge
          </Descriptions.Item>
          <Descriptions.Item label={`Pay Now ${payablePercentage}%`} span={2}>
            ৳ {payNow}
          </Descriptions.Item>
          <Descriptions.Item label="Pay on Delivery" span={2}>
            ৳ {payOnDelivery} + Shipping & Courier Charge
          </Descriptions.Item>

          <Descriptions.Item label="Product code" span={2}>
            {product?.product_code}
          </Descriptions.Item>
          <Descriptions.Item label="Approximate weight" span={2}>
            {parseFloat(
              product?.weight * (totalQty > 0 ? totalQty : 1)
            ).toFixed(2)}{" "}
            kg
          </Descriptions.Item>
        </Descriptions>
        <div className="productAction">
          <Button
            className="wishListBtn"
            type={"default"}
            icon={
              inWishlist ? (
                <HeartFilled style={{ fontSize: 20, color: "red" }} />
              ) : (
                <HeartOutlined style={{ fontSize: 20 }} />
              )
            }
            style={{ height: 44, marginRight: "1rem" }}
            loading={wishlistLoading}
            onClick={async () => {
              updateWishlistFn();
            }}
          >
            <span className="btnText">{inWishlist ? "Saved" : "Save"}</span>
          </Button>
          <Button
            loading={loading === "cart"}
            onClick={async () => {
              addToCartFn();
            }}
            type="primary"
            style={{
              height: 44,
              marginRight: "1rem",
              flex: 1,
              backgroundColor: Theme.textBlack,
            }}
          >
            Add To Cart
          </Button>
          <Button
            type="default"
            style={{
              height: 44,
              backgroundColor: Theme.primary,
              color: "white",
              flex: 1,
            }}
            loading={loading === "buying"}
            onClick={async () => {
              buyNowFn();
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
