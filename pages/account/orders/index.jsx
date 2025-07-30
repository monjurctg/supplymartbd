import {
  Button,
  Card,
  Checkbox,
  Col,
  Empty,
  Image,
  Input,
  Row,
  Table,
  Tag,
} from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Column from 'antd/lib/table/Column';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { requestData } from '../../../api/requestData';
import AccountMenu from '../../../components/AccountMenu';
import Price from '../../../components/Price';
import Spinner from '../../../components/Spinner';
import Status from '../../../components/Status';
import TableRowElement from '../../../components/TableRowElement';
import withAuth from '../../../config/withAuth';
import Theme from '../../../utils/Theme';
function Orders() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    filter: 'pending',
  });

  const router = useRouter();

  const screens = useBreakpoint();

  const payAll = (childs) => {
    let array = [];
    childs.forEach((m, l) => {
      array.push(m);
    });
    let key = { from: 'account', data: array };
    key = btoa(JSON.stringify(key));
    router.push('/pay?key=' + key);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let finalFilter = { page: page };
      if (filter) {
        finalFilter = { ...finalFilter, ...filter };
      }

      finalFilter = finalFilter
        ? '?' + new URLSearchParams(finalFilter).toString()
        : '';

      let res = await requestData(
        true,
        'get',
        '/user/order-filter' + finalFilter,
      );
      setData(res.data);

      setLoading(false);
    }
    fetchData();
  }, [filter, page]);

  return (
    <div>
      <Row gutter={[8, 8]} style={{ margin: 0 }}>
        {screens.xs && (
          <Col
            xs={{ span: 24 }}
            style={{
              backgroundColor: '#fff',
            }}
          >
            <AccountMenu />
          </Col>
        )}
        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
        >
          {data ? (
            <Card
              className="table"
              bodyStyle={{ padding: 0 }}
              style={{
                border: '1px solid #dedede',
              }}
            >
              <div
                style={{
                  maxWidth: '100%',
                  padding: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: screens.xs ? '2px solid #ddd' : 'none',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    marginBottom: screens.xs ? '1rem' : '0rem',
                  }}
                >
                  {['Pending', 'Processing', 'Completed', 'All'].map((el) => (
                    <Tag
                      key={el}
                      style={{
                        fontSize: '13px',
                        padding: '0.35rem 0.75rem',
                        cursor: 'pointer',
                        marginRight: '0.75rem',
                        backgroundColor:
                          filter?.filter === el.toLowerCase()
                            ? '#232F3E'
                            : '#fff',
                        color:
                          filter?.filter === el.toLowerCase() ? '#fff' : '#000',
                      }}
                      onClick={() => {
                        setPage(1);
                        setFilter({ filter: el.toLocaleLowerCase() });
                      }}
                    >
                      {el}
                    </Tag>
                  ))}
                </div>
                <Input.Search
                  placeholder="Search"
                  allowClear
                  size="middle"
                  onSearch={(value) => {
                    if (value) {
                      setFilter({
                        filter: 'all',
                        order_code: value,
                      });
                    } else {
                      setFilter({
                        filter: 'all',
                      });
                    }
                  }}
                  enterButton
                  style={{ width: '210px', marginRight: '8px' }}
                />
                {selected && selected.length > 0 && !screens.xs && (
                  <Button
                    onClick={() => {
                      payAll(selected);
                    }}
                    style={{
                      background: Theme.primaryHighlight,
                      color: '#fff',
                    }}
                  >
                    Pay Selected
                  </Button>
                )}
              </div>
              <Table
                style={{ background: '#fff' }}
                dataSource={data}
                bordered={false}
                rowKey={(record) => record.id}
                pagination={{
                  current: page,
                  pageSize: data.data ? data.data.per_page : 25,
                  total: data.data ? data.data.total : 25,
                  showSizeChanger: false,
                }}
                onChange={(page, pageSize) => {
                  setPage(page.current);
                }}
              >
                <Column
                  title="Select"
                  dataIndex="code"
                  render={(text, record, index) => (
                    <div>
                      <TableRowElement
                        name="Select"
                        data={
                          <>
                            {record?.status?.name.toLowerCase() ===
                              'pending payment' && (
                              <Checkbox
                                checked={selected.includes(record.id)}
                                onChange={(e) => {
                                  if (selected.includes(record.id)) {
                                    let temp = selected.filter(
                                      (el) => el !== record.id,
                                    );
                                    setSelected(temp);
                                  } else {
                                    let temp = [...selected];
                                    temp.push(record.id);
                                    setSelected(temp);
                                  }
                                }}
                              />
                            )}
                          </>
                        }
                        type={'node'}
                      />
                    </div>
                  )}
                />
                <Column
                  title="Image"
                  dataIndex="pcode"
                  render={(text, record, index) => (
                    <div>
                      <TableRowElement
                        name="Image"
                        data={
                          <Image
                            src={record.image}
                            alt=""
                            style={{
                              objectFit: 'cover',
                              height: 48,
                              width: 48,
                            }}
                            preview={false}
                          />
                        }
                        type={'node'}
                      />
                    </div>
                  )}
                />
                <Column
                  title="Order Date"
                  dataIndex="pcode"
                  render={(text, record, index) => (
                    <div>
                      <TableRowElement
                        name="Image"
                        data={moment(record.created_at).format(
                          'DD/MM/YY hh:mm A',
                        )}
                        type={'text'}
                      />
                    </div>
                  )}
                />
                <Column
                  title="Order Code"
                  dataIndex="pcode"
                  render={(text, record, index) => (
                    <div>
                      <TableRowElement
                        name="Image"
                        data={record.order_code}
                        type={'text'}
                      />
                    </div>
                  )}
                />

                <Column
                  title="Platform"
                  key="Platform"
                  render={(text, record) => (
                    <TableRowElement
                      name="Platform"
                      data={
                        <Status name={record.source ?? '1688'} type="source" />
                      }
                      type={'node'}
                    />
                  )}
                />
                <Column
                  title="Total"
                  dataIndex="balance"
                  render={(text, record, index) => (
                    <TableRowElement
                      name="Total"
                      data={<Price price={record.sub_total} />}
                      type={'node'}
                    />
                  )}
                />
                <Column
                  title="Deposit"
                  dataIndex="deposit"
                  render={(text, record, index) => (
                    <TableRowElement
                      name="Deposit"
                      data={<Price price={record.deposit_amount} />}
                      type={'node'}
                    />
                  )}
                />

                <Column
                  title="Status"
                  key="Status"
                  render={(text, record) => (
                    <TableRowElement
                      name="Status"
                      data={
                        <Status
                          name={record.status?.name ?? 'pending payment'}
                          type="status"
                        />
                      }
                      type={'node'}
                    />
                  )}
                />

                <Column
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <div>
                      <TableRowElement
                        name="Action"
                        data={
                          <div style={{ display: 'flex' }}>
                            {record?.status?.name.toLowerCase() ===
                              'pending payment' && (
                              <Button
                                type="default"
                                style={{
                                  marginRight: '1rem',
                                  backgroundColor: Theme.primaryHighlight,
                                  color: '#fff',
                                }}
                                onClick={() => {
                                  payAll([record.id]);
                                }}
                              >
                                Pay
                              </Button>
                            )}
                            <Link href={`/account/orders/${record.order_code}`} legacyBehavior>
                              <a>
                                <Button
                                  type="primary"
                                  style={{ marginRight: '1rem' }}
                                  onClick={() => {}}
                                >
                                  Details
                                </Button>
                              </a>
                            </Link>
                          </div>
                        }
                        type={'node'}
                      />
                    </div>
                  )}
                />
              </Table>
            </Card>
          ) : (
            <div>
              {loading ? (
                <Spinner />
              ) : (
                <Card title="Orders">
                  <Empty description={'No orders'} />
                </Card>
              )}
            </div>
          )}
        </Col>
      </Row>
      {selected && selected.length > 0 && screens.xs && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: 64,
            width: '100%',
            zIndex: 100000,
          }}
        >
          <Button
            type="default"
            style={{
              background: Theme.primaryHighlight,
              width: '100%',
              height: 64,
              borderRadius: 0,
              border: 'none',
              color: '#fff',
            }}
            onClick={() => {
              payAll(selected);
            }}
          >
            Pay selected
          </Button>
        </div>
      )}
    </div>
  );
}

export default withAuth(Orders);
