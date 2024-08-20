import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Scroll to top whenever the pathname changes

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
