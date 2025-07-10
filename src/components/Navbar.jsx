import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

import { isFeatureEnabled } from "../config/featureFlags";

export default function NavBar() {
  const location = useLocation();

  let navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/about", label: "About" },
  ];

  const showContact = isFeatureEnabled("showContact");
  if (showContact) {
    navItems = navItems.push({ path: "/contact", label: "Contact" });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={isActive(item.path) ? "active" : ""}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
