import { Card, Col, Descriptions, Row, Tag } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import React from 'react';
import Status from '../Status';

export default function OrderInfo({ order }) {
  let screens = useBreakpoint();
  return (
    <div>
      <Card>
        <Row gutter={[12, 12]}>
          <Col xs={{ span: 24 }} xl={{ span: 24 }} xxl={10}>
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              General Information
            </Text>
            <Descriptions
              bordered
              size="middle"
              column={1}
              style={{ marginTop: '1rem' }}
            >
              <Descriptions.Item label="Order ID">
                <Tag color="#d4380d">
                  {order.order_code ? order.order_code : order.id}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Order Date">
                {moment(order.created_at).format('MMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Source">
                {order.source === 'taobao' ? 'china' : order.source}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Status name={order.status.name} />
              </Descriptions.Item>
              <Descriptions.Item label="Grand Total">
                ৳ {order.grand_total}
              </Descriptions.Item>
              <Descriptions.Item label="Weight">
                {order.weight ? order.weight : '--'}
              </Descriptions.Item>
              <Descriptions.Item label="Deposit Amount">
                {order.deposit_amount ? order.deposit_amount : 0}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 24 }} xxl={14}>
            <Text style={{ fontWeight: 'bold' }}>Billing Information</Text>
            <Descriptions
              bordered
              size="middle"
              column={2}
              style={{ marginTop: '1rem' }}
            >
              <Descriptions.Item label="Name" span={2}>
                {order.user ? order.user.name : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number" span={2}>
                {order.user ? order.user.phone : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={2}>
                {order.user ? order.user.email : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="District" span={screens.xs ? 2 : 1}>
                {order?.district ?? '-'}
              </Descriptions.Item>
              <Descriptions.Item label="City" span={screens.xs ? 2 : 1}>
                {order.city ?? '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Road" span={screens.xs ? 2 : 1}>
                {order.address ?? '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label="Shipping Rate"
                span={screens.xs ? 2 : 1}
              >
                {order.shipping_rate ? order.shipping_rate : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Shipping Method" span={2}>
                <Tag style={{ textTransform: 'capitalize' }} color="#000">
                  {order.shipping_method ? order.shipping_method : '-'}
                </Tag>
                {order.shipping_date}
              </Descriptions.Item>
              <Descriptions.Item label="Delivery Method" span={2}>
                <Tag style={{ textTransform: 'capitalize' }} color="#000">
                  {order.delivery_method ? order.delivery_method : '-'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
