import { ClockCircleOutlined } from '@ant-design/icons';
import {
  Avatar,
  Card,
  Col,
  Comment,
  Descriptions,
  Empty,
  Image as MyImage,
  Row,
  Tag,
  Timeline,
} from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { requestData } from '../../../api/requestData';
import OrderInfo from '../../../components/OrderDetails/OrderInfo';
import Spinner from '../../../components/Spinner';
import Status from '../../../components/Status';
import withAuth from '../../../config/withAuth';

function OrderDetails() {
  const [data, setData] = useState(null);
  const router = useRouter();
  let code = router?.query?.code;

  useEffect(() => {
    if (code) {
      async function fetchData() {
        let res = await requestData(true, 'get', '/user/orders/' + code);
        setData(res?.data);
      }
      fetchData();
    }
  }, [code]);
  if (!data)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (data) {
    return (
      <div style={{ paddingBottom: '2rem' }}>
        <Row
          gutter={[8, 8]}
          style={{
            margin: 0,
            marginTop: '8px',
          }}
        >
          <Col xl={{ span: 16 }}>
            <OrderInfo order={data} />
            <Card title="Products" style={{ marginTop: '0.5rem' }}>
              <div className="cartImage">
                <MyImage
                  src={data.image}
                  alt=""
                  style={{ objectFit: 'cover', height: 64 }}
                  preview={false}
                />
                <p className="cartTitle">{data.title}</p>
              </div>
              {data.items.map((p) => (
                <div key={p.variation_id}>
                  <div key={p.variation_id} className="cartVariationContainer">
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {Object.entries(JSON.parse(p?.variation)).map(
                        (key, value) => (
                          <span
                            key={key}
                            style={{
                              marginRight: '1rem',
                              fontWeight: 500,
                            }}
                          >
                            {key} : {value}
                          </span>
                        ),
                      )}
                    </div>
                    <p>{}</p>
                    <p>
                      <span>{p.qty}</span> X
                      <span
                        style={{
                          color: '#b00',
                          fontWeight: 600,
                          marginLeft: '0.5rem',
                        }}
                      >
                        ৳ {p.price}
                      </span>
                    </p>
                    <p
                      style={{
                        color: '#b00',
                        fontWeight: 600,
                      }}
                    >
                      Total: ৳ {p.price * p.qty}
                    </p>
                  </div>
                </div>
              ))}
            </Card>
            <Row style={{ marginTop: '0.75rem', background: '#fff' }}>
              <Col md={{ span: 12 }} xs={{ span: 24 }}></Col>
              <Col
                md={{ span: 12 }}
                xs={{ span: 24 }}
                style={{ background: 'red' }}
              >
                <div>
                  <div style={{ background: '#fff' }}>
                    <p
                      style={{
                        padding: '16px',
                        borderBottom: '1px solid #eee',
                        marginBottom: 0,
                      }}
                    >
                      Summary
                    </p>
                    <div className="tableRow">
                      <span>Item Subtotal</span>
                      <span>৳ {data.sub_total}</span>
                    </div>
                    <div className="tableRow">
                      <span>Discount</span>
                      <span>
                        {data.discount_amount ? data.discount_amount : 0}
                      </span>
                    </div>
                    <div className="tableRow brTop">
                      <span>After Discount</span>
                      <span>
                        {data.discount_amount
                          ? data.sub_total - data.discount_amount
                          : data.sub_total}
                      </span>
                    </div>
                    <div className="brTop">
                      {data.fees.map((el) => (
                        <div className="tableRow" key={el._id}>
                          <span>{el.fee?.name}</span>
                          <span>+ ৳ {el.amount}</span>
                        </div>
                      ))}
                    </div>
                    <div className="tableRow brTop">
                      <span>Grand Total</span>
                      <span>৳ {data.grand_total}</span>
                    </div>
                    <div className="tableRow">
                      <span>Deposit Amount</span>
                      <span>- ৳ {data.deposit_amount}</span>
                    </div>
                    <div className="tableRow brTop">
                      <span>Due Amount</span>
                      <span>৳ {data.grand_total - data.deposit_amount}</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={{ span: 8 }} xs={{ span: 24 }}>
            <Card title="Notes" style={{ marginBottom: '0.75rem' }}>
              {data?.notes.length > 0 ? (
                data?.notes.map((p, k) => (
                  <Comment
                    key={p.id}
                    author={
                      <div
                        style={{ marginRight: '1rem', marginBottom: '0.5rem' }}
                      >
                        <Text
                          type="success"
                          strong
                          style={{ fontSize: '14px' }}
                        >
                          {p.added_by?.name ?? 'System'}
                        </Text>
                        <br />
                        <Text type="secondary" strong>
                          {moment(p.created_at).format('Do MMM YYYY hh:mm A')}
                        </Text>
                      </div>
                    }
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: 'gray',
                          verticalAlign: 'middle',
                        }}
                        gap={2}
                        size="default"
                      >
                        {p.added_by?.name.charAt(0) ?? 'S'}
                      </Avatar>
                    }
                    content={
                      <p dangerouslySetInnerHTML={{ __html: p.message }}></p>
                    }
                  />
                ))
              ) : (
                <Empty />
              )}
            </Card>
            <div style={{ marginBottom: '0.75rem' }}>
              <Card title="Payments">
                {data?.payments.length > 0 ? (
                  <div>
                    {data?.payments.map((p, k) => (
                      <Descriptions
                        bordered
                        column={1}
                        key={p.id}
                        size="small"
                        style={{
                          marginBottom: '1rem',
                          border: '1px solid #ddd',
                          borderRadius: 4,
                        }}
                      >
                        <Descriptions.Item label="Payment">
                          <div>
                            <Status
                              type={'payment_method'}
                              name={p.payment_method}
                            />
                          </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Payment Date">
                          {moment(p.createdAt).format('DD MMM YYYY, hh:mm A')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Amount">
                          <Tag color="red">৳ {p.amount}</Tag>
                        </Descriptions.Item>
                        {p.txn_id && (
                          <Descriptions.Item label="TXN ID">
                            {p.txn_id}
                          </Descriptions.Item>
                        )}
                        {p.bank_txn_id && (
                          <Descriptions.Item label="Bank TXN ID">
                            {p.bank_txn_id}
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                    ))}
                  </div>
                ) : (
                  <Empty />
                )}
              </Card>
            </div>
            <Card title="Order Tracking" style={{ marginTop: '0.75rem' }}>
              <Timeline>
                {data?.status_log?.map((p, k) => (
                  <Timeline.Item
                    key={k}
                    dot={
                      <ClockCircleOutlined className="timeline-clock-icon" />
                    }
                  >
                    <div>
                      <span>{p.status?.name}</span>
                      <p style={{ fontSize: '13px' }}>
                        at
                        <span style={{ color: '#b00', marginLeft: '0.5rem' }}>
                          {moment(new Date(p.created_at)).format(
                            'DD/MM/YYYY - hh:mm A',
                          )}
                        </span>
                      </p>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <h4>Product Not Found</h4>;
  }
}

export default withAuth(OrderDetails);
