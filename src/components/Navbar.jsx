import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

import useFeatureFlag from "../hooks/useFeatureFlag";

export default function NavBar() {
  const location = useLocation();

  let navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/about", label: "About" },
  ];

  console.log(navItems);

  const showContact = useFeatureFlag("showContact");
  const showFlags = useFeatureFlag("showFlags");

  if (showFlags) {
    // Render something to verify
    console.log("✅ showFlags is ON");
  }

  if (showContact) {
    navItems = [...navItems, { path: "/contact", label: "Contact" }];
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      {navItems?.map((item) => (
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
