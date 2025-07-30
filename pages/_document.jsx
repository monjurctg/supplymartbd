import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          {/* <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&display=swap" rel="stylesheet" />
           */}
          <link
            href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <button id="bKash_button" style={{ display: "none" }}>
            Pay With BKash
          </button> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
