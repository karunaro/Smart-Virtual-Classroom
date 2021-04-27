/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import { checkIsActive } from "../../_metronic/_helpers";

export function HeaderMenu({ layoutProps }) {
  const result = useSelector((state) => state.auth.user);
  console.log(result.username);
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  if (result.role === "professor") {
    return (
      <div
        id="kt_header_menu"
        className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
      >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
              "/classesGroupe"
            )}`}
          >
            <NavLink className="menu-link" to="/classesGroupe">
              <span className="menu-text">Classes</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>

          <li
            data-menu-toggle={layoutProps.menuDesktopToggle}
            aria-haspopup="true"
            className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
              "/group"
            )}`}
          >
            <NavLink className="menu-link menu-toggle" to="/Group">
              <span className="menu-text">Group</span>
              <i className="menu-arrow"></i>
            </NavLink>
            <div className="menu-submenu menu-submenu-classic menu-submenu-left">
              <ul className="menu-subnav">
                {/*begin::2 Level*/}

                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li className={`menu-item ${getMenuItemActive("/allgroups")}`}>
                  <NavLink className="menu-link" to="/allgroups">
                    <span className="menu-text">Groups</span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive("/questions")}`}>
                  <NavLink className="menu-link" to="/questions">
                    <span className="menu-text">Student's Questions</span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive("/group")}`}>
                  <NavLink className="menu-link" to="/projects">
                    <span className="menu-text">Projects</span>
                  </NavLink>
                </li>

                <li className={`menu-item ${getMenuItemActive("/my-page")}`}>
                  <NavLink className="menu-link" to="/my-page">
                    <span className="menu-text">Task Manager</span>
                  </NavLink>
                </li>
                {/*end::3 Level*/}

                {/*begin::2 Level*/}
              </ul>
            </div>
          </li>
          <li
            data-menu-toggle={layoutProps.menuDesktopToggle}
            aria-haspopup="true"
            className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
              "/MyQuizzes"
            )}`}
          >
            <NavLink className="menu-link menu-toggle" to="/MyQuizzes">
              <span className="menu-text">Quizz</span>
              <i className="menu-arrow"></i>
            </NavLink>
            <div className="menu-submenu menu-submenu-classic menu-submenu-left">
              <ul className="menu-subnav">
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/Create New Quizz"
                  )}`}
                >
                  <NavLink className="menu-link" to="/CreateNewQuizz">
                    <span className="menu-text">Create New Quizz</span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive("/My Quizzes")}`}>
                  <NavLink className="menu-link" to="/MyQuizzes">
                    <span className="menu-text">My Quizzes</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          <li
            data-menu-toggle={layoutProps.menuDesktopToggle}
            aria-haspopup="true"
            className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
              "/Meetopia"
            )}`}
          >
            <NavLink className="menu-link menu-toggle" to="/Meetopia">
              <span className="menu-text">Meetopia</span>
              <i className="menu-arrow"></i>
            </NavLink>
            <div className="menu-submenu menu-submenu-classic menu-submenu-left">
              <ul className="menu-subnav">
                <li className={`menu-item ${getMenuItemActive("/Meetopia")}`}>
                  <NavLink className="menu-link" to="/Meetopia">
                    <span className="menu-text">Create Or Join A Meetopia</span>
                  </NavLink>
                </li>
                {/*begin::2 Level*/}
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/View My Meetopias"
                  )}`}
                >
                  <NavLink className="menu-link" to="/MyMeetopias">
                    <span className="menu-text">View My Meetopias</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          {/*end::1 Level*/}

          {/*Classic submenu*/}
          {/*begin::1 Level*/}

          {/*end::1 Level*/}
        </ul>
        {/*end::Header Nav*/}
      </div>
    );
  } else if (result.role === "admin") {
    return (
      <div
        id="kt_header_menu"
        className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
      >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
              "/admins"
            )}`}
          >
            <NavLink className="menu-link" to="/admins">
              <span className="menu-text"> Admins</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive("/group")}`}
          >
            <NavLink className="menu-link" to="/Professors">
              <span className="menu-text">Professors</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
              "/classesGroupe"
            )}`}
          >
            <NavLink className="menu-link" to="/classesGroupe">
              <span className="menu-text">Classes</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>

          {/*end::1 Level*/}

          {/*Classic submenu*/}
          {/*begin::1 Level*/}

          {/*end::1 Level*/}
        </ul>
        {/*end::Header Nav*/}
      </div>
    );
  } else
    return (
      <div
        id="kt_header_menu"
        className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
      >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}

          <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
              "/classes"
            )}`}
          >
            <NavLink className="menu-link" to="/classes">
              <span className="menu-text">Classes</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>

          <li
            data-menu-toggle={layoutProps.menuDesktopToggle}
            aria-haspopup="true"
            className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
              "/group"
            )}`}
          >
            <NavLink className="menu-link menu-toggle" to="/Group">
              <span className="menu-text">Group</span>
              <i className="menu-arrow"></i>
            </NavLink>
            <div className="menu-submenu menu-submenu-classic menu-submenu-left">
              <ul className="menu-subnav">
                {/*begin::2 Level*/}

                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li className={`menu-item ${getMenuItemActive("/allgroups")}`}>
                  <NavLink className="menu-link" to="/allgroups">
                    <span className="menu-text">Groups</span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive("/questions")}`}>
                  <NavLink className="menu-link" to="/questions">
                    <span className="menu-text">Student's Questions</span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive("/group")}`}>
                  <NavLink className="menu-link" to="/projects">
                    <span className="menu-text">Projects</span>
                  </NavLink>
                </li>

                <li className={`menu-item ${getMenuItemActive("/my-page")}`}>
                  <NavLink className="menu-link" to="/my-page">
                    <span className="menu-text">Task Manager</span>
                  </NavLink>
                </li>
                {/*end::3 Level*/}

                {/*begin::2 Level*/}
              </ul>
            </div>
          </li>

          <li
            data-menu-toggle={layoutProps.menuDesktopToggle}
            aria-haspopup="true"
            className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
              "/MyQuizzes"
            )}`}
          >
            <NavLink className="menu-link menu-toggle" to="/MyQuizzes">
              <span className="menu-text">Quizz</span>
              <i className="menu-arrow"></i>
            </NavLink>
            <div className="menu-submenu menu-submenu-classic menu-submenu-left">
              <ul className="menu-subnav">
                <li className={`menu-item ${getMenuItemActive("/My Quizzes")}`}>
                  <NavLink className="menu-link" to="/MyQuizzes">
                    <span className="menu-text">My Quizzes</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
              "/Meetopia"
            )}`}
          >
            <NavLink className="menu-link" to="/Meetopia">
              <span className="menu-text">Meetopia</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>

          {/*end::1 Level*/}

          {/*Classic submenu*/}
          {/*begin::1 Level*/}

          {/*end::1 Level*/}
        </ul>
        {/*end::Header Nav*/}
      </div>
    );
}
