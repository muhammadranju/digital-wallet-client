import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import ScrollToTop from "./components/layout/ScrollToTop";
import AnnouncementModal from "./components/layout/AnnouncementModal";

const App = () => {
  return (
    <>
      <CommonLayout>
        <ScrollToTop />
        <AnnouncementModal />
        <Outlet />
      </CommonLayout>
    </>
  );
};

export default App;
