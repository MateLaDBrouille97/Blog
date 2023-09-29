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
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme";

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

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  const pathname = usePathname();
  // const params = useParams();

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`,
    },
    {
      href: `/Categories/USEFULHACKS`,
      label: "Useful Hacks",
      active: pathname === `/Categories/USEFULHACKS`,
    },
    {
      href: `/Categories/PROJECTS`,
      label: "Projects",
      active: pathname === `/Categories/PROJECTS`,
    },
    {
      href: `/Categories/NEWS`,
      label: "Techie's Society",
      active: pathname === `/Categories/NEWS`,
    },
    {
      href: `/Categories/TOOLS`,
      label: "Tools To",
      active: pathname === `/Categories/TOOLS`,
    },
  ];

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++//
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
    // setActiveNav(index);
  };

  useEffect(() => {
    setUser(dbUser);
  }, [dbUser]);

  return (
    <header className="header">
      <nav className="nav container-section4">
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
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-6")}
          // {...props}
        >
          {routes.map((route) => (
            // eslint-disable-next-line react/jsx-key
            <div className={!toggle ? "nav__menu show-menu" : "nav__menu"}>
              <ul className="nav__list grid gap-x-3">
                <li className="nav__item">
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      route.active
                        ? "text-black dark:text-white active-work2"
                        : "text-muted-foreground"
                    )}
                  >
                    {route.label}
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </nav>
        <div className="nav__toggle-share">
          <div
            className={toggle == true ? "nav_toggle" : "noshow"}
            onClick={() => showMenu(!toggle)}
          >
            <Icon
              icon="heroicons:bars-3-20-solid"
              className="uil uil-apps three-bars"
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
