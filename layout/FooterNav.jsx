/* eslint-disable @next/next/no-img-element */
import { Col, Row } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Text from 'antd/lib/typography/Text';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Theme from '../utils/Theme';

export default function FooterNav({ preCollapsed }) {
  const screens = useBreakpoint();
  let margin = {
    background: '#fff',
    padding: screens.xs ? '32px' : '48px',
    paddingBottom: screens.xs ? 64 : 16,
    borderTop: '4px solid #c1e0ff',
  };

  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setCollapsed(true);
    }
  }, [router.pathname]);

  return (
    <>
      {collapsed ? (
        <div
          style={{
            paddingBottom: '64px',
            marginTop: 24,
            width: '100%',
            display: 'flex',
          }}
          onClick={() => {
            setCollapsed(false);
          }}
        >
          <span
            style={{
              padding: '20px',
              borderTop: '1px solid' + Theme.primaryHighlight,
              width: '100%',
            }}
          >
            Company Info
          </span>
        </div>
      ) : (
        <div style={margin} className="footer">
          <Row gutter={[16, 16]}>
            <Col md={{ span: 6 }} xs={{ span: 12 }}>
              <Image
                src={require('../assets/vector/Supplymartbd.svg').default.src}
                width={100}
                height={68}
                style={{
                  maxWidth: '100%',
                }}
                alt=""
              />

              <div className="mb05" style={{ marginTop: '1rem' }}>
                <h5 style={{ marginBottom: 0 }}>Head Office</h5>

                <Text style={{ fontSize: '13px' }}>
                  Floor: 6 , House: 6/30, Eastern plaza( Hatirpool),
                  Dhaka,Bangladesh
                </Text>
              </div>
              <div className="mb05">
                <h5 style={{ marginBottom: 0 }}>Email</h5>
                <Text style={{ fontSize: '13px' }}>bdsupplymart@gmail.com</Text>
              </div>
              <div className="mb05">
                <h5 style={{ marginBottom: 0 }}>Phone</h5>
                <Text style={{ fontSize: '13px' }}>+88 01311-881510</Text>
              </div>
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 12 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="footerLink"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h4 style={{ marginBottom: 8 }}>CUSTOMER</h4>
                  <Link href={'/'}>Offer</Link>
                  <Link href={'/account'}>My Account</Link>
                  <Link href={'/account/orders'}>Track Order</Link>
                  <Link href={'/wishlist'}>Wishlist</Link>
                </div>
              </div>
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 12 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: screens.xs ? 'flex-start' : 'center',
                }}
              >
                <div
                  className="footerLink"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h4 style={{ marginBottom: 8 }}>INFORMATION</h4>
                  <Link href={'/about'}>About Us</Link>
                  <Link href={'/contact'}>Contact Us</Link>
                  <Link href={'/privacy'}>Privacy Policy</Link>
                  <Link href={'/terms'}>Terms & Condition</Link>
                  <Link href={'/certificates'}>Certificates</Link>
                </div>
              </div>
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 12 }}>
              <div>
                <img
                  style={{ width: '120px', marginBottom: '0.5rem' }}
                  src={require('../assets/vector/applestore.png').default.src}
                  alt=""
                  loading="lazy"
                />
              </div>
              <h4 style={{ marginBottom: 8, marginTop: 16 }}>SOCIAL LINKS</h4>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <a
                  href="https://www.facebook.com/profile.php?id=61567618606374"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialLink"
                  aria-label="facebook"
                >
                  <img
                    src={
                      require('../assets/vector/facebook_round.svg').default.src
                    }
                    alt="facebook"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61567618606374"
                  className="socialLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="instagram"
                >
                  <img
                    src={require('../assets/vector/instagram.svg').default.src}
                    alt="instagram"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61567618606374"
                  className="socialLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="youtube"
                >
                  <img
                    src={require('../assets/vector/youtube.svg').default.src}
                    alt="youTube"
                    loading="lazy"
                  />
                </a>
              </div>
            </Col>
          </Row>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <a
              href="https://otcommerce.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="otcommerce"
            >
              <img
                src={require('../assets/banner/otocommerce.png').default.src}
                alt=""
                style={{ width: '40px', marginBottom: '2rem' }}
                loading="lazy"
              />
            </a>
          </div>
          {/* <div className="companyLogos">
            <a
              href="https://acceptglobal.ltd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="azobglobal"
            >
              <img
                src={require("../assets/vector/azobglobal.svg").default.src}
                alt=""
                style={{ width: "240px", marginBottom: "2rem" }}
                loading="lazy"
              />
            </a>
            <div className="sisters">
              <a
                href="https://wholesalecartbd.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="wholesalecart"
              >
                <img
                  src={require("../assets/vector/wholesale.svg").default.src}
                  alt=""
                  loading="lazy"
                  style={{ padding: "0.4rem" }}
                />
              </a>
              <a href="/ad" aria-label="onesalemart">
                <img
                  style={{ padding: "1rem" }}
                  src={
                    require("../assets/vector/logo_vertical.svg").default.src
                  }
                  alt=""
                  loading="lazy"
                />
              </a>
              <a
                href="https://shipbaz.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="shipbaz"
              >
                <img
                  src={require("../assets/vector/shipbaz.png").default.src}
                  alt=""
                  loading="lazy"
                />
              </a>
              <a
                href="https://azobshop.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="azobshop"
              >
                <img
                  src={require("../assets/vector/azobshop.png").default.src}
                  alt=""
                  style={{ padding: "0.75rem" }}
                  loading="lazy"
                />
              </a>
            </div>
            <div className="copyRight">
              <span>
                <a
                  href="https://otcommerce.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pcOnly"
                >
                  <img
                    className="otcommerce"
                    title="Powered by OpenTrade Commerce"
                    src={
                      require("../assets/vector/otcommerce-logo.png").default
                        .src
                    }
                    alt=""
                    style={{
                      width: "57px",
                      height: "38px",
                      marginRight: "0.5rem",
                      objectFit: "contain",
                    }}
                  />
                </a>
                <a
                  href="https://acceptglobal.ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: "0.5rem", fontWeight: "bold" }}
                >
                  ACCEPT GLOBAL LIMITED.
                </a>
                2019 - 2022 All rights reserved.
              </span>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}
