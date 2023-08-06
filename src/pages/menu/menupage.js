import React from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from "../dashboard/Dashboard";

export default function MenuPage() {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/dashboard"); // Navigate to the /dashboard route
  };

  return (
    <div>
      <h1>Menu Page</h1>
      <button onClick={handleDashboardClick}>Dashboard</button>
    </div>
  );
}
