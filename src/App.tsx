import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import ScrollToTop from "./components/layout/ScrollToTop";

const App = () => {
  return (
    <>
      <CommonLayout>
        <ScrollToTop />
        <Outlet />
      </CommonLayout>
    </>
  );
};

export default App;
