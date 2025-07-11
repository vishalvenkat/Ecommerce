import { Footer } from "./Components/Footer.tsx";
import { Header } from "./Components/Header.tsx";
import { Container } from "react-bootstrap";
import { HomeScreen } from "./Screens/HomeScreen.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductScreen } from "./Screens/ProductScreen.tsx";
import CartScreen from "./Screens/CartScreen.tsx";
import LoginScreen from "./Screens/LoginScreen.tsx";
import RegisterScreen from "./Screens/RegisterScreen.tsx";
import ShippingScreen from "./Screens/ShippingScreen.tsx";
import PrivateRoute from "./Components/PrivateRoute.tsx";
import AdminRoute from "./Components/AdminRoute.tsx";
import OrderListScreen from "./Screens/Admin/OrderListScreen.tsx";
import PaymentScreen from "./Screens/PaymentScreen.tsx";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen.tsx";
import OrderScreen from "./Screens/OrderScreen.tsx";
import ProfileScreen from "./Screens/ProfileScreen.tsx";
import ProductListScreen from "./Screens/Admin/ProductListScreen.tsx";
import ProductEditScreen from "./Screens/Admin/ProductEditScreen.tsx";
import UserListScreen from "./Screens/Admin/UserListScreen.tsx";

export const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/products/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="" element={<PrivateRoute />}>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>
            <Route path="" element={<AdminRoute />}>
              <Route path="/admin/orderlist" element={<OrderListScreen />} />
              <Route
                path="/admin/productlist"
                element={<ProductListScreen />}
              />
              <Route
                path="/admin/product/:id/edit"
                element={<ProductEditScreen />}
              />
              <Route
                path="/admin/product/create"
                element={<ProductEditScreen />}
              />
              <Route path="/admin/userlist" element={<UserListScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};
