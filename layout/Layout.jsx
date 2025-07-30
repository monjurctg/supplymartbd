import React, { useState } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";
import MainContent from "./MainContent";
import Bottombar from "./Bottombar";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import FooterNav from "./FooterNav";

export default function Layout({ children }) {
  const screens = useBreakpoint();
  const [scroll, setScroll] = useState(true);

  return (
    <div>
      <Head>
        <title>Supplymartbd ~ Buy Get & Enjoy</title>
        <meta name="description" content="Supplymartbd" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar state={{ scroll, setScroll }} />
      <SideBar />
      <MainContent state={{ scroll }}>{children}</MainContent>
      {screens.xs && <Bottombar />}
      <FooterNav />
    </div>
  );
}
