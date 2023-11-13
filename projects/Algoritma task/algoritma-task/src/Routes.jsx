import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

const PageRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/orders">
        <Route index element={<OrdersPage />} />

        <Route path=":id" element={<OrderDetailsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRouting;
