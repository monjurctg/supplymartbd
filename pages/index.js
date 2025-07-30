import { Card, Carousel, Col, Row, Image } from "antd";
import Text from "antd/lib/typography/Text";
import Head from "next/head";
import { default as NextImage } from "next/image";
import ProductContainer from "../components/ProductContainer";
import Banner from "../components/Banner";
import PlatformSlider from "../components/PlatformSlider";
import CategoryGrid from "../components/CategoryGrid";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import ProductSlider from "../components/ProductSlider";
import MoreProducts from "../components/MoreProduct";
import Sliders from "../components/Slider";

export default function Home() {
  const screens = useBreakpoint();
  return (
    <div>
      <Head>
        <title>Supplymartbd ~ Buy Get & Enjoy</title>
        <meta name="description" content="Supplymartbd" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="homeBanner">
        {/* <Banner /> */}
        <Sliders />
        <ProductSlider />
      </div>
      <CategoryGrid />
      <ProductContainer keyword={"shoe"} />
      <ProductContainer keyword={"perfume"} />
      <ProductContainer keyword={"makeup"} />
      <ProductContainer keyword={"bag"} />
      <MoreProducts />
    </div>
  );
}
