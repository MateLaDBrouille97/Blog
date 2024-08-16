// import styles from './styles.module.scss';

import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Index() {
  useLayoutEffect(() => {
    gsap.to(".img", {
      clipPath: "polygon(0 100%,100% 100%,100% 0%,0% 0%)",
      ease: "power4.inOut",
      stagger: { amount: 1.5 },
      duration: 3,
    });
    gsap.to(".loader", {
      clipPath: "polygon(0% 0%, 100% 0%,100% 0%, 0% 0%)",
      ease: "power4.inOut",
      delay: 2,
      duration: 3,
    });
  }, []);

  return (
    <>
      <section
        className="section section4 mx-auto md:px-20 py-16 w-8/9 "
        id="section1"
      >
        <div className="container-section4">
          <div className="container19">
            <h1>OTOMATA</h1>
            <span>-the blog-</span>
          </div>
        </div>
      </section>
    </>
  );
}
