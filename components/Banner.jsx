import { Carousel, Image } from 'antd';
import React from 'react';

export default function Banner() {
  return (
    <Carousel className="bannerImage" style={{ width: '100%' }}>
      {/* <div> */}
      <Image
        src={require('../assets/banner/banner3.webp').default.src}
        className="bannerImage"
        layout="fill"
        style={{
          objectFit: 'cover',
          width: '100%',
          borderRadius: 4,
          border: '1px solid #ddd',
        }}
        alt=""
        preview={false}
      />
      {/* </div> */}
      {/* <div>
        <Image
          src={require("../assets/banner/banner2.webp").default.src}
          className="bannerImage"
          layout="fill"
          style={{
            objectFit: "cover",
            width: "100%",
            borderRadius: 4,
            border: "1px solid #ddd",
          }}
          alt=""
          preview={false}
        />
      </div> */}
    </Carousel>
  );
}
