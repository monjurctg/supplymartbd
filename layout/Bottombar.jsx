/* eslint-disable @next/next/no-img-element */
import { Drawer, Layout, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  IoBagHandleOutline,
  IoCartOutline,
  IoChatboxOutline,
  IoHeartOutline,
} from 'react-icons/io5';
import Theme from '../utils/Theme';
import SideMenu from './SideMenu';
const { Header } = Layout;
const { Text } = Typography;

export default function Bottombar() {
  //   const profile = localStorage.getItem("profile");
  //   let profileData = profile ? JSON.parse(profile) : null;
  //   const location = useLocation();
  const [drawer, setDrawer] = useState(false);
  const screens = useBreakpoint();
  let router = useRouter();

  console.log(router.pathname);
  return (
    <>
      {
        <div
          style={{
            background: '#fff',
            padding: screens.xs ? '0 0.25rem' : '0px 2rem',
            position: 'fixed',
            width: '100%',
            boxShadow: '0 1px 16px rgba(0,0,0,.1)',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            zIndex: '1',
            height: '64px',
            bottom: 0,
            display: 'flex',
            flexDirection: 'row',
            fontSize: '13px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              flex: 1,
              color: Theme.primaryHighlight,
            }}
            onClick={() => setDrawer(true)}
          >
            <IoBagHandleOutline size={22} />
            <Text
              style={{
                color: Theme.primaryHighlight,
              }}
            >
              Categories
            </Text>
          </div>
          <Link passHref href={'/wishlist'} style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                flex: 1,
                color: Theme.primaryHighlight,
              }}
            >
              <IoHeartOutline size={24} color={Theme.primaryHighlight} />
              <Text
                style={{
                  color: Theme.primaryHighlight,
                }}
              >
                Wishlist
              </Text>
            </div>
          </Link>
          <Link passHref href={'/'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                flex: 1,
                color: Theme.primaryHighlight,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  background: Theme.primaryHighlight,
                  borderRadius: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop:
                    router.pathname === '/product/[platform]/[code]' ||
                    router.pathname.includes('checkout') ||
                    router.pathname.includes('/cart')
                      ? -10
                      : -24,
                }}
              >
                <img
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'contain',
                  }}
                  src={
                    require('../assets/vector/Supplymartbd_white.svg').default
                      .src
                  }
                  alt=""
                />
              </div>
            </div>
          </Link>
          <Link passHref href={'/cart'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                flex: 1,
                color: Theme.primaryHighlight,
              }}
            >
              <IoCartOutline size={24} color={Theme.primaryHighlight} />
              <Text
                style={{
                  color: Theme.primaryHighlight,
                }}
              >
                Cart
              </Text>
            </div>
          </Link>
          <Link
            passHref
            href={'https://www.messenger.com/t/61567618606374'}
            target="_blank"
            rel="noreferrer"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                flex: 1,
                color: Theme.primaryHighlight,
              }}
            >
              <IoChatboxOutline size={22} color={Theme.primaryHighlight} />
              <Text
                style={{
                  color: Theme.primaryHighlight,
                }}
              >
                Chat
              </Text>
            </div>
          </Link>
        </div>
      }
      <Drawer
        placement="left"
        width={'70%'}
        bodyStyle={{ padding: '8px' }}
        closeIcon={false}
        onClose={() => setDrawer(false)}
        visible={drawer}
      >
        <SideMenu setDrawer={setDrawer} />
      </Drawer>
    </>
  );
}
