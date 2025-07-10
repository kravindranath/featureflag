import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./components/Navbar";
import FeatureFlagSidebar from "./components/FeatureFlagSidebar";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <FeatureFlagSidebar />
      <AppRoutes />
    </BrowserRouter>
  );
}
