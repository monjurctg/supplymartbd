import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { ResolveLink } from '../utils/ResolveLink';
import Theme from '../utils/Theme';
import ImageUpload from './ImageUpload';

export default function Search({ setPlatformSelector }) {
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

  return (
    <div
      style={{
        flex: 3,
        display: 'flex',
        // border: "2px solid #232F3E",
        borderRadius: 6,
        overflow: 'hidden',
      }}
      className="showNotXs"
    >
      <ImageUpload />
      <input
        value={keyword}
        style={{
          height: '40px',
          boxShadow: 'none',
          border: 'none',
          width: '100%',
          paddingLeft: 8,
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
      <div
        type={'default'}
        style={{
          height: '40px',
          width: '80px',
          background: Theme.textBlack,
          display: 'flex',
          border: 'none',
          color: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
        onClick={() => {
          handleSearch(keyword);
        }}
      >
        <IoSearch size={20} style={{ height: '40px' }} />
      </div>
    </div>
  );
}
