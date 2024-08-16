"use client";

import Image from "next/image";
import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { slideUp } from "./animation";
import { motion } from "framer-motion";

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);

  const images = ["/agriculture3.jpg", "/drone.jpg", "/coWorkers2.jpg", "/kirill-shavlo-PY5DFAeLFAA-unsplash.jpg", "/engineer.jpg","/electricity2.jpg","/politics2.jpg","/light.jpg","/electricity3.jpg","/windPower2.jpg","/night.jpg","/microscope.jpg","/robot.jpg","/planet.jpg","/light2.jpg","/nuclear.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  let xPercent = 0;
  let direction = -1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.70,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);

    // Start the image carousel
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.15 * direction;
  };

  return (
    <>
      <section
        className="section section4 mx-auto md:px-20 py-16 w-9/10"
        id="section1"
      >
        <div className="container-section4">
    <motion.main
      variants={slideUp}
      initial="initial"
      animate="enter"
      className="landing"
    >
      <Image src={images[currentImageIndex]} fill={true} alt="background" />
      <div className="sliderContainer">
        <div ref={slider} className="slider">
          <p ref={firstText}>OTOMATA the Blog - </p>
          <p ref={secondText}>OTOMATA the Blog -</p>
        </div>
      </div>
      <div data-scroll data-scroll-speed={0.2} className="description">
        <div className="position_landing">
          {/* Add any other content you need */}
        </div>
      </div>
    </motion.main>
    </div>
    </section>
    </>
  );
}
