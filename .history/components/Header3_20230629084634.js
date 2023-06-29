import React, { useState, useEffect } from "react";
// import Pic from "../../assets/Mur.jpg";
import { useUserContext } from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import LinkShare from "./LinkShare";
import { useRouter } from "next/router";
import image from "../public/images/otomat logo-black-on-white.png";
import BuyMeACoffee from "./BuyMeACoffee";

export default function Header3() {
  /*==================== Toggle Menu ====================== */

  const [toggle, showMenu] = useState(false);
  const [user, setUser] = useState("");
  const [activeNav, setActiveNav] = useState("#home");
  const [item, setItem] = useState({ name: "All" });
  const router = useRouter();
  const { dbUser } = useUserContext();

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

  const handleClick = (e, index) => {
    setItem({ name: e.target.textContent.toLowerCase() });
    setActiveNav(index);
  };

  useEffect(() => {
    setUser(dbUser);
  }, [dbUser]);

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__logo-container">
          <div className="nav__logo">
            <Link href={`/`} legacyBehavior>
              {image && (
                <Image
                  src={image}
                  alt=""
                  className="nav__lg-img"
                  width={100}
                  height={20}
                />
              )}
            </Link>
          </div>
        </div>

        <div className={!toggle ? "nav__menu2 show-menu" : "nav__menu2"}>
          <ul className="nav__list2 column">
            <li className="nav__item">
              <Link href={`/`} legacyBehavior>
                <a
                  href="#home"
                  onClick={() => setActiveNav("#home")}
                  className={
                    activeNav === "#home"
                      ? "nav__link2 active-link"
                      : "nav__link2"
                  }
                >
                  <i className="uil uil-estate nav__icon"></i> Home
                </a>
              </Link>
            </li>

            <li className="nav__item">
              <Link href={`/Categories/USEFULHACKS`} legacyBehavior>
                <a
                  href="#usefulHacks"
                  onClick={() => setActiveNav("#usefulHacks")}
                  className={
                    activeNav === "#usefulHacks"
                      ? "nav__link2 active-link"
                      : "nav__link2"
                  }
                >
                  <i className="uil uil-user nav__icon"></i> UseFul Hacks
                </a>
              </Link>
            </li>

            <li className="nav__item">
              <Link href={`/Categories/PROJECTS`} legacyBehavior>
                <a
                  href="#projects"
                  onClick={() => setActiveNav("#projects")}
                  className={
                    activeNav === "#projects"
                      ? "nav__link2 active-link"
                      : "nav__link2"
                  }
                >
                  <i className="uil uil-scenery nav__icon"></i> Projects
                </a>
              </Link>
            </li>

            <li className="nav__item">
              <Link href={`/Categories/NEWS`} legacyBehavior>
                <a
                  href="#news"
                  onClick={() => setActiveNav("#news")}
                  className={
                    activeNav === "#news"
                      ? "nav__link2 active-link"
                      : "nav__link2"
                  }
                >
                  <i className="uil uil-scenery nav__icon"></i>Techie's Society
                </a>
              </Link>
            </li>

            <li className="nav__item nav-item-border">
              <Link href={`/Categories/TOOLS`} legacyBehavior>
                <a
                  href="#tools"
                  onClick={() => setActiveNav("#tools")}
                  className={
                    activeNav === "#tools"
                      ? "nav__link2 active-link"
                      : "nav__link2 nav-item-border"
                  }
                >
                  <i className="uil uil-scenery nav__icon"></i>Tools To
                </a>
              </Link>
            </li>
          </ul>
         <div className="nav__close-container">
         <Icon
            icon="uil:times"
            className="nav__close2"
            onClick={() => showMenu(!toggle)}
          ></Icon>
         </div>
          
          
          
        </div>
        <div className="nav__toggle-share">
          <div
            className={toggle == true ? "nav_toggle" : "noshow"}
            onClick={() => showMenu(!toggle)}
          >
            <Icon
              icon="heroicons:bars-3-20-solid"
              className="uil uil-apps"
            ></Icon>
          </div>
          <div className="nav__toggle-share-socials">
            <BuyMeACoffee author={user} />
            <LinkShare className="share" />
          </div>
        </div>
      </nav>
    </header>
  );
}
