import { Button, Image, Modal, notification, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { getUsersExtra } from '../../actions/authAction';
import { requestData } from '../../api/requestData';
import Spinner from '../../components/Spinner';
import Status from '../../components/Status';
import TableRowElement from '../../components/TableRowElement';
import withAuth from '../../config/withAuth';

function Wishlist() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [reload, setReload] = useState(5);
  const [prevWishlist, setPrevWishlist] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);

  useEffect(() => {
    let temp = localStorage.getItem('wishlist');
    if (temp) {
      setPrevWishlist(JSON.parse(temp));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      let res = await requestData(true, 'get', '/user/wish-list', null);
      setData(res);
    }
    fetchData();
  }, [reload]);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const dispatch = useDispatch();

  const afterPerform = (result) => {
    if (result) {
      dispatch(getUsersExtra());
      setReload(Math.random());
      openNotificationWithIcon(
        'success',
        'Successful',
        'Wishlist updated successfully.',
      );
    } else {
      openNotificationWithIcon('error', 'Failed', 'Failed to update wishlist.');
    }
  };

  return (
    <div>
      {prevWishlist && (
        <div
          style={{
            background: '#fff',
            padding: '1rem',
            marginBottom: '1rem',
            border: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 style={{ marginBottom: '0px' }}>{'Restore your wishlist'}</h3>
          <Button
            type="danger"
            loading={restoreLoading}
            onClick={async () => {
              try {
                setRestoreLoading(true);
                for (let i = 0; i < prevWishlist.length; i++) {
                  let item = prevWishlist[i];
                  if (item.s === 'china') {
                    let res1 = await requestData(
                      true,
                      'get',
                      `/product?source=${'1688'}&product_code=${item.i}`,
                    );
                    if (res1.id) {
                      let res2 = await requestData(
                        true,
                        'post',
                        '/user/wish-list',
                        { product: res1.id },
                      );
                    }
                  }
                }
                setReload(Math.random());
                localStorage.setItem('tWishlist', JSON.stringify(prevWishlist));
                localStorage.removeItem('wishlist');
                openNotificationWithIcon(
                  'success',
                  'Successful',
                  'Wishlist updated successfully.',
                );
                setRestoreLoading(false);
                setPrevWishlist(false);
              } catch (error) {
                openNotificationWithIcon(
                  'error',
                  'Failed',
                  'Failed to update wishlist.',
                );
              }
            }}
          >
            Restore
          </Button>
        </div>
      )}
      <Modal
        visible={restoreLoading}
        title="Restoring your wishlist"
        footer={false}
      >
        <span>Please wait while restoring. Do not reload this page.</span>
        <Spinner />
      </Modal>
      <div className="table">
        {data && data.data && (
          <Table
            style={{ border: '1px solid #ddd', background: '#fff' }}
            dataSource={data.data}
            rowKey={(record) => record.id}
            // pagination={{
            //   current: page,
            //   pageSize: data.meta ? data.meta.per_page : 12,
            //   total: data.meta ? data.meta.total : 12,
            //   showSizeChanger: false,
            // }}
            // onChange={(page, pageSize) => {
            //   history.push(`/products?page=${page.current}`);
            // }}
          >
            <Column
              title="Image"
              key="image"
              render={(text, record) => (
                <div>
                  <TableRowElement
                    name="Image"
                    data={
                      <Image
                        width={50}
                        height={50}
                        src={record.product?.image + '_200x200q50.jpg'}
                        alt=""
                      />
                    }
                    type={'node'}
                  />
                </div>
              )}
            />
            <Column
              title="Product Code"
              dataIndex="pcode"
              render={(text, record, index) => (
                <div>
                  <TableRowElement
                    name="Image"
                    data={record.product?.product_code}
                    type={'text'}
                  />
                </div>
              )}
            />
            <Column
              title="Title"
              dataIndex="title"
              render={(text, record, index) => (
                <TableRowElement
                  name="Image"
                  data={record.product?.title.slice(0, 100)}
                  type={'text'}
                />
              )}
            />
            <Column
              title="Platform"
              key="Platform"
              render={(text, record) => (
                <TableRowElement
                  name="Platform"
                  data={<Status name={record.product?.source} type="source" />}
                  type={'node'}
                />
              )}
            />
            <Column
              title="Stock"
              dataIndex="balance"
              render={(text, record, index) => (
                <TableRowElement
                  name="Stock"
                  data={<Tag color="green">Available</Tag>}
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
                    name="Sale Price"
                    data={
                      <div style={{ display: 'flex' }}>
                        <Button
                          type="primary"
                          style={{ marginRight: '1rem' }}
                          onClick={() => {
                            router.push(
                              `/product/${record.product?.source}/${record.product?.product_code}`,
                            );
                          }}
                        >
                          Buy Now
                        </Button>
                        <Button
                          onClick={async () => {
                            let res = await requestData(
                              true,
                              'delete',
                              `/user/wish-list/${record.id}`,
                            );
                            afterPerform(res);
                          }}
                          type="danger"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          icon={<IoTrashOutline />}
                        ></Button>
                      </div>
                    }
                    type={'node'}
                  />
                </div>
              )}
            />
          </Table>
        )}
      </div>
    </div>
  );
}

export default withAuth(Wishlist);
