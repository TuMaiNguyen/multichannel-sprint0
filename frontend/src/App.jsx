// frontend/src/App.jsx
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

import Home from "./pages/public/Home";
import Menu from "./pages/public/Menu";
import Feedback from "./pages/public/Feedback";
import Contact from "./pages/public/Contact";
import NotFound from "./pages/public/NotFound";

import ProductDetail from "./pages/public/ProductDetail";
import CartPage from "./pages/public/Cart";
import CheckoutPage from "./pages/public/Checkout";

import AdminPage from "./pages/admin/Admin";

export default function App() {
  return (
    <div className="app-shell">
      {/* HEADER – giữ nguyên layout */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Sweet Heaven</div>
          <nav className="app-nav">
            <NavLink end to="/">
              Home
            </NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/feedback">Feedback</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/admin">Admin</NavLink>
          </nav>
        </div>
      </header>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
