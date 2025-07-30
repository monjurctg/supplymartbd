import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Image as MyImage,
  notification,
  Row,
  Select,
} from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersExtra } from '../../actions/authAction';
import { requestData } from '../../api/requestData';
import emptyCart from '../../assets/vector/empty_cart.svg';
import Price from '../../components/Price';
import Spinner from '../../components/Spinner';
import withAuth from '../../config/withAuth';
import { getCharges, payablePercentage } from '../../utils/ShippingCharges';

function Checkout() {
  const [data, setData] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let cart_ids = router?.query?.carts;
  // console.log('cart_ids', cart_ids)
  const [form] = Form.useForm();

  const screens = useBreakpoint();

  const getPercentagePrice = (price, percentage, type) => {
    let finalPrice = Math.round(price * (percentage / 100));
    if (type === 'floor') {
      finalPrice = Math.floor(price * (percentage / 100));
    }
    return finalPrice;
  };

  useEffect(() => {
    async function fetchData() {
      let idArray = cart_ids ? JSON.parse(atob(cart_ids)) : [];
      let prof = await requestData(true, 'get', '/user/profile');
      let res = await requestData(true, 'post', '/user/carts/get', {
        cart_ids: idArray,
      });
      if (res) {
        setData(res[1688]);
        setProfile(prof);
      }
    }
    fetchData();
  }, [cart_ids]);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const dispatch = useDispatch();

  const onSubmitForm = async (values) => {
    let data = { ...values };
    let idArray = cart_ids ? JSON.parse(atob(cart_ids)) : [];
    data.cart_ids = idArray;
    data.city = values.city;
    data.district = values.district;
    data.address = values.street;
    let res = await requestData(true, 'post', `/user/checkout`, data);
    console.log('res', res);
    debugger;

    // debugger;
    if (res && res.ids.length > 0) {
      setLoading(false);
      openNotificationWithIcon(
        'success',
        'Successful',
        'Order placed successfully',
      );
      let key = { from: 'checkout', data: res.ids };
      key = btoa(JSON.stringify(key));
      dispatch(getUsersExtra());
      debugger;
      router.replace('/pay?key=' + key);
    } else {
      setLoading(false);
      openNotificationWithIcon('error', 'Failed', 'Failed to place order');
    }
  };

  useEffect(() => {
    if (profile && profile.data) {
      // debugger;
      let {
        name,
        phone,
        emergency_phone,
        email,
        delivery_method,
        picture,
        address,
        city,
        district,
      } = profile.data;
      form.setFieldsValue({
        name,
        phone,
        emergency_phone,
        email,
        delivery_method,
        picture,
        city: city,
        district: district,
        street: address,
      });
    }
  }, [profile, form]);

  useEffect(() => {
    if (data && data?.length > 0) {
      let subtotal = 0;

      data.forEach((el) => {
        if (el.variations?.length > 0) {
          el.variations.forEach((el2) => {
            let total =
              el.product?.sale_price !== 0
                ? el.product?.sale_price * el2.qty
                : el.product?.regular_price * el2.qty;
            subtotal = subtotal + total;
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
  }, [data]);

  if (!data)
    return (
      <div>
        <Spinner />
      </div>
    );

  let delivery_method = [
    { name: 'Office Collection', value: 'office-collection' },
    { name: 'Sundarban', value: 'sundarban' },
    { name: 'Sa Paribahan', value: 'sa-paribahan' },
    { name: 'Redx', value: 'redx' },
    { name: 'eCourier', value: 'ecourier' },
  ];

  if (data && data?.length > 0) {
    return (
      <div>
        <Row gutter={[12, 12]} style={{ margin: 0 }}>
          <Col xs={{ span: 24 }}>
            <div
              style={{
                background: '#fff',
                padding: 16,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '16px' }}>Checkout</span>
              <span>{moment(new Date()).format('DD/MM/YYYY hh:mm A')}</span>
            </div>
          </Col>
          <Col xl={{ span: 15 }} xxl={{ span: 16 }} xs={{ span: 24 }}>
            <Card
              title="Shipping Information"
              style={{ marginBottom: '0.5rem' }}
            >
              <Form
                name="basic"
                layout="vertical"
                form={form}
                onFinish={(e) => {
                  onSubmitForm(e);
                }}
                onFinishFailed={() => {}}
              >
                <Row gutter={[16, 0]}>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[
                        {
                          required: true,
                          message: 'This field is required !',
                        },
                      ]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      rules={[
                        {
                          required: true,
                          message: 'This field is required !',
                        },
                      ]}
                    >
                      <Input placeholder="Phone" />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: 'This field is required !',
                        },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <Form.Item
                      name="emergency_phone"
                      label="Emergency Contact"
                      rules={[
                        {
                          required: true,
                          message: 'This field is required !',
                        },
                      ]}
                    >
                      <Input placeholder="Emergency Contact" />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    md={{ span: 8 }}
                    rules={[
                      {
                        required: true,
                        message: 'This field is required !',
                      },
                    ]}
                  >
                    <Form.Item
                      name="delivery_method"
                      label="Delivery Method"
                      rules={[
                        {
                          required: true,
                          message: 'This field is required !',
                        },
                      ]}
                    >
                      <Select placeholder="Select Status">
                        {delivery_method.map((el) => (
                          <Select.Option key={el.value} value={el.value}>
                            {el.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <Form.Item
                      name="district"
                      label="District"
                      rules={[
                        {
                          required: true,
                          message: 'This field is required !',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        autoComplete="none"
                        aria-autocomplete="none"
                        style={{ width: '100%' }}
                        placeholder="Select district"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children
                            .toLowerCase()
                            .localeCompare(optionB.children.toLowerCase())
                        }
                      >
                        <Select.Option value="Dhaka">Dhaka</Select.Option>
                        <Select.Option value="Barguna">Barguna</Select.Option>
                        <Select.Option value="Barisal">Barisal</Select.Option>
                        <Select.Option value="Bhola">Bhola</Select.Option>
                        <Select.Option value="Jhalokati">
                          Jhalokati
                        </Select.Option>
                        <Select.Option value="Patuakhali">
                          Patuakhali
                        </Select.Option>
                        <Select.Option value="Pirojpur">Pirojpur</Select.Option>
                        <Select.Option value="Bandarban">
                          Bandarban
                        </Select.Option>
                        <Select.Option value="Brahmanbaria">
                          Brahmanbaria
                        </Select.Option>
                        <Select.Option value="Chandpur">Chandpur</Select.Option>
                        <Select.Option value="Chittagong">
                          Chittagong
                        </Select.Option>
                        <Select.Option value="Comilla">Comilla</Select.Option>
                        <Select.Option value="Cox's Bazar">
                          {"Cox's Bazar"}
                        </Select.Option>
                        <Select.Option value="Feni">Feni</Select.Option>
                        <Select.Option value="Khagrachhari">
                          Khagrachhari
                        </Select.Option>
                        <Select.Option value="Lakshmipur">
                          Lakshmipur
                        </Select.Option>
                        <Select.Option value="Noakhali">Noakhali</Select.Option>
                        <Select.Option value="Rangamati">
                          Rangamati
                        </Select.Option>
                        <Select.Option value="Faridpur">Faridpur</Select.Option>
                        <Select.Option value="Gazipur">Gazipur</Select.Option>
                        <Select.Option value="Gopalganj">
                          Gopalganj
                        </Select.Option>
                        <Select.Option value="Kishoreganj">
                          Kishoreganj
                        </Select.Option>
                        <Select.Option value="Madaripur">
                          Madaripur
                        </Select.Option>
                        <Select.Option value="Manikganj">
                          Manikganj
                        </Select.Option>
                        <Select.Option value="Munshiganj">
                          Munshiganj
                        </Select.Option>
                        <Select.Option value="Narayanganj">
                          Narayanganj
                        </Select.Option>
                        <Select.Option value="Narsingdi">
                          Narsingdi
                        </Select.Option>
                        <Select.Option value="Rajbari">Rajbari</Select.Option>
                        <Select.Option value="Shariatpur">
                          Shariatpur
                        </Select.Option>
                        <Select.Option value="Tangail">Tangail</Select.Option>
                        <Select.Option value="Bagerhat">Bagerhat</Select.Option>
                        <Select.Option value="Chuadanga">
                          Chuadanga
                        </Select.Option>
                        <Select.Option value="Jessore">Jessore</Select.Option>
                        <Select.Option value="Jhenaidah">
                          Jhenaidah
                        </Select.Option>
                        <Select.Option value="Khulna">Khulna</Select.Option>
                        <Select.Option value="Kushtia">Kushtia</Select.Option>
                        <Select.Option value="Magura">Magura</Select.Option>
                        <Select.Option value="Meherpur">Meherpur</Select.Option>
                        <Select.Option value="Narail">Narail</Select.Option>
                        <Select.Option value="Satkhira">Satkhira</Select.Option>
                        <Select.Option value="Jamalpur">Jamalpur</Select.Option>
                        <Select.Option value="Mymensingh">
                          Mymensingh
                        </Select.Option>
                        <Select.Option value="Netrokona">
                          Netrokona
                        </Select.Option>
                        <Select.Option value="Sherpur">Sherpur</Select.Option>
                        <Select.Option value="Bogra">Bogra</Select.Option>
                        <Select.Option value="Joypurhat">
                          Joypurhat
                        </Select.Option>
                        <Select.Option value="Naogaon">Naogaon</Select.Option>
                        <Select.Option value="Natore">Natore</Select.Option>
                        <Select.Option value="Chapainawabganj">
                          Chapainawabganj
                        </Select.Option>
                        <Select.Option value="Pabna">Pabna</Select.Option>
                        <Select.Option value="Rajshahi">Rajshahi</Select.Option>
                        <Select.Option value="Sirajganj">
                          Sirajganj
                        </Select.Option>
                        <Select.Option value="Dinajpur">Dinajpur</Select.Option>
                        <Select.Option value="Gaibandha">
                          Gaibandha
                        </Select.Option>
                        <Select.Option value="Kurigram">Kurigram</Select.Option>
                        <Select.Option value="Lalmonirhat">
                          Lalmonirhat
                        </Select.Option>
                        <Select.Option value="Nilphamari">
                          Nilphamari
                        </Select.Option>
                        <Select.Option value="Panchagarh">
                          Panchagarh
                        </Select.Option>
                        <Select.Option value="Rangpur">Rangpur</Select.Option>
                        <Select.Option value="Thakurgaon">
                          Thakurgaon
                        </Select.Option>
                        <Select.Option value="Habiganj">Habiganj</Select.Option>
                        <Select.Option value="Moulvibazar">
                          Moulvibazar
                        </Select.Option>
                        <Select.Option value="Sunamganj">
                          Sunamganj
                        </Select.Option>
                        <Select.Option value="Sylhet">Sylhet</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <Form.Item
                      name="city"
                      label="City"
                      rules={[
                        {
                          required: true,
                          message: 'This field is required !',
                        },
                      ]}
                    >
                      <Input
                        rows={3}
                        placeholder="City"
                        autoComplete="none"
                        aria-autocomplete="none"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <Form.Item
                      name="street"
                      label="Street"
                      rules={[
                        {
                          required: true,
                          message: 'This field is required !',
                        },
                      ]}
                    >
                      <Input
                        rows={3}
                        placeholder="street"
                        autoComplete="none"
                        aria-autocomplete="none"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
            <Card title="Order Items" bodyStyle={{ padding: '0px' }}>
              {data.length > 0 ? (
                data.map((el, i) => (
                  <div
                    key={el.id}
                    className="cartList"
                    style={{ paddingTop: '1.5rem' }}
                  >
                    <div className="cartImage">
                      <MyImage
                        src={el.product.image}
                        alt=""
                        style={{ objectFit: 'cover', height: 64 }}
                        preview={false}
                      />
                    </div>

                    <div className="productDetails">
                      <p className="cartTitle">{el.product.title}</p>
                      <div></div>
                      {el.variations && el.variations.length > 0 ? (
                        el.variations.map((p, l) => (
                          <div
                            key={p.variation_id}
                            className="cartVariationContainer"
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              {/* {p.variation.map((t) => (
                                <span
                                  key={t.key}
                                  style={{
                                    marginRight: '1rem',
                                    fontWeight: 500,
                                  }}
                                >
                                  {t.key}: {t.value}
                                </span>
                              ))} */}
                            </div>
                            <p style={{ display: 'flex' }}>
                              <span style={{ marginRight: '6px' }}>
                                {p.qty + ' x'}
                              </span>
                              <Price
                                price={
                                  el.product.sale_price !== 0
                                    ? el.product.sale_price
                                    : el.product.regular_price
                                }
                                textStyle={{ color: '#b00', fontWeight: 600 }}
                              />
                            </p>
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
                              textStyle={{ color: '#b00', fontWeight: 600 }}
                            />
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    height: 400,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image src={emptyCart} alt="" width={300} />
                </div>
              )}
            </Card>
          </Col>
          <Col xl={{ span: 9 }} xxl={{ span: 8 }} xs={{ span: 24 }}>
            <Card title="Order Summary">
              <Descriptions
                bordered
                size="middle"
                column={2}
                labelStyle={{ width: '50%' }}
                style={screens.xs ? {} : { marginBottom: '1rem' }}
              >
                <Descriptions.Item label={'Shipping Charge'} span={2}>
                  <div style={{ display: 'flex' }}>
                    <Price
                      price={getCharges('cn', 'air')}
                      textStyle={{
                        fontSize: '14px',
                        fontWeight: 600,
                        marginRight: 8,
                      }}
                    />{' '}
                    Per kg
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Total Price" span={2}>
                  <Price
                    price={subtotal}
                    textStyle={{
                      fontSize: '14px',
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
                      null,
                    )}
                    textStyle={{
                      fontSize: '14px',
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
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  />{' '}
                  + Shipping & Courier Charges
                </Descriptions.Item>
              </Descriptions>
              <div
                style={
                  screens.xs
                    ? {
                        padding: 16,
                        background: '#fff',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 12,
                        width: '100% ',
                      }
                    : {}
                }
              >
                <Button
                  onClick={() => {
                    setLoading(true);
                    form.submit();
                  }}
                  loading={loading}
                  type="primary"
                  size="large"
                  style={{ width: '100%' }}
                >
                  Place Order
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <h4>Product Not Found</h4>;
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

export default withAuth(Checkout);
