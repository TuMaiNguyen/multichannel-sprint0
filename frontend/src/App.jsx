// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home";
import Menu from "./pages/public/Menu";
import Feedback from "./pages/public/Feedback";
import Contact from "./pages/public/Contact";
import ProductDetail from "./pages/public/ProductDetail";
import CartPage from "./pages/public/Cart";
import CheckoutPage from "./pages/public/Checkout";

import Dashboard from "./pages/admin/Dashboard";
import Compose from "./pages/admin/Compose";
import Calendar from "./pages/admin/Calendar";
import Inbox from "./pages/admin/Inbox";

import NotFound from "./pages/public/NotFound";
import { MENU_ITEMS } from "./lib/menuData";

// ---- Cart helpers ----
function loadCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("sh_cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  try {
    window.localStorage.setItem("sh_cart", JSON.stringify(cart));
  } catch {
    // ignore
  }
}

export default function App() {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = (productId, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: productId, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  // ---- HEADER styles (giống ảnh đẹp hồi trước, dùng inline cho chắc) ----
  const headerOuterStyle = {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(148,163,184,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 20,
  };

  const headerInnerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "14px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const brandStyle = {
    fontSize: "24px",
    fontWeight: 800,
    color: "#1d4ed8",
    letterSpacing: "0.03em",
  };

  const navStyle = {
    display: "flex",
    alignItems: "center",
  };

  const navLinkStyle = ({ isActive }) => ({
    padding: "8px 18px",
    borderRadius: "999px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 500,
    color: isActive ? "#1d4ed8" : "#111827",
    backgroundColor: isActive ? "rgba(191,219,254,0.9)" : "transparent",
    transition: "background-color 0.15s ease, color 0.15s ease",
    marginLeft: "8px",
  });

  const appBackground = {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#fff7f7 0%,#f0f9ff 35%,#ecfdf5 70%,#fef3c7 100%)",
  };

  const mainStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px 48px",
  };

  const footerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px 24px",
    fontSize: "14px",
    color: "#6b7280",
  };

  return (
    <div style={appBackground}>
      <header style={headerOuterStyle}>
        <div style={headerInnerStyle}>
          <div style={brandStyle}>Sweet Heaven</div>
          <nav style={navStyle}>
            <NavLink to="/" end style={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/menu" style={navLinkStyle}>
              Menu
            </NavLink>
            <NavLink to="/feedback" style={navLinkStyle}>
              Feedback
            </NavLink>
            <NavLink to="/contact" style={navLinkStyle}>
              Contact
            </NavLink>
            <NavLink to="/admin" style={navLinkStyle}>
              Admin
            </NavLink>
          </nav>
        </div>
      </header>

      <main style={mainStyle}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route
            path="/menu/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                clearCart={clearCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} clearCart={clearCart} />}
          />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/compose" element={<Compose />} />
          <Route path="/admin/calendar" element={<Calendar />} />
          <Route path="/admin/inbox" element={<Inbox />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer style={footerStyle}>
        © 2025 Sweet Heaven Bakery. Team 14 – Mai (Leader/Dev), Thùy (Dev/Tester), Hân (BA/QA).
      </footer>
    </div>
  );
}
