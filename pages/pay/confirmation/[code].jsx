import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Spinner from '../../../components/Spinner';
import url from '../../../utils/url';
import { Button, Card, Result } from 'antd';
import { requestData } from '../../../api/requestData';
import { getCookieFromBrowser } from '../../../utils/cookiesHandler';

function Confirmation() {
  let router = useRouter();
  let key = router?.query?.code;
  const [status, setStatus] = useState(null);
  // const statusImage = [
  //   require("../../assets/vector/complete.svg").default,
  //   require("../../assets/vector/pending.svg").default,
  //   require("../../assets/vector/failed.svg").default,
  // ];


  useEffect(() => {
    if (key) {
      window.scrollTo({ top: 0 });
      let data = null;
      let urlDecoded = atob(key);
      try {
        data = JSON.parse(urlDecoded);
        console.log(data);
      } catch (error) {}
      if (data && (data.from === 'order' || data.from === 'deposit')) {
        let urlBase =
          data.from === 'order'
            ? `/user/query-payment/${data.id}`
            : `/user/query-deposit/${data.id}`;
        axios
          .get(url + urlBase, {
            headers: {
              Authorization: 'Bearer ' + getCookieFromBrowser('site_jwt'),
            },
          })
          .then((res) => {
            if (res.data && res.data.type === 'completed') {
              setStatus({
                code: 0,
                type: 'completed',
                message: res.data.message,
                master_tnx_code: res.data.master_txn_code,
                status: 'success',
              });
            }
            if (res.data && res.data.type === 'pending') {
              setStatus({
                code: 1,
                type: 'pending',
                message: 'Your payment process is currently pending.',
                master_tnx_code: res.data.master_txn_code,
                status: 'warning',
              });
            }
            if (
              res.data &&
              (res.data.type === 'failed' || res.data.type === 'canceled')
            ) {
              setStatus({
                code: 2,
                type: res.data.type,
                message: res.data.message,
                master_tnx_code: res.data.master_txn_code,
                status: 'error',
              });
            }
            if (res.data && res.data.type === '404') {
              setStatus({
                code: 2,
                type: 'Not Found',
                message: res.data.message,
                master_tnx_code: res.data.master_txn_code,
                status: 'error',
              });
            }
          })
          .catch((err) => {
            setStatus({
              code: 2,
              type: 'Not Found',
              message: 'Something went wrong. Please contact with us.',
              master_tnx_code: '',
              status: 'error',
            });
          });
      } else if (
        data &&
        (data.from === 'bkash' ||
          data.from === 'balance' ||
          data.from === 'bank')
      ) {
        if (data.id === 0) {
          setStatus({
            code: 0,
            type: 'completed',
            message: 'Your payment process is completed successfully.',
            master_tnx_code: null,
            status: 'success',
          });
        } else if (data.id === 1) {
          setStatus({
            code: 1,
            type: 'Pending',
            message:
              'Your payment process is currently on review. Our accounts team will check and verify your document and change your order status shortly',
            master_tnx_code: null,
            status: 'warning',
          });
        } else if (data.id === 2) {
          setStatus({
            code: 2,
            type: 'Failed',
            message: 'Your payment process has failed.',
            master_tnx_code: null,
            status: 'error',
          });
        }
      }
    }
  }, [key]);
  return (
    <div
      className="confirmationContainer"
      style={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {status ? (
        <Card
          className="card"
          style={{
            width: '600px',
            maxWidth: '100%',
          }}
        >
          <Result
            status={status.status}
            title={'Payment ' + status.type}
            subTitle={status.message}
            extra={[
              <Link key={'1'} href="/account/orders" legacyBehavior>
                <a>
                  <Button type="primary" className="bt ripple mt1">
                    Return
                  </Button>
                </a>
              </Link>,
            ]}
          />
        </Card>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Confirmation;
