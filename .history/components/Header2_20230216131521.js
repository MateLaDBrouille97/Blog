import React, { useState, useEffect } from "react";
// import Pic from "../../assets/Mur.jpg";
// import { useUserContext } from "../../contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
// import Head from "next/head";

const Header = () => {
  /*==================== Show Scroll ====================== */
  // window.addEventListener("scroll",function(){
  //     const header = this.document.querySelector(".header");
  //         //scroll higher than 200 viewport height
  //         //add scroll header class to a tag with the scroll-top
  //     if(this.scrollY>=80) header.classList.add("scroll-header");
  //     else header.classList.remove("scroll-header");
  // })
  /*==================== Toggle Menu ====================== */
  const [toggle, showMenu] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");

  /* +++++++++++++++++++++++++++++++++++++++++++++++++ */
  //   const { dbUser, image } = useUserContext();

  const breakpoints = (width) => {
    if (width < 640) {
      return "xs";
    } else if (width >= 640 && width < 768) {
      return "sm";
    } else if (width >= 768 && width < 1024) {
      return "md";
    } else if (width >= 1024) {
      return "lg";
    }
  };

  // const [breakpoint, setBreakpoint] = useState(() =>
  //   breakpoints(typeof window !== "undefined" && window.innerWidth)
  // );

  useEffect(() => {
    if (toggle) {
      // const calcInnerWidth = function () {
      //   setBreakpoint(breakpoints(window.innerWidth));
      // };
      // window.addEventListener("resize", calcInnerWidth);
      window.addEventListener("scroll", function () {
        const header = this.document.querySelector(".header");
        //scroll higher than 200 viewport height
        //add scroll header class to a tag with the scroll-top
        if (this.scrollY >= 80) header.classList.add("scroll-header");
        else header.classList.remove("scroll-header");
      });
    }
  }, []);

  useEffect(() => {
    showMenu(true);
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__logo-container">
          <div>
            {/* {image && (
              <Image
                src={image}
                alt=""
                className="nav__lg-img"
                width={60}
                height={60}
              />
            )} */}
            <div className="md:flex-none w-80 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
              <input
                type="text"
                className="input-text"
                placeholder="Search..."
              ></input>
            </div>
          </div>
          <a
            href="#home"
            onClick={() => setActiveNav("#home")}
            className={
              activeNav === "#home" ? "nav__logo active-link" : "nav__logo"
            }
          >
            {/* {dbUser?.firstName} . */}
          </a>
        </div>

        <div className={!toggle ? "nav__menu show-menu" : "nav__menu"}>
          <ul className="nav__list grid">
            <li className="nav__item">
              <a
                href="#home"
                onClick={() => setActiveNav("#home")}
                className={
                  activeNav === "#home" ? "nav__link active-link" : "nav__link"
                }
              >
                <i className="uil uil-estate nav__icon"></i> Home
              </a>
            </li>

            <li className="nav__item">
              <a
                href="#about"
                onClick={() => setActiveNav("#about")}
                className={
                  activeNav === "#about" ? "nav__link active-link" : "nav__link"
                }
              >
                <i className="uil uil-user nav__icon"></i> About
              </a>
            </li>

            <li className="nav__item">
              <a
                href="#portfolio"
                onClick={() => setActiveNav("#portfolio")}
                className={
                  activeNav === "#portfolio"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                <i className="uil uil-scenery nav__icon"></i> Portfolio
              </a>
            </li>

            <li className="nav__item">
              <a
                href="#contact"
                onClick={() => setActiveNav("#contact")}
                className={
                  activeNav === "#contact"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                <i className="uil uil-scenery nav__icon"></i> Contact
              </a>
            </li>
          </ul>
          <Icon
            icon="uil:times"
            className="nav__close"
            onClick={() => showMenu(!toggle)}
          ></Icon>
        </div>
        <div className="nav_toggle" onClick={() => showMenu(!toggle)}>
          <Icon icon="uil:apps" className="uil uil-apps"></Icon>
        </div>
      </nav>
    </header>
  );
};

export default Header;
