import { Button, Card, Col, Empty, Row, Tag, Typography } from 'antd';
import Text from 'antd/lib/typography/Text';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestData } from '../../../api/requestData';
import Product from '../../../components/Product';
import ProductDetails from '../../../components/ProductDetails';
import ProductDetailsImages from '../../../components/ProductDetailsImages';
import ProductSkeleton from '../../../components/ProductSkeleton';
import Spinner from '../../../components/Spinner';
import { getCookie } from '../../../utils/cookiesHandler';
import Theme from '../../../utils/Theme';
import url from '../../../utils/url';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Code({ product }) {
  const router = useRouter();
  const [externalImage, setExternalImage] = useState('');
  const [type, setType] = useState('specification');
  const [description, setDescription] = useState(null);
  const products = useSelector((state) => state.products.data);
  const totalQty = useSelector((state) => state.products.totalQty);
  const [showPrice, setShowPrice] = useState(product?.regular_price);

  const [selected, setSelected] = useState([]);

  const { search, platform } = router.query;
  let rating = 4.5;
  const [data, setData] = useState(null);

  let mKeyword = '';

  try {
    mKeyword = decodeURIComponent(search);
  } catch (error) { }

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (products && products.length > 0) {
        setData(products);
      } else {
        let finalPlatform = platform === 'china' ? 'taobao' : 'taobao';
        let res = await requestData(
          true,
          'get',
          `/product/key-search?source=1688&key=${search && search !== undefined
            ? search
            : product?.category?.name && product?.category?.name !== undefined
              ? product.category.name
              : 'link'
          }`,
          null,
        );
        dispatch({ type: 'SET_PRODUCT', payload: res?.results });

        setData(res?.results);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform, search]);


  useEffect(() => {

    if (product?.product_details?.ranges>0) {
      if (totalQty > 0) {
        // console.log("product?.product_details?.ranges > 0 && totalQty > 0:", totalQty)

        let price = product?.product_details?.ranges.find((range, key) => {
          // console.log('key', key)/
          const nextMinimumQty =
            product?.product_details?.ranges[key + 1]?.minimum_qty || Infinity;

          // Check if the current range is active
          const isActive = totalQty >= range?.minimum_qty && totalQty < nextMinimumQty;
          if (isActive) {
            return range
          }
        })

        // console.log("price",price)

        dispatch({ type: "SET_TOTAL_PRICE", payload: price });
        setShowPrice(price?.price)

      }
    }
    else {
      if(product?.product_details?.variations){
        const result = Object.entries(product?.product_details?.variations).find(([key, value]) => value.variants[selected[0]?.key] === selected[0]?.value);
        if (result) {
          const [id, details] = result;
      
          dispatch({ type: "SET_TOTAL_PRICE", payload: details?.price });
          setShowPrice(details?.price)
        } else {
          console.log("No object found with the specified key and value.");
        }

      }
    }

  }, [totalQty,selected])


  useEffect(() => {
    async function execute(params) {
      if (type === 'description' && !description) {
        if (product.description) {
          setDescription(product.description);
        } else {
          let res = await requestData(
            true,
            'get',
            `/product/description/${product.product_code}`,
          );
          // product/description/{product_code}
          console.log('description res', res);
          //debugger;
          setDescription(res);
        }
      }
    }
    execute();
  }, [type, description, product]);

  if (!product || product.error === 9)
    return (
      <div
        style={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Empty description={<span>Product not found</span>}>
          <Button type="primary">Return</Button>
        </Empty>
      </div>
    );

  const getProductSorted = (products) => {
    let filter = products.filter((el) => el.title !== product?.title);
    let selectedProduct = products.find((el) => el.title === product?.title);
    if (selectedProduct) {
      filter.unshift(selectedProduct);
    }
    return filter && filter.length > 0 ? filter : [];
  };
  
  


  return (
    <div>
      {product && (
        <div>
          <Row gutter={[8, 8]} style={{ margin: 0 }}>
            <Col lg={{ span: 19 }}>
              <div
                style={{
                  padding: '12px',
                  background: '#fff',
                  paddingTop: '24px',
                }}
              >
                <Head>
                  <title>{product.title}</title>
                  <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                  />
                  <meta property="og:title" content={product.title} />
                  <meta
                    property="og:image"
                    content={product?.images?.length > 0 && product.images[0]}
                  />
                </Head>

                <Row gutter={[48, 16]} style={{ margin: 0 }}>
                  <Col lg={{ span: 10 }}>
                    <ProductDetailsImages
                      data={product}
                      setExternalImage={setExternalImage}
                      externalImage={externalImage}
                    />
                  </Col>
                  <Col lg={{ span: 14 }}>
                    <div>
                      <Text
                        style={{
                          fontSize: '16px',
                          fontWeight: 500,
                        }}
                      >
                        {product.title}
                      </Text>

                      <div
                        style={{
                          display: 'flex',

                          justifyContent: 'justify-between',
                          gap: 10,
                        }}
                      >
                        {product?.product_details?.ranges?.length > 0 &&
                          product?.product_details?.ranges.map((range, key) => {
                            // console.log('key', key)/
                            const nextMinimumQty =
                              product?.product_details?.ranges[key + 1]?.minimum_qty || Infinity;

                            // Check if the current range is active
                            const isActive = totalQty >= range?.minimum_qty && totalQty < nextMinimumQty;
                            // console.log('nextKey', totalQty,"isActive:",isActive, "prod:",product?.product_details?.ranges[nextKey]?.minimum_qty)

                            return <div
                              key={product.id}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: ' 30%',

                                border: '1px solid #eee',
                                padding: 10,
                                borderRadius: 8,
                                marginBottom: 10,
                                marginTop: 10,
                                backgroundColor: isActive ? '#167389' : '#f4f4f4',
                                color: isActive ? '#fff' : '#000',

                              }}
                            >
                              <p
                                style={{
                                  fontSize: 20,
                                  fontWeight: 600,
                                  margin: 0,
                                }}
                              >
                                ৳{range?.price}
                              </p>
                              <p>{range?.minimum_qty} or more</p>
                            </div>
                          })}
                      </div>

                      <div
                        className="flexCenter"
                        style={{
                          justifyContent: 'flex-start',
                          marginTop: '0.275rem',
                          paddingBottom: '.75rem',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        <div
                          style={{
                            paddingRight: '1rem',
                            borderRight: '1px solid #eee',
                          }}
                        >
                          <span>TOTAL SOLD: {product?.total_sold}</span>
                        </div>
                        {/* <IoCheckmarkCircle
                          style={{
                            marginLeft: ".75rem",
                            fontSize: 20,
                            color: !product.is_verified ? "#ddd" : "#389e0d",
                          }}
                        /> */}
                      </div>
                      <ProductDetails
                      setSelected={setSelected}
                      selected={selected}
                        showPrice={showPrice}
                        product={product}
                        setExternalImage={setExternalImage}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <Card
                title={
                  <div>
                    <Tag
                      onClick={() => {
                        if (type !== 'specification') {
                          setType('specification');
                        }
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background:
                          type === 'specification' ? Theme.primary : '#fff',
                        color:
                          type !== 'specification' ? Theme.primary : '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      Specification
                    </Tag>
                    <Tag
                      onClick={() => {
                        if (type !== 'description') {
                          setType('description');
                        }
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background:
                          type === 'description' ? Theme.primary : '#fff',
                        color: type !== 'description' ? Theme.primary : '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      Description
                    </Tag>
                  </div>
                }
                style={{ marginTop: '0.5rem' }}
              >
                {type === 'description' && !description ? (
                  <Spinner />
                ) : (
                  <div
                    className="productSpecification"
                    dangerouslySetInnerHTML={{
                      __html:
                        type === 'description'
                          ? description
                          : product.product_specification,
                    }}
                  ></div>
                )}
              </Card>
            </Col>
            <Col lg={{ span: 5 }}>
              <div>
                <Card>
                  <Typography.Title
                    style={{
                      fontWeight: '600',
                      fontSize: '20px',
                      borderBottom: '.25px solid #000',
                      paddingBottom: '5px',
                      textAlign: 'center',
                    }}
                  >
                    শিপিং চার্জ
                  </Typography.Title>
                  <Typography.Text
                    style={{ fontWeight: '800', fontSize: '16px' }}
                  >
                    ক্যাটাগরিঃ এ - ৭৩০ টাকা প্রতি কেজি
                  </Typography.Text>
                  <Typography.Paragraph
                    style={{
                      lineHeight: '1.75',
                      fontWeight: '400',
                      marginTop: '.5rem',
                    }}
                  >
                    প্রতি কেজি জুতা, ব্যাগ, জুয়েলারী,যন্ত্রপাতি, স্টিকার,
                    ইলেকট্রনিক্স, কম্পিউটার এক্সেসরীস, সিরামিক, ধাতব, চামরা,
                    রাবার,প্লাস্টিক জাতীয় পন্য, ব্যাটারি ব্যাতিত খেলনা।
                  </Typography.Paragraph>
                  <Typography.Text
                    style={{ fontWeight: '800', fontSize: '16px' }}
                  >
                    ক্যাটাগরিঃ বি - ১১০০ টাকা প্রতি কেজি
                  </Typography.Text>
                  <Typography.Paragraph
                    style={{
                      lineHeight: '1.75',
                      fontWeight: '400',
                      marginTop: '.5rem',
                    }}
                  >
                    ব্যাটারি জাতীয় যেকোণ পন্য, ডুপ্লিকেট ব্রান্ড বা কপিঁ পন্য,
                    জীবন্ত উদ্ভিদ, বীজ,রাসায়নীক দ্রব্য, খাদ্য,নেটওয়ার্কিং আইটেম,
                    ম্যাগনেট বা লেজার জাতীয় পন্য।
                  </Typography.Paragraph>
                  <Typography.Text
                    style={{ fontWeight: '800', fontSize: '16px' }}
                  >
                    ক্যাটাগরিঃ সি
                  </Typography.Text>
                  <Typography.Paragraph
                    style={{
                      lineHeight: '1.75',
                      fontWeight: '400',
                      marginTop: '.5rem',
                    }}
                  >
                    পোশাক বা যেকোন গার্মেন্টস আইটেম ৮৫০/-টাকা ,খাদ্য ১২০০ টাকা,
                    ছাতা ৮০০,হিজাব /ওড়না ৮৫০ টাকা,পাউডার ১২০০,সানগ্লাস-৩৫০০ ,সি
                    সি ক্যামেরার ১৫০০ টাকা,তরল পণ্য বা কসমেটিক্স ১১৫০ টাকা, শুধু
                    ব্যাটারি বা পাওয়ার ব্যাংক ১৩৫০ টাকা, স্মার্ট ওয়াচ ১২০০
                    টাকা , সাধারন ঘড়ি ১১০০ টাকা , Bluetooth হেডফোন ১১০০ টাকা
                  </Typography.Paragraph>
                </Card>
                <div
                  className="productSliderColumn"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '150vh',
                  }}
                >
                  {data && data.length > 0
                    ? getProductSorted(data).map((el) => (
                      <Product
                        data={el}
                        imageHeight={'240px'}
                        key={el.product_code}
                      />
                    ))
                    : [...Array(50)].map((el) => <ProductSkeleton key={el} />)}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ query, req, res }) {
  let product = null;
  const token = getCookie('site_jwt', req, true);
  try {
    let finalPlatform = query.platform === 'china' ? 'taobao' : query.platform;
    const res = await axios({
      method: 'get',
      url: `${url}/product/details?source=1688&product_code=${query.code}`,
      // headers: {
      //   Authorization: token ? "Bearer " + token : "",
      //   azobit: 404,
      // },
    });

    console.log('resdata', res.data);
    product = res.data.data;
  } catch (error) {
    console.log(error.response);
  }

  return { props: { product } };
}

export default Code;
