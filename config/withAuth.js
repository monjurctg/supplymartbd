import { Card, Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "../components/Login";
import { getCookieFromBrowser } from "../utils/cookiesHandler";

const withAuth = (Component) => {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const token = getCookieFromBrowser("site_jwt");
    let router = useRouter();
    useEffect(() => {
      if (!token) {
        router.push("/login");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // If user is not logged in, return login component
    if (!token) {
      return <></>;
      // return (
      //   <div
      //     style={{
      //       width: "100%",
      //       height: "92vh",
      //       display: "flex",
      //       alignItems: "center",
      //       justifyContent: "center",
      //     }}
      //   >
      //     <Card style={{ width: "600px", maxWidth: "90%" }}>
      //       <Login />
      //     </Card>
      //   </div>
      // );
    } else {
      // If user is logged in, return original component
      return <Component {...props} />;
    }
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
