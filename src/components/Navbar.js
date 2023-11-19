import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

function Navbar() {
  const [state, dispatch] = useStateValue();
  const location = useLocation();

  const showSidebar = () => {
    dispatch({ type: actionType.CHANGE_SIDEBAR, value: !state.sidebar });
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          {(location.pathname === "/reports" ||
            location.pathname === "/manage") && (
            <div className="right-menu">
              <span
                style={{
                  color: "white",
                  marginRight: "5px",
                }}
              >
                Meal
              </span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={state.info === "meal" ? false : true}
                  onChange={(e) => {}}
                  onClick={(e) => {
                    dispatch({ type: actionType.CHANGE_INFO });
                  }}
                />
                <span className="slider round"></span>
              </label>
              <span
                style={{
                  color: "white",
                  marginLeft: "5px",
                }}
              >
                Fund
              </span>
            </div>
          )}
        </div>
        <nav className={state.sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
