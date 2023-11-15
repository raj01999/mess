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
  const [sidebar, setSidebar] = useState(false);
  const [state, dispatch] = useStateValue();
  const location = useLocation();

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          {location.pathname === "/reports" && (
            <div className="right-menu">
              <p
                style={{
                  color: " rgb(13, 193, 206)",
                  fontWeight: "bold",
                  marginRight: "5px",
                }}
              >
                Meal
              </p>
              <label className="switch">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    dispatch({ type: actionType.CHANGE_INFO });
                  }}
                />
                <span className="slider round"></span>
              </label>
              <p
                style={{
                  color: "#2196f3",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                Fund
              </p>
            </div>
          )}
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
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
