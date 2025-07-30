/* eslint-disable @next/next/no-img-element */
import { Badge } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  IoCartOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoSearch,
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction, getUsersExtra } from '../actions/authAction';
import ImageUpload from '../components/ImageUpload';
import Search from '../components/Search';
import Theme from '../utils/Theme';

export default function Navbar(props) {
  const { scroll, setScroll } = props.state;
  const screens = useBreakpoint();
  const [data, setData] = useState(null);
  const [platformSelector, setPlatformSelector] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 200) {
      if (window.screen.width <= 768) {
        setScroll(false);
      } else {
        setScroll(true);
      }
    }
    if (position < 50) {
      setScroll(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (
      keyword.toLowerCase().includes('https') ||
      keyword.toLowerCase().includes('www')
    ) {
      let data = ResolveLink(keyword, router);

      if (data.product_code) {
        setKeyword(data.product_code);
      }
      if (data.link) {
        router.push(data.link);
      }
    } else if (keyword) {
      router.push(`/shop/china/${keyword}`);
    }
  };

  const dispatch = useDispatch();
  const dispatchProfile = useDispatch();
  useEffect(() => {
    dispatch(getUsersExtra());
    dispatchProfile(getUserProfileAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extra = useSelector((state) => state.auth.extra);
  const profile = useSelector((state) => state.auth.profile);

  console.log(profile);

  return (
    <>
      {
        <div
          className={!scroll ? 'header normalHeader' : 'header'}
          style={{
            // background: "linear-gradient(180deg,#F55A05,#F55A05)",
            background: '#97DAF6',
            position: 'fixed',
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            zIndex: 110,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: scroll || !screens.xs ? 'flex' : 'none',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginRight: '1rem',
                flex: 2,
                cursor: 'pointer',
              }}
            >
              <Link
                href="/"
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={require('../assets/vector/SupplyMartLogoPng.png').default.src}
                  alt="SupplyMart Logo"
                  className="logo"
                  height={50}
                />
              </Link>

            </div>
            <Search />
            <div
              style={{
                flex: 2,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  padding: '0 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Link
                  href={'/cart'}
                  passHref
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Badge
                      count={extra?.cart_count ? extra.cart_count : 0}
                      style={{
                        backgroundColor: '#ffffff00',
                        boxShadow: 'none',
                        color: Theme.textBlack,
                      }}
                      size="small"
                    >
                      <IoCartOutline size={30} color={Theme.textBlack} />
                    </Badge>
                  </div>
                </Link>
              </div>
              <div
                style={{
                  padding: '0 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Link href={'/wishlist'} passHref>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Badge
                      count={extra?.wishlist_count ? extra.wishlist_count : 0}
                      style={{
                        backgroundColor: '#ffffff00',
                        boxShadow: 'none',
                        color: Theme.textBlack,
                      }}
                      size="small"
                    >
                      <IoHeartOutline size={28} color={Theme.textBlack} />
                    </Badge>
                  </div>
                </Link>
              </div>
              {/* <div
                className="showNotXs"
                style={{
                  padding: '0 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginTop: '0.35rem',
                }}
              >
                <a
                  href="https://www.messenger.com/t/61567618606374"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IoChatboxOutline size={26} color={Theme.textBlack} />
                </a>
              </div> */}

              <Link href={'/account'} passHref>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  <IoPersonOutline size={25} color={Theme.textBlack} />
                  {profile && (
                    <div
                      className="showNotXs"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'black',
                        lineHeight: '20px',
                        marginLeft: '0.75rem',
                      }}
                    >
                      <span style={{ color: Theme.textBlack }}>
                        {profile.name ? profile.name : 'Customer'}
                      </span>
                      <span
                        style={{ fontSize: '12px', color: Theme.textBlack }}
                      >
                        {profile.phone}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
          <div
            className="showXs"
            compact
            style={{
              display: screens.xs ? 'flex' : 'none',
              borderRadius: 6,
              marginBottom: scroll ? 16 : 0,
              height: '40px',
              backgroundColor: '#fff',
            }}
          >
            <ImageUpload />
            <input
              style={{
                height: '40px',
                boxShadow: 'none',
                border: 'none',
                flex: 1,
              }}
              placeholder={'Search product'}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: Theme.textBlack,
                color: 'white',
                border: '1px solid' + Theme.primary,
                width: '60px',
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
              }}
              onClick={() => {
                handleSearch(keyword);
              }}
            >
              <IoSearch size={20} style={{ height: '40px' }} />
            </button>
          </div>
        </div>
      }
    </>
  );
}
