/* eslint-disable @next/next/no-img-element */
import { Card, Col, Pagination, Row, Select } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Text from 'antd/lib/typography/Text';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Product from '../../../components/Product';
import ProductSkeleton from '../../../components/ProductSkeleton';
import SearchTags from '../../../components/SearchTags';
import url from '../../../utils/url';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Search() {
  const router = useRouter();
  const { search, page, platform } = router.query;
  const [history, setHistory] = useState([]);

  const screens = useBreakpoint();

  // let endpoint = `product/key-search`;
  // let img_src = null;
  // if (search?.includes('img')) {
  //   endpoint = `product/search-by-image`;
  //   img_src = search;
  // }

  // const { data, error } = useSWR(
  //   `${url}/${endpoint}?source=${'1688'}&key=${
  //     search ? search : 'link'
  //   }&img_src=${img_src}&page=${page ? page : 1}`,
  //   fetcher,
  // );

  let endpoint = `product/key-search`;
  let img_src = null;
  let swrOptions = {};

  if (search?.includes('img')) {
    endpoint = `product/search-by-image`;
    img_src = search;

    // Configure for POST request
    swrOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: '1688',
        img_src: img_src,
        key: search,
        page: page || 1,
      }),
    };
  }

  const { data, error } = useSWR(
    endpoint === 'product/search-by-image'
      ? [`${url}/${endpoint}`, swrOptions] // Pass options for POST
      : `${url}/${endpoint}?source=${'1688'}&key=${
          search || 'link'
        }&img_src=${img_src}&page=${page || 1}`, // Default GET
    fetcher,
  );

  console.log(data);
  let mKeyword = '';

  try {
    mKeyword = decodeURIComponent(search);
  } catch (error) {}

  useEffect(() => {
    if (search) {
      let mSearch = decodeURIComponent(search);
      let prev = JSON.parse(localStorage.getItem('history'))
        ? JSON.parse(localStorage.getItem('history'))
        : [];
      if (prev.includes(mSearch)) {
        let wPrev = prev.filter((el) => el !== mSearch);
        prev = [...[mSearch], ...wPrev];
      } else {
        prev = [...[mSearch], ...prev];
      }
      setHistory(prev);
      localStorage.setItem('history', JSON.stringify(prev));
    }
  }, [search]);

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div>
        <Card
          title={
            <Text style={{ fontSize: '14px' }}>
              Showing
              <Text type="danger" style={{ margin: '0 0.35rem' }}>
                {0}
              </Text>
              results for {search}
            </Text>
          }
          style={{ marginBottom: '.5rem' }}
          bodyStyle={{ padding: '0.5rem' }}
          extra={
            <Select style={{ width: 200 }} defaultValue={'all'}>
              <Select.Option value={'all'}>Default</Select.Option>
            </Select>
          }
        >
          {history.length > 0 && <SearchTags data={history} />}
        </Card>
        <Row gutter={[8, 8]}>
          {[...Array(50)].map((el) => (
            <Col lg={{ span: 4 }} xs={{ span: 12 }} key={Math.random()}>
              <ProductSkeleton />
            </Col>
          ))}
        </Row>
      </div>
    );

  if (data && data.results && data.results.length > 0) {
    return (
      <div>
        <Card
          title={
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: '14px' }}>
                Showing
                <Text type="danger" style={{ margin: '0 0.35rem' }}>
                  {data.total_products}
                </Text>
                results for {search}
              </Text>
              <Select style={{ width: 160 }} defaultValue={'all'}>
                <Select.Option value={'all'}>Default</Select.Option>
              </Select>
            </div>
          }
          style={{ marginBottom: '0.5rem' }}
          bodyStyle={{ padding: '0.75rem' }}
        >
          {history.length > 0 && <SearchTags data={history} />}
        </Card>
        <Row gutter={screens.xs ? [] : [8, 8]}>
          {data &&
            data.results &&
            data.results.map((el) => (
              <Col
                xxl={{ span: 4 }}
                xl={{ span: 6 }}
                xs={{ span: 12 }}
                key={el.product_code}
              >
                <Product
                  data={el}
                  imageHeight={screens.xs ? '220px' : '240px'}
                  keyword={mKeyword}
                />
              </Col>
            ))}
        </Row>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          <Pagination
            defaultCurrent={page ? parseInt(page) : 1}
            current={page ? parseInt(page) : 1}
            total={1500}
            pageSize={48}
            onChange={(e) => {
              router.push(`/shop/${platform}/${search}?page=${e}`);
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: '100%',
          height: '92vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={require('../../../assets/vector/empty.svg').default.src}
          style={{
            width: '300px',
            maxWidth: '100%',
          }}
          alt=""
        />
      </div>
    );
  }
}
