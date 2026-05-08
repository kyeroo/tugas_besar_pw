import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/mainLayout";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import VehicleDetail from "./vehicles/Detail";
import PaymentSuccess from "./pages/payment_success";

import SearchVehicles from "./search/vehicles";
import MyBookings from "./pages/Mybookings";
import Navbar from "./components/Navbar";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>

        {/* Layout utama */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<MyBookings />}/>
          <Route path="/blog" element={<Blog />} />

          {/* search vehicles */}
          <Route path="/search/vehicles/:slug" element={<SearchVehicles />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

        {/* detail vehicle */}
        <Route path="/vehicles/:slug" element={<VehicleDetail />}/>

        {/* payment success */}
        <Route path="/payment-success" element={<PaymentSuccess />}/>

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;