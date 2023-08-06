import React from "react";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
import MenuPage from "./pages/menu/menupage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
