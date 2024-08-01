"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import styles from './style.module.scss';
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import Link from "next/link";
import { cn } from "../../lib/utils";

export default function Header4() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);
  const navContainer = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
          gsap.to(navContainer.current, {
            opacity: 0,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(
            button.current,
            { scale: 0, duration: 0.25, ease: "power1.out" },
            setIsActive(false)
          );
          gsap.to(navContainer.current, {
            opacity: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
      },
    });
  }, []);

  return (
    <>
      <section
        className="section section4 mx-auto md:px-20 py-16 w-5.5/6 "
        id="section1"
      >
        <div ref={header} className="container-section4 header4">
          <div className="logo4">
            <p className="copyright">
              <Link href="/" legacyBehavior>
                ©
              </Link>
            </p>
            <div className="name">
              <p className="codeBy">OTOMATA .</p>
              <Link href="/" legacyBehavior>
                <p className="dennis"></p>
              </Link>
              <Link href="/" legacyBehavior>
                <p className="snellenberg"> by Manuel</p>
              </Link>
            </div>
          </div>
          <div ref={navContainer} className="nav4">
            <Magnetic>
              <div className="el4">
                <Link href="/Home" legacyBehavior>
                  <a>Home</a>
                </Link>
                <div className="indicator"></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className="el4">
                <Link href="/Categories/NEWS" legacyBehavior>
                  <a>Techie's Society</a>
                </Link>

                <div className="indicator"></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className="el4">
                <Link href="/Categories/USEFULHACKS" legacyBehavior>
                  <a>Useful Hacks</a>
                </Link>
                <div className="indicator"></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className="el4">
                <Link href="/Categories/TOOLS" legacyBehavior>
                  <a>Tools To</a>
                </Link>
                <div className="indicator"></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className="el4">
                <Link href="/" legacyBehavior>
                  <a>About</a>
                </Link>
                <div className="indicator"></div>
              </div>
            </Magnetic>
          </div>
        </div>
        <div ref={button} className="headerButtonContainer2">
          <Rounded
            onClick={() => {
              setIsActive(!isActive);
            }}
            className="button4"
          >
            <div className={`burger2 ${isActive ? "burgerActive2" : ""}`}></div>
          </Rounded>
        </div>
        <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
      </section>
    </>
  );
}
