import React from 'react'
import "./Layout.css";
export default function Footer() {
  return (
    <div className="footer">
      <h3>Task Management</h3>
      <p className="footer-text">
        All rights reserved. Copyright &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
