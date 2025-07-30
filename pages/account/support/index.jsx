import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Tag,
  Upload,
} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import AccountMenu from "../../../components/AccountMenu";
import { IoTrendingUp } from "react-icons/io5";
import Column from "antd/lib/table/Column";
import TableRowElement from "../../../components/TableRowElement";
import Status from "../../../components/Status";

function Index() {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [drawer, setDrawer] = useState("");
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState({
    data: [
      {
        id: 2,
        title: "Return Product",
        description: "Return Issues",
        department_id: "4",
        priority: 2,
        created_at: "2021-11-21T05:58:16.000000Z",
        updated_at: "2021-11-30T07:52:13.000000Z",
      },
      {
        id: 3,
        title: "General",
        description: "General Customer Support",
        department_id: "7",
        priority: 3,
        created_at: "2021-11-23T10:09:28.000000Z",
        updated_at: "2021-11-30T07:51:49.000000Z",
      },
      {
        id: 4,
        title: "Missing Product",
        description: "Product Missing",
        department_id: "4",
        priority: 1,
        created_at: "2021-11-23T11:11:15.000000Z",
        updated_at: "2021-11-30T07:51:44.000000Z",
      },
      {
        id: 5,
        title: "Purchasing",
        description: "Purchasing issues",
        department_id: "2",
        priority: 1,
        created_at: "2021-11-25T07:48:05.000000Z",
        updated_at: "2021-11-30T07:51:38.000000Z",
      },
      {
        id: 6,
        title: "Delivery",
        description: "Delivery issues",
        department_id: "3",
        priority: 1,
        created_at: "2021-11-25T07:48:47.000000Z",
        updated_at: "2021-11-30T07:51:32.000000Z",
      },
      {
        id: 7,
        title: "Refund",
        description: "Refund issues",
        department_id: "6",
        priority: 1,
        created_at: "2021-11-27T03:19:29.000000Z",
        updated_at: "2021-11-30T07:51:27.000000Z",
      },
      {
        id: 8,
        title: "Payment",
        description: "Payment issues",
        department_id: "6",
        priority: 1,
        created_at: "2021-11-27T03:19:29.000000Z",
        updated_at: "2021-11-30T07:51:14.000000Z",
      },
      {
        id: 9,
        title: "Technical",
        description: "Any Kind Of Technical Issues",
        department_id: "1",
        priority: 1,
        created_at: "2021-11-07T05:16:01.000000Z",
        updated_at: "2021-11-30T07:51:07.000000Z",
      },
      {
        id: 10,
        title: "Discount/Coupon/Campaign Issue",
        description: "Discount/Coupon/Campaign Issue",
        department_id: "5",
        priority: 2,
        created_at: "2021-12-01T05:44:29.000000Z",
        updated_at: "2021-12-01T05:44:29.000000Z",
      },
    ],
  });

  const getImage = (key) => {
    if (form && form.getFieldValue(key)) {
      console.log("id");
      return URL.createObjectURL(form.getFieldValue(key).file);
    } else {
      console.log(require("../../../assets/test.png").default);
      return require("../../../assets/test.png").default.src;
    }
  };
  return (
    <div>
      <Row gutter={[8, 8]} style={{ margin: 0 }}>
        {screens.xs && (
          <Col xs={{ span: 24 }}>
            <AccountMenu />
          </Col>
        )}
        <Col xs={{ span: 24 }}>
          <Card
            className="table"
            bodyStyle={{ padding: 0 }}
            style={{ border: "1px solid #dedede" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 12,
              }}
            >
              <div style={{ width: "320px", maxWidth: "100%" }}>
                <Input.Search
                  placeholder="Ticket ID"
                  onSearch={(value) => {
                    if (value) {
                      setFilter(`&phone=${value}`);
                    } else {
                      setFilter(null);
                    }
                  }}
                  allowClear
                  enterButton="Search"
                  style={{ width: "100%" }}
                />
              </div>
              <Button type="danger" onClick={() => setDrawer(true)}>
                Create Ticket
              </Button>
            </div>
            <Table
              style={{ background: "#fff" }}
              dataSource={[]}
              bordered={false}
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
                title="Ticket ID"
                dataIndex="pcode"
                render={(text, record, index) => (
                  <div>
                    <TableRowElement
                      name="Ticket ID"
                      data={record.ticket_id}
                      type={"text"}
                    />
                  </div>
                )}
              />
              <Column
                title="Order Code"
                dataIndex="title"
                render={(text, record, index) => (
                  <TableRowElement
                    name="Image"
                    data={record.order_code}
                    type={"text"}
                  />
                )}
              />
              <Column
                title="Message"
                key="message"
                render={(text, record) => (
                  <TableRowElement
                    name="Manager"
                    data={record.message}
                    type={"node"}
                  />
                )}
              />
              <Column
                title="Manager"
                dataIndex="manager"
                render={(text, record, index) => (
                  <TableRowElement
                    name="Manager"
                    data={<Tag color="green">{record.manager}</Tag>}
                    type={"node"}
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
                        <div style={{ display: "flex" }}>
                          <Button
                            type="primary"
                            style={{ marginRight: "1rem" }}
                            onClick={() => {}}
                          >
                            Chat
                          </Button>
                        </div>
                      }
                      type={"node"}
                    />
                  </div>
                )}
              />
            </Table>
          </Card>
        </Col>
      </Row>
      <Drawer
        title={"Create Ticket"}
        visible={drawer}
        width={screens.xs ? "80%" : "50%"}
        onClose={() => {
          setDrawer(0);
          //   setUserData(null);
          //   setFileList([]);
          form.resetFields();
        }}
      >
        <Form
          name="basic"
          layout="vertical"
          form={form}
          onFinish={(e) => {
            console.log(e);
            if (drawer === 1) {
              //   onSubmitForm(e);
            } else if (drawer === 2) {
              //   onUpdateForm(e);
            }
          }}
          onFinishFailed={() => {}}
        >
          <Row gutter={[16, 0]} style={{ marginBottom: "1rem" }}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                name="support_type"
                label="Support Type"
                rules={[
                  {
                    required: true,
                    message: "This field is required !",
                  },
                ]}
              >
                <Select placeholder="Select Status">
                  <Select.Option value={1}>Missing Product</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                name="order_id"
                label="Order ID"
                rules={[
                  {
                    required: false,
                    message: "This field is required !",
                  },
                ]}
              >
                <Input placeholder="Order ID" />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 8 }}
              style={screens.xs ? { marginBottom: 16 } : {}}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 8,
                  borderRadius: 4,
                }}
              >
                <Image
                  width={48}
                  height={48}
                  src={getImage("china_invoice")}
                  alt=""
                />
                <Form.Item name="china_invoice" style={{ margin: 0 }}>
                  <Upload
                    multiple={false}
                    accept="image/*,.pdf"
                    showUploadList={false}
                  >
                    <Button>China Invoice</Button>
                  </Upload>
                </Form.Item>
              </div>
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 8 }}
              style={screens.xs ? { marginBottom: 16 } : {}}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 8,
                  borderRadius: 4,
                }}
              >
                <Image
                  width={48}
                  height={48}
                  src={getImage("china_tracking")}
                  alt=""
                />
                <Form.Item name="china_tracking" style={{ margin: 0 }}>
                  <Upload
                    multiple={false}
                    accept="image/*,.pdf"
                    showUploadList={false}
                  >
                    <Button>China Tracking</Button>
                  </Upload>
                </Form.Item>
              </div>
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 8 }}
              style={{ marginTop: "0rem", marginBottom: "0rem" }}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 8,
                  borderRadius: 4,
                }}
              >
                <Image
                  width={48}
                  height={48}
                  src={getImage("china_tracking")}
                  alt=""
                />
                <Form.Item name="weight_picture" style={{ margin: 0 }}>
                  <Upload
                    multiple={false}
                    accept="image/*,.pdf"
                    showUploadList={false}
                  >
                    <Button>Weight Picture</Button>
                  </Upload>
                </Form.Item>
              </div>
            </Col>

            <Col
              xs={{ span: 24 }}
              md={{ span: 24 }}
              style={{ marginTop: "1rem" }}
            >
              <Form.Item
                name="product_missing_details"
                label="Product Missing Quantity/Size/Color/Details"
              >
                <Input.TextArea placeholder="Product Missing Details" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Form.Item
                name="video_link"
                label="Product Unboxing Video Link"
                rules={[
                  {
                    required: true,
                    message: "This field is required !",
                  },
                ]}
              >
                <Input placeholder="Product Unboxing Video Link" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Form.Item name="description" label="Description">
                <Input.TextArea placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              marginTop: "0.5rem",
              justifyContent: "flex-start",
            }}
          >
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {"Submit"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    </div>
  );
}

export default Index;
