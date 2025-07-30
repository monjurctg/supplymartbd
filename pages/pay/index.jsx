/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  notification,
  Row,
  Table,
} from 'antd';
import Column from 'antd/lib/table/Column';
import Text from 'antd/lib/typography/Text';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { requestData } from '../../api/requestData';
import Spinner from '../../components/Spinner';
import Url from '../../utils/url';

export default function Pay() {
  const router = useRouter();
  const ref = useRef(null);
  const key = router?.query?.key;
  const test = router?.query?.test;
  const [paymentMethod, setPaymentMethod] = React.useState('bkash');
  const [payableDetails, setPayableDetails] = React.useState();
  const [search, setSearch] = React.useState('');
  const [from, setFrom] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [warning, setWarning] = React.useState(null);
  const [readyToPay, setReadyToPay] = React.useState(true);
  const [showPopup, setShowPopUp] = React.useState(null);
  const [recalculate, setRecalculate] = React.useState(100);

  console.log(key);

  const charges = {
    bkash: 0,
    nagad: 0,
    sslcommerz: 5,
    bank: 0,
    balance: 0,
  };
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  useEffect(() => {
    async function execute(params) {
      if (key) {
        let orderIds = null;
        try {
          let base64ToString = atob(key);
          let urlDecoded = base64ToString ? JSON.parse(base64ToString) : null;
          setFrom(urlDecoded.from);
          console.log(urlDecoded);
          orderIds = urlDecoded.data;
          if (urlDecoded.from === 'balance') {
            setPayableDetails({
              balance: 0,
              ids: [],
              orders: [],
              total_payable_amount: parseInt(urlDecoded.data),
            });
          } else {
            let res = await requestData(true, 'post', '/user/payable-details', {
              order_ids: orderIds,
            });

            console.log('resres', res);
            debugger;

            setPayableDetails(res);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        setReadyToPay(true);
        setFrom('pay');
      }
    }

    execute();
  }, [key, recalculate]);

  useEffect(() => {
    if (
      payableDetails &&
      payableDetails.total_payable_amount > payableDetails.balance &&
      paymentMethod === 'balance'
    ) {
      setWarning({
        title: 'Low Balance',
        message:
          'Your current balance is lesser than the payable amount. Your payment will be partially done',
      });
    } else {
      setWarning(null);
    }
  }, [paymentMethod, payableDetails, file]);

  const InitializeSslCommerz = async () => {
    let endPoint = from === 'balance' ? `/user/recharge-balance` : `/user/pay`;
    setReadyToPay(false);
    let data = {
      orders: payableDetails.ids,
      payment_method: 'sslcmz',
      amount: payableDetails.total_payable_amount,
    };
    let res = await requestData(true, 'post', endPoint, data);
    if (res.url) {
      window.location.href = res.url;
    } else {
      setReadyToPay(true);
      setShowPopUp({
        title: 'Something went wrong',
        message: 'Please try again',
      });
    }
  };

  const InitializeBkash = () => {
    let amount = Math.round(
      payableDetails.total_payable_amount +
        (charges[paymentMethod] / 100) * payableDetails.total_payable_amount,
    );
    let endPoint = from === 'balance' ? `user/recharge-balance` : `user/pay`;
    let finalData = {
      amount: amount,
      endPoint: endPoint,
      order_ids: payableDetails.ids,
      payment_method: 'bkash',
    };
    window.location.href =
      '/bkash-payment.html?' + btoa(JSON.stringify(finalData));
  };

  const InitializeNagad = async () => {
    let endPoint = from === 'balance' ? `user/recharge-balance` : `user/pay`;
    setReadyToPay(false);
    axios
      .post(Url + endPoint, {
        order_ids: payableDetails.ids,
        payment_method: 'nagad',
        amount: payableDetails.total_payable_amount,
      })
      .then((res) => {
        if (typeof res.data.original === 'string') {
          window.location.href = res.data.original;
        } else {
          setReadyToPay(true);
          setShowPopUp({
            title: 'Something went wrong',
            message: 'Please try another payment method',
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const InitializeBalancePay = async () => {
    setReadyToPay(false);
    setShowPopUp(null);
    let endPoint = '/user/pay';
    let res = await requestData(true, 'post', endPoint, {
      order_ids: payableDetails.ids,
      payment_method: 'balance',
    });
    if (res && res.is_partial) {
      setReadyToPay(true);
      setRecalculate(Math.random());
      setShowPopUp({
        title: 'Your payment is paid partially',
        message: 'Your balance payment has been successful',
        action: () => {
          setShowPopUp(null);
        },
      });
    } else if (res && !res.is_partial) {
      let base64data = btoa(JSON.stringify({ from: 'balance', id: 0 }));
      router.push('/pay/confirmation/' + base64data);
    } else {
      setReadyToPay(true);
      setShowPopUp({
        title: 'Something went wrong',
        message: 'Please try again',
      });
    }
  };
  const InitializeBankPay = async () => {
    let endPoint = from === 'balance' ? `/user/recharge-balance` : `/user/pay`;
    setReadyToPay(false);
    let formData = new FormData();
    payableDetails.ids.forEach((l, n) => {
      formData.append('order_ids[]', l);
    });
    formData.append('payment_method', 'bank');
    formData.append('amount', payableDetails.total_payable_amount);
    formData.append('bank_slip', file);

    let res = await requestData(true, 'post', endPoint, formData);
    if (res) {
      setRecalculate((prev) => prev * 5);
      let base64data = btoa(JSON.stringify({ from: 'bank', id: 1 }));
      router.push('/pay/confirmation/' + base64data);
    } else {
      let base64data = btoa(JSON.stringify({ from: 'bank', id: 2 }));
      router.push('/pay/confirmation/' + base64data);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{ position: 'relative', maxWidth: '100%' }}
        className="payPage"
      >
        {!readyToPay && (
          <div
            className="paymentProcessing"
            id="paymentProcessing"
            style={{
              background: 'rgba(0,0,0,0.5)',
              position: 'fixed',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              zIndex: 1100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner color={'#fff'} size={32} />
          </div>
        )}
        <div style={{ alignItems: 'normal', width: '600px', maxWidth: '100%' }}>
          {!(from === 'checkout' || from === 'balance') && (
            <Card bodyStyle={{ padding: 0 }} style={{ marginBottom: '0.5rem' }}>
              {!key ? (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    background: '#fff',
                    padding: '1rem',
                  }}
                >
                  <Input
                    type="text"
                    style={{ flex: 1, marginRight: '1rem' }}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        axios
                          .post(Url + `user/payable-details`, {
                            order_ids: [e.target.value],
                          })
                          .then((res) => {
                            setPayableDetails(res.data);
                          })
                          .catch((err) => {
                            setPayableDetails(null);
                          });
                      }
                    }}
                  />
                  <Button
                    type="primary"
                    onClick={() => {
                      axios
                        .post(Url + `user/payable-details`, {
                          order_ids: [search],
                        })
                        .then((res) => {
                          setPayableDetails(res.data);
                        })
                        .catch((err) => {
                          setPayableDetails(null);
                        });
                    }}
                  >
                    Find Order
                  </Button>
                </div>
              ) : (
                <h3 style={{ padding: 12, paddingBottom: 0 }}>
                  Selected Orders
                </h3>
              )}
              <Table
                style={{ background: '#fff' }}
                dataSource={payableDetails ? payableDetails.orders : []}
                size="small"
                bordered={false}
                rowKey={(record) => record._id}
                pagination={false}
              >
                <Column
                  title="Order Code"
                  align="center"
                  dataIndex="pcode"
                  render={(text, record, index) => (
                    <Text>{record.order_code}</Text>
                  )}
                />
                <Column
                  title="Payable Amount"
                  dataIndex="pcode"
                  align="center"
                  render={(text, record, index) => (
                    <Text>৳ {record.payable_amount}</Text>
                  )}
                />
              </Table>
            </Card>
          )}
          <Card className="card p15" style={{ borderRadius: '4px' }}>
            <div className="mt">
              {payableDetails && (
                <div className="flexRow">
                  <h3 className="mr05">Total Payable Amount: </h3>
                  <h3 style={{ color: 'red' }}>
                    ৳ {payableDetails.total_payable_amount}
                  </h3>
                </div>
              )}
              <Row className="paymentOptions mt15" gutter={[16, 16]}>
                {/* {true && (
                  <Col md={24}>
                    <label className="optionContainer">
                      <input
                        type="radio"
                        checked={paymentMethod === "bkash"}
                        name="paymentMethod"
                        value={"bkash"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="checkmark"></span>
                      <div>
                        <div className="flexRow align-center">
                          <span>Bkash</span>
                          <img
                            style={{
                              height: "32px",
                              marginLeft: "0.5rem",
                              objectFit: "cover",
                            }}
                            src={
                              require("../../assets/vector/bkash.svg").default
                                .src
                            }
                            alt=""
                          />
                        </div>
                        <p style={{ fontSize: "12px", marginTop: "0.1rem" }}>
                          Payment Gateway Charge :{" "}
                          <span
                            style={{
                              backgroundColor: "#000",
                              color: "white",
                              padding: "0.125rem .275rem",
                              marginLeft: "4px",
                              borderRadius: "6px",
                            }}
                          >
                            Free
                          </span>
                        </p>
                      </div>
                    </label>
                  </Col>
                )} */}

                {/* <Col md={12}>
                  <label className="optionContainer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={"nagad"}
                      checked={paymentMethod === "nagad"}
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                      }}
                    />
                    <span className="checkmark"></span>
                    <div>
                      <div className="flexRow align-center">
                        <span>Nagad</span>
                        <img
                          style={{ height: "32px", marginLeft: "0.5rem" }}
                          src={
                            require("../../assets/vector/nagad.svg").default.src
                          }
                          alt=""
                        />
                      </div>
                      <p style={{ fontSize: "12px", marginTop: "0.1rem" }}>
                        Payment Gateway Charge:{" "}
                        <span
                          style={{
                            backgroundColor: "#000",
                            color: "white",
                            padding: "0.125rem .275rem",
                            marginLeft: "4px",
                            borderRadius: "6px",
                          }}
                        >
                          Free
                        </span>
                      </p>
                    </div>
                  </label>
                </Col> */}
                {/* <Col md={24}>
                  {true && (
                    <label
                      className="optionContainer"
                      style={{ gridColumn: 'span 2' }}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === 'sslcommerz'}
                        name="paymentMethod"
                        value={'sslcommerz'}
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                        }}
                      />
                      <span className="checkmark"></span>
                      <div>
                        <span>Pay via Card, iBanking or Mobile banking</span>
                        <p style={{ fontSize: '12px', marginTop: '0.5rem' }}>
                          Payment Gateway Charge :{' '}
                          <span
                            style={{
                              backgroundColor: '#f5222d',
                              color: 'white',
                              padding: '0.05rem .475rem',
                              marginLeft: '4px',
                              borderRadius: '6px',
                            }}
                          >
                            {charges.sslcommerz} %
                          </span>
                        </p>
                        <img
                          style={{ width: '85%', marginTop: '0.125rem' }}
                          src={
                            require('../../assets/vector/sslcmrz.png').default
                              .src
                          }
                          alt=""
                        />
                      </div>
                    </label>
                  )}
                </Col> */}
                {
                  <Col md={24}>
                    <label
                      className="optionContainer"
                      style={
                        payableDetails && payableDetails.balance <= 0
                          ? { gridColumn: 'span 2' }
                          : {}
                      }
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === 'bank'}
                        name="paymentMethod"
                        value={'bank'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="checkmark"></span>
                      <div className="flexColumn">
                        <span>Direct Bank Transfer</span>
                        <p style={{ fontSize: '12px', marginTop: '0.1rem' }}>
                          Payment Gateway Charge:{' '}
                          <span
                            style={{
                              backgroundColor: '#000',
                              color: 'white',
                              padding: '0.125rem .275rem',
                              marginLeft: '4px',
                              borderRadius: '6px',
                            }}
                          >
                            Free
                          </span>
                        </p>
                      </div>
                    </label>
                    {paymentMethod === 'bank' && (
                      <div>
                        <div
                          className="bankDetails"
                          style={{ marginTop: '0.5rem' }}
                        >
                          <h3>Bank Details</h3>
                          <p>
                            Bank Name: Dutch Bangla Bank PLC. <br />
                            Account No: 101.110.0049707 <br /> Account Name: S.A
                            GLOBAL LOGISTICS <br /> Branch Name: Motijheel
                            Branch <br /> Routing No: 090273889
                            <br />
                          </p>
                          <p>
                            Bank Name: City Bank PLC. <br /> Account No:
                            1504152555001
                            <br /> Account Name: Supply Mart BD.com <br />{' '}
                            Branch Name: Elephant Road
                            <br /> Routing No: 225263527
                            <br />
                          </p>
                        </div>
                        <div
                          style={{
                            border: '1px solid #eee',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <img
                            src={
                              file
                                ? URL.createObjectURL(file)
                                : require('../../assets/vector/bank_receipt.svg')
                                    .default.src
                            }
                            style={{
                              width: '256px',
                              cursor: 'pointer',
                              maxWidth: '80%',
                            }}
                            alt=""
                            onClick={() => {
                              if (ref && ref.current) {
                                ref.current.click();
                              }
                            }}
                          />
                          <h4 className="mt2">Upload Bank Payment Receipt</h4>
                          <input
                            name="uploadImage"
                            id="inputId"
                            type="file"
                            ref={ref}
                            style={{ position: 'fixed', top: '-100em' }}
                            onChange={(e) => {
                              let imgFile = e.target.files[0];
                              if (
                                imgFile.type === 'image/png' ||
                                imgFile.type === 'image/jpeg' ||
                                imgFile.type === 'image/jpeg'
                              ) {
                                setFile(imgFile);
                              } else {
                                openNotificationWithIcon(
                                  'error',
                                  'Failed to upload bank slip',
                                  'Please upload a png, jpeg jpg file as bank slip',
                                );
                              }
                            }}
                          ></input>
                        </div>
                      </div>
                    )}
                  </Col>
                }
                {payableDetails && payableDetails.balance > 0 && (
                  <Col md={24}>
                    <label className="optionContainer">
                      <input
                        type="radio"
                        checked={paymentMethod === 'balance'}
                        name="paymentMethod"
                        value={'balance'}
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                        }}
                      />
                      <span className="checkmark"></span>
                      <div className="flexColumn">
                        <span>Pay via Balance</span>
                        <p style={{ fontSize: '12px', marginTop: '0.1rem' }}>
                          Current Balance:{' '}
                          {payableDetails ? payableDetails.balance : 0}
                        </p>
                      </div>
                    </label>
                  </Col>
                )}
              </Row>

              {warning && (
                <div
                  style={{
                    backgroundColor: '#F5EDD4',
                    padding: '1rem',
                    marginTop: '1rem',
                  }}
                >
                  <b>{warning.title}</b>
                  <p className="mt05">{warning.message}</p>
                </div>
              )}
              <div style={{ marginTop: '1rem' }}>
                <span
                  style={{
                    fontSize: '14px',
                    marginRight: '0.25rem',
                    textTransform: 'capitalize',
                  }}
                >
                  {charges[paymentMethod] > 0 ? (
                    ` ${charges[paymentMethod]}% Payment Gateway Charge:`
                  ) : (
                    <span>
                      Payment Processing charge:{' '}
                      <span
                        style={{
                          backgroundColor: '#000',
                          color: 'white',
                          padding: '0.125rem .275rem',
                          marginLeft: '4px',
                          fontSize: '13px',
                          borderRadius: '6px',
                        }}
                      >
                        Free
                      </span>{' '}
                    </span>
                  )}
                </span>
                {payableDetails && charges[paymentMethod] > 0 && (
                  <span style={{ fontSize: '14px', color: 'red' }}>
                    ৳{' '}
                    {Math.round(
                      (charges[paymentMethod] / 100) *
                        payableDetails.total_payable_amount,
                    )}
                  </span>
                )}
              </div>
              <div style={{ marginTop: '0.575rem' }}>
                {payableDetails && (
                  <span style={{ fontSize: '14px' }}>
                    <span>Final Amount: </span>৳{' '}
                    {payableDetails ? payableDetails.total_payable_amount : 0} +
                    ৳{' '}
                    {Math.round(
                      (charges[paymentMethod] / 100) *
                        payableDetails.total_payable_amount,
                    )}{' '}
                    =
                    <span
                      style={{
                        color: 'red',
                        marginLeft: '0.275rem',
                        fontWeight: 600,
                      }}
                    >
                      ৳{' '}
                      {Math.round(
                        payableDetails.total_payable_amount +
                          (charges[paymentMethod] / 100) *
                            payableDetails.total_payable_amount,
                      )}
                    </span>
                  </span>
                )}
              </div>
              <div id="bkashID" className="mt15 fixedMobileBottom">
                <Button
                  type="primary"
                  id="bKash_button"
                  style={{
                    height: 'auto',
                    textTransform: 'uppercase',
                    width: '100%',
                    marginTop: '1rem',
                  }}
                  disabled={!readyToPay}
                  onClick={() => {
                    if (
                      payableDetails &&
                      payableDetails.total_payable_amount !== 0
                    ) {
                      if (paymentMethod === 'bkash') {
                        setReadyToPay(false);
                        InitializeBkash();
                      }
                      if (paymentMethod === 'sslcommerz') {
                        InitializeSslCommerz();
                      }
                      if (paymentMethod === 'nagad') {
                        InitializeNagad();
                      }
                      if (paymentMethod === 'bank') {
                        if (file) {
                          InitializeBankPay();
                        } else {
                          openNotificationWithIcon(
                            'error',
                            'Failed to complete',
                            'Please upload bank deposit slip',
                          );
                        }
                      }
                      if (paymentMethod === 'balance') {
                        if (
                          payableDetails &&
                          payableDetails.total_payable_amount >
                            payableDetails.balance &&
                          paymentMethod === 'balance'
                        ) {
                          setShowPopUp({
                            title: 'Partial Payment',
                            actionText: 'Confirm Partial Payment',
                            cancel: 'Cancel',
                            message:
                              'Your current balance is lesser than the payable amount. Your payment will be partially done',
                            action: () => {
                              InitializeBalancePay();
                            },
                          });
                        } else if (
                          payableDetails &&
                          payableDetails.total_payable_amount <=
                            payableDetails.balance &&
                          paymentMethod === 'balance'
                        ) {
                          setShowPopUp({
                            title: 'Balance Payment',
                            actionText: 'Confirm Balance Payment',
                            cancel: 'Cancel',
                            message:
                              'Your full payment will be completed with your available balance',
                            action: () => {
                              InitializeBalancePay();
                            },
                          });
                        }
                      }
                    } else {
                      setShowPopUp({
                        title: 'This payment is invalid',
                        message:
                          'This payment is either invalid or already paid',
                      });
                    }
                  }}
                >
                  <span className="mr05" style={{ fontSize: '22px' }}>
                    Complete Payment
                  </span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Modal
        title={<span>{showPopup ? showPopup.title : ''}</span>}
        visible={showPopup}
        onCancel={() => {
          setShowPopUp(null);
        }}
        centered
        width={'400px'}
        onOk={() => {
          if (showPopup && showPopup.action) {
            showPopup.action();
          } else {
            setShowPopUp(false);
          }
        }}
      >
        {showPopup ? showPopup.message : ''}
      </Modal>
    </div>
  );
}
