import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import RoadViewPage from "../pages/RoadViewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/searchPage",
    element: <SearchPage />,
  },
  {
    path: "/roadview",
    element: <RoadViewPage />
  }
]);

export default router;
