import { Card, Col, Row } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Text from 'antd/lib/typography/Text';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { chinaCategories } from '../utils/ChinaCategories';
import Theme from '../utils/Theme';

export default function CategoryGrid() {
  const screens = useBreakpoint();
  return (
    <Card
      title="Category"
      style={{ marginTop: '0.5rem' }}
      bodyStyle={{ padding: 0 }}
    >
      <Row gutter={[0, 0]}>
        {chinaCategories.map((el) => (
          <Col xl={{ span: 4 }} xxl={{ span: 2 }} xs={{ span: 8 }} key={el.id}>
            <Link href={'/shop/china/' + el.name}>
              {/* Use a <div> directly as the child, not <a> */}
              <div
                style={{
                  borderRadius: '0px',
                  backgroundColor: '#fff',
                  padding: '0.5rem',
                  height: 128,
                  borderRight: '1px solid #eee',
                  borderTop: '1px solid #eee',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: Theme.primaryHighlight,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Image
                    src={require(`../assets/vector/${el.icon}.svg`).default}
                    width={36}
                    height={80}
                    objectFit="contain"
                    alt=""
                  />
                  <Text
                    style={{
                      height: 48,
                      textAlign: 'center',
                      fontSize: '13px',
                    }}
                  >
                    {el.name}
                  </Text>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Card>
  );
}
