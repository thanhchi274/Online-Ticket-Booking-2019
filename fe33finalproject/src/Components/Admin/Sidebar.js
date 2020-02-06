import React from "react";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <NavLink
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">
            Movie Theater Management
          </div>
        </NavLink>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <NavLink className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">SYSTEM MANAGEMENT</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#abc"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog" />
            <span>User</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Actions:</h6>
              <NavLink className="collapse-item" to="/quan-ly-user">
                User Management
              </NavLink>
              <NavLink className="collapse-item" to="#abc">
                Upcoming...
              </NavLink>
            </div>
          </div>
        </li>
        {/* Nav Item - Utilities Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#abc"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i className="fas fa-fw fa-wrench" />
            <span>Movie</span>
          </a>
          <div
            id="collapseUtilities"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Actions:</h6>
              <NavLink className="collapse-item" to="/quan-ly-movie">
                Movie Management
              </NavLink>
              <a className="collapse-item" href="utilities-border.html">
                Upcoming
              </a>
            </div>
          </div>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">Addons</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#abc"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fas fa-fw fa-folder" />
            <span>More Action</span>
          </a>
          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Create Movie Schedule</h6>
              <a className="collapse-item" href="login.html">
                Schedule Theater System{" "}
              </a>
              <a className="collapse-item" href="register.html">
                Schedule Cinema
              </a>
              <a className="collapse-item" href="forgot-password.html">
                User Information
              </a>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}
