/* eslint-disable @next/next/no-img-element */
import React from 'react';
// import "./Slider.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const Sliders = React.memo(function Sliders() {
  const data = [
    {
      id: 33,
      image: require('../assets/banner/banner6.webp').default.src,
      primary: 'rgba(226,226,226,1) ',
      secondary: 'rgba(255,255,255,1)',
      degree: '0deg',
    },
    {
      id: 32,
      image: require('../assets/banner/banner5.webp').default.src,
      primary: 'rgba(226,226,226,1) ',
      secondary: 'rgba(255,255,255,1)',
      degree: '0deg',
    },
    {
      id: 31,
      image: require('../assets/banner/banner4.webp').default.src,
      primary: 'rgba(226,226,226,1) ',
      secondary: 'rgba(255,255,255,1)',
      degree: '0deg',
    },
    {
      id: 25,
      image: require('../assets/banner/banner3.webp').default.src,
      primary: 'rgba(226,226,226,1) ',
      secondary: 'rgba(255,255,255,1)',
      degree: '0deg',
    },
  ];

  return (
    <div className="homeSlider">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={4000}
      >
        {data.map((el) => (
          <div style={{ cursor: 'pointer' }} key={el.id}>
            <img
              className="bannerImage"
              src={el.image}
              loading="lazy"
              defer
              alt=""
              style={{
                objectFit: 'cover',
                borderRadius: 4,
                border: '1px solid #ddd',
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
});

export default Sliders;
