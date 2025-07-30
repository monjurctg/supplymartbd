import { Card, Col, Input, Row, Table, Tag } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Column from 'antd/lib/table/Column';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { requestData } from '../../../api/requestData';
import AccountMenu from '../../../components/AccountMenu';
import Status from '../../../components/Status';
import TableRowElement from '../../../components/TableRowElement';

const { Search } = Input;

function Balance() {
  let screens = useBreakpoint();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState({});
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };
  let router = useRouter();

  useEffect(() => {
    async function fetchData() {
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
        '/user/balance-transaction' + finalFilter,
      );
      setData(res);
    }
    fetchData();
  }, [page]);

  return (
    <div className="table">
      <Row gutter={[8, 8]} style={{ margin: 0 }}>
        {screens.xs && (
          <Col xs={{ span: 24 }}>
            <AccountMenu />
          </Col>
        )}
        <Col xs={{ span: 24 }}>
          <Card
            title="Balance"
            bodyStyle={{ padding: 0 }}
            extra={
              <Search
                placeholder="Input Amount Here"
                allowClear
                enterButton="Deposit"
                size="middle"
                style={{ width: '256px' }}
                onSearch={(value) => {
                  let amount = parseInt(value);
                  if (amount < 500) {
                    openNotificationWithIcon(
                      'error',
                      'Minimum Amount',
                      'Please insert more than 500 Taka',
                    );
                  } else if (amount > 500000) {
                    openNotificationWithIcon(
                      'error',
                      'Maximum Amount',
                      'Please insert less than 50000 Taka',
                    );
                  } else if (amount) {
                    let key = { from: 'balance', data: amount };
                    key = btoa(JSON.stringify(key));
                    router.push('/pay?key=' + key);
                  }
                }}
              />
            }
          >
            <div>
              {data && data.data && (
                <Table
                  style={{ background: '#fff' }}
                  dataSource={data.data}
                  bordered={false}
                  rowKey={(record) => record._id}
                  pagination={{
                    current: page,
                    pageSize: data.meta ? data.meta.per_page : 50,
                    total: data.meta ? data.meta.total : 50,
                    showSizeChanger: false,
                  }}
                  onChange={(page, pageSize) => {
                    setPage(page.current);
                  }}
                >
                  <Column
                    title="Date"
                    dataIndex="pcode"
                    render={(text, record, index) => (
                      <div>
                        <TableRowElement
                          name="Date"
                          data={moment(record.created_at).format(
                            'DD/MM/YY hh:mm A',
                          )}
                          type={'text'}
                        />
                      </div>
                    )}
                  />
                  <Column
                    title="TXN ID"
                    dataIndex="pcode"
                    render={(text, record, index) => (
                      <div>
                        <TableRowElement
                          name="TXN ID"
                          data={record.balance_txn_code}
                          type={'node'}
                        />
                      </div>
                    )}
                  />
                  <Column
                    title="Type"
                    dataIndex="pcode"
                    render={(text, record, index) => (
                      <div>
                        <TableRowElement
                          name="Type"
                          data={<Status name={record.type} />}
                          type={'node'}
                        />
                      </div>
                    )}
                  />
                  <Column
                    title="Amount"
                    dataIndex="pcode"
                    render={(text, record, index) => (
                      <div>
                        <TableRowElement
                          name="Amount"
                          data={record.amount}
                          type={'text'}
                        />
                      </div>
                    )}
                  />

                  <Column
                    title="Method"
                    dataIndex="pcode"
                    render={(text, record, index) => (
                      <div>
                        <TableRowElement
                          name="Method"
                          data={<Status name={record.payment_method} />}
                          type={'node'}
                        />
                      </div>
                    )}
                  />
                  <Column
                    title="Orders"
                    dataIndex="pcode"
                    render={(text, record, index) => (
                      <div>
                        <TableRowElement
                          name="Orders"
                          data={
                            <div>
                              {record?.order_code &&
                                Array.isArray(record.order_code) &&
                                record.order_code?.map((el) => (
                                  <Tag key={el}>{el._id}</Tag>
                                ))}
                              {record?.order_code &&
                                !Array.isArray(record.order_code) && (
                                  <Tag key={record.order_code}>
                                    {record?.order_code}
                                  </Tag>
                                )}
                            </div>
                          }
                          type={'node'}
                        />
                      </div>
                    )}
                  />
                  <Column
                    title="Status"
                    dataIndex="pcode"
                    render={(text, record, index) => (
                      <div>
                        <TableRowElement
                          name="Status"
                          data={<Status name={record.status} />}
                          type={'node'}
                        />
                      </div>
                    )}
                  />
                </Table>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Balance;
