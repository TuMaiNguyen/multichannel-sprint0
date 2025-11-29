// frontend/src/pages/admin/AdminLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const pillStyle = {
  padding: "10px 22px",
  borderRadius: "999px",
  fontSize: "15px",
  textDecoration: "none",
};

export default function AdminLayout() {
  return (
    <main className="page page-admin">
      {/* HERO ADMIN */}
      <section
        style={{
          margin: "24px",
          marginBottom: "16px",
          padding: "24px 28px",
          borderRadius: "28px",
          background:
            "linear-gradient(135deg, #ffe4f4 0%, #fee2e2 30%, #e0f2fe 100%)",
          boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "18px",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "999px",
              backgroundColor: "#f97373",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: "18px",
              boxShadow: "0 10px 30px rgba(248,113,113,0.5)",
            }}
          >
            SH
          </div>
          <div>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 800,
                margin: 0,
                color: "#111827",
              }}
            >
              Sweet Heaven Bakery — Media Hub
            </h1>
            <p
              style={{
                margin: 0,
                marginTop: "4px",
                fontSize: "14px",
                color: "#4b5563",
              }}
            >
              Cổng truyền thông đa kênh cho chuỗi tiệm bánh.
            </p>
          </div>
        </div>

        {/* TAB ADMIN */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <NavLink
            to="/admin"
            end
            style={({ isActive }) => ({
              ...pillStyle,
              backgroundColor: isActive ? "#fef2f2" : "#ffffff",
              color: isActive ? "#b91c1c" : "#374151",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/compose"
            style={({ isActive }) => ({
              ...pillStyle,
              backgroundColor: isActive ? "#fdf2ff" : "#ffffff",
              color: isActive ? "#9d174d" : "#374151",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            Đăng bài
          </NavLink>
          <NavLink
            to="/admin/calendar"
            style={({ isActive }) => ({
              ...pillStyle,
              backgroundColor: isActive ? "#eff6ff" : "#ffffff",
              color: isActive ? "#1d4ed8" : "#374151",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            Lịch xuất bản
          </NavLink>
          <NavLink
            to="/admin/inbox"
            style={({ isActive }) => ({
              ...pillStyle,
              backgroundColor: isActive ? "#fef9c3" : "#ffffff",
              color: isActive ? "#92400e" : "#374151",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            Tin nhắn KH
          </NavLink>
        </div>
      </section>

      {/* NƠI RENDER CON – Dashboard / Compose / Calendar / Inbox */}
      <section style={{ padding: "0 28px 40px" }}>
        <Outlet />
      </section>
    </main>
  );
}
