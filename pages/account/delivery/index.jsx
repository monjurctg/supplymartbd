import { Button, Card, Col, Descriptions, Row, Select, Table, Tag } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import AccountMenu from "../../../components/AccountMenu";
import { IoTrendingUp } from "react-icons/io5";
import Column from "antd/lib/table/Column";
import TableRowElement from "../../../components/TableRowElement";
import Status from "../../../components/Status";
import moment from "moment";
import Price from "../../../components/Price";
import withAuth from "../../../config/withAuth";

function Delivery() {
  const screens = useBreakpoint();
  const [data, setData] = useState([
    {
      id: 273,
      user_id: 11555,
      master_invoice_code: "WI41LD",
      order_ids: [1368298, 1368303],
      order_codes: ["WREEKY", "WREE84"],
      due_amount: 2743,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 50,
      cod_charge: null,
      collect_amount: 75,
      status: "completed",
      note: null,
      delivery_method: "sundarban",
      courier_tracking_id: "55555",
      created_at: "2021-10-18T06:58:04.000000Z",
      updated_at: "2021-10-18T07:02:54.000000Z",
      branch_name: "Mirpur",
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2021-10-18T07:00:17.189Z",
    },
    {
      id: 453,
      user_id: 11555,
      master_invoice_code: "WI413D",
      order_ids: [1370418],
      order_codes: ["WRECE3"],
      due_amount: 936,
      courier_charge_discount: 0,
      warehouse_delay_charge: 120,
      courier_return_charge: 60,
      txn_ids: null,
      booking_amount: 0,
      cod_charge: null,
      collect_amount: 0,
      status: "completed",
      note: null,
      delivery_method: "office",
      courier_tracking_id: null,
      created_at: "2021-10-24T05:36:49.000000Z",
      updated_at: "2021-10-24T11:25:41.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: null,
    },
    {
      id: 479,
      user_id: 11555,
      master_invoice_code: "WI41QK",
      order_ids: [1370414],
      order_codes: ["WRECE5"],
      due_amount: 2355,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 0,
      cod_charge: null,
      collect_amount: 0,
      status: "completed",
      note: null,
      delivery_method: "office",
      courier_tracking_id: null,
      created_at: "2021-10-25T07:34:01.000000Z",
      updated_at: "2021-10-25T07:37:26.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: null,
    },
    {
      id: 1615,
      user_id: 11555,
      master_invoice_code: "WI4C9F",
      order_ids: [1372647],
      order_codes: ["WRE2T9"],
      due_amount: 1499,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 0,
      cod_charge: null,
      collect_amount: 0,
      status: "completed",
      note: null,
      delivery_method: "office",
      courier_tracking_id: null,
      created_at: "2021-12-07T12:19:12.000000Z",
      updated_at: "2021-12-07T12:29:53.000000Z",
      branch_name: "Office Collection",
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: null,
    },
    {
      id: 2377,
      user_id: 11555,
      master_invoice_code: "WI4SCP",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 3258,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 120,
      cod_charge: null,
      collect_amount: 0,
      status: "returned",
      note: "Sample",
      delivery_method: "redx",
      courier_tracking_id: "22A111TUCPGCB",
      created_at: "2022-01-11T08:34:21.000000Z",
      updated_at: "2022-01-13T06:58:02.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-11 14:21:34",
    },
    {
      id: 2428,
      user_id: 11555,
      master_invoice_code: "WI4SU6",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 4837,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 250,
      cod_charge: null,
      collect_amount: 0,
      status: "returned",
      note: "sdfsfsf sdf sdf",
      delivery_method: "redx",
      courier_tracking_id: "22A113THCRUFD",
      created_at: "2022-01-13T07:25:41.000000Z",
      updated_at: "2022-01-13T07:48:07.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-13 13:42:25",
    },
    {
      id: 2438,
      user_id: 11555,
      master_invoice_code: "WI4SU3",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 3491,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 250,
      cod_charge: null,
      collect_amount: 0,
      status: "returned",
      note: null,
      delivery_method: "redx",
      courier_tracking_id: "22A113THCS5WG",
      created_at: "2022-01-13T10:54:37.000000Z",
      updated_at: "2022-01-13T10:55:43.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-13 16:38:54",
    },
    {
      id: 2440,
      user_id: 11555,
      master_invoice_code: "WI4SUE",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 3516,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 250,
      cod_charge: null,
      collect_amount: 0,
      status: "returned",
      note: "ghg",
      delivery_method: "redx",
      courier_tracking_id: "22A113THCS5ZG",
      created_at: "2022-01-13T10:56:39.000000Z",
      updated_at: "2022-01-13T10:57:21.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-13 16:40:56",
    },
    {
      id: 2442,
      user_id: 11555,
      master_invoice_code: "WI4SU1",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 3491,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 250,
      cod_charge: null,
      collect_amount: 0,
      status: "returned",
      note: "cfgfc",
      delivery_method: "redx",
      courier_tracking_id: "22A113THCS61F",
      created_at: "2022-01-13T10:58:16.000000Z",
      updated_at: "2022-01-13T11:03:36.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-13 16:17:58",
    },
    {
      id: 2443,
      user_id: 11555,
      master_invoice_code: "WI4SUS",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 6546,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 120,
      cod_charge: null,
      collect_amount: 0,
      status: "returned",
      note: "sdfsdf",
      delivery_method: "redx",
      courier_tracking_id: "22A113THCS69Q",
      created_at: "2022-01-13T11:04:38.000000Z",
      updated_at: "2022-01-13T11:06:38.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-13 17:39:04",
    },
    {
      id: 2444,
      user_id: 11555,
      master_invoice_code: "WI4SUU",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 10012,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 400,
      cod_charge: null,
      collect_amount: 0,
      status: "returned",
      note: "sdfgsdf",
      delivery_method: "redx",
      courier_tracking_id: "22A113THCS6DG",
      created_at: "2022-01-13T11:07:38.000000Z",
      updated_at: "2022-01-13T11:13:09.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-13 17:40:07",
    },
    {
      id: 2450,
      user_id: 11555,
      master_invoice_code: "WI4SUY",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 10012,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 400,
      cod_charge: null,
      collect_amount: 0,
      status: "returned",
      note: "sdfgsdf",
      delivery_method: "redx",
      courier_tracking_id: "22A113THCS6TF",
      created_at: "2022-01-13T11:19:43.000000Z",
      updated_at: "2022-01-13T11:36:42.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-13 17:54:20",
    },
    {
      id: 2472,
      user_id: 11555,
      master_invoice_code: "WI4S21",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 10101,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 400,
      cod_charge: null,
      collect_amount: 0,
      status: "returned",
      note: "sdfgsdf",
      delivery_method: "redx",
      courier_tracking_id: "22A113THCS6ZQ",
      created_at: "2022-01-13T11:21:02.000000Z",
      updated_at: "2022-01-13T11:36:45.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-13 17:05:21",
    },
    {
      id: 2477,
      user_id: 11555,
      master_invoice_code: "WI4S29",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 10012,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 400,
      cod_charge: null,
      collect_amount: 0,
      status: "returned",
      note: "sdfweffwe",
      delivery_method: "redx",
      courier_tracking_id: "22A113THCS80U",
      created_at: "2022-01-13T11:44:20.000000Z",
      updated_at: "2022-01-13T12:01:01.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-13 17:20:44",
    },
    {
      id: 2479,
      user_id: 11555,
      master_invoice_code: "WI4S2A",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 10012,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 400,
      cod_charge: null,
      collect_amount: 0,
      status: "returned",
      note: "drtgdrydrty",
      delivery_method: "redx",
      courier_tracking_id: "22A113THCS8R3",
      created_at: "2022-01-13T12:04:51.000000Z",
      updated_at: "2022-01-13T12:19:10.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-13 18:52:04",
    },
    {
      id: 2481,
      user_id: 11555,
      master_invoice_code: "WI4SWR",
      order_ids: [1378500],
      order_codes: ["WR1REZ"],
      due_amount: 10012,
      courier_charge_discount: 0,
      warehouse_delay_charge: 0,
      courier_return_charge: 0,
      txn_ids: null,
      booking_amount: 400,
      cod_charge: null,
      collect_amount: 0,
      status: "submitted",
      note: "dgdf",
      delivery_method: "redx",
      courier_tracking_id: "22A113THCS9BQ",
      created_at: "2022-01-13T12:20:44.000000Z",
      updated_at: "2022-01-13T12:20:45.000000Z",
      branch_name: null,
      delivery_address: "12/404, Rupnagar Tinshed, Mirpur, Dhaka-1216",
      booking_date: "2022-01-13 18:45:20",
    },
  ]);
  return (
    <div>
      <Row gutter={[8, 8]} style={{ margin: 0 }}>
        {screens.xs && (
          <Col xs={{ span: 24 }}>
            <AccountMenu />
          </Col>
        )}
        <Col xs={{ span: 24 }}>
          <Row gutter={[8, 8]} style={{ margin: 0 }}>
            {data.map((el) => (
              <Col key={el.id} xs={{ span: 24 }} md={{ span: 12 }}>
                <Card
                  title={el.master_invoice_code}
                  extra={<Status name={el.status} />}
                >
                  <Descriptions
                    bordered={false}
                    size="medium"
                    column={1}
                    style={{ padding: 0, margin: 0 }}
                  >
                    <Descriptions.Item label="Order IDs">
                      {el.order_codes.map((p, k) => (
                        <Tag color={"volcano"} key={p}>
                          {p}
                        </Tag>
                      ))}
                    </Descriptions.Item>
                    <Descriptions.Item label="Payable Amount">
                      <Price price={el.due_amount} type={"primary"} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Delivery Address">
                      <Text> {el.delivery_address}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Delivery Method">
                      <Text
                        style={{ textTransform: "capitalize", fontWeight: 600 }}
                      >
                        {el.delivery_method}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Branch Name">
                      <Text
                        style={{ textTransform: "capitalize", fontWeight: 600 }}
                      >
                        {el.branch_name}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Delivery Tracking">
                      {el.courier_tracking_id ? (
                        <div style={{ display: "flex" }}>
                          <Tag
                            // color={"geekblue"}
                            style={{
                              marginRight: 0,
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                            }}
                          >
                            {el.courier_tracking_id}
                          </Tag>
                          <Tag
                            color={"#999"}
                            style={{
                              color: "white",
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                              cursor: "pointer",
                              userSelect: "none",
                            }}
                          >
                            Track
                          </Tag>
                        </div>
                      ) : (
                        "--"
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Day">
                      {moment(new Date(el.created_at)).format("Do MMMM YYYY")}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default withAuth(Delivery);
