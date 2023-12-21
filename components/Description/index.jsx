import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import styles from "../../styles/style.module.css";

async function cutDescription(description) {
  try {
    if (!description) {
      throw new Error("Description is empty or undefined");
    }

    const maxSubstringLength = 31;
    const descriptionArray = [];

    for (let i = 0; i < description.length; i += maxSubstringLength) {
      const substring = description.substring(i, i + maxSubstringLength);
      descriptionArray.push(substring);
    }

    return descriptionArray;
  } catch (error) {
    console.error("Error cutting description:", error.message);
    throw error;
  }
}

export default function Index({ post }) {
  //   const phrases = [
  //     post?.description?.substring(0, 30),
  //     post?.description?.substring(30, 60),
  //     post?.description?.substring(60, 90),
  //     post?.description?.substring(90, 120),
  //     post?.description?.substring(120, 150),
  //     post?.description?.substring(150, 180),
  //     post?.description?.substring(180, 210),
  //   ];

  const [phrases, setPhrases] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (post && post.description) {
          const result = await cutDescription(post.description);
          setPhrases(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, [post]);

  return (
    <div className={styles.description}>
      {phrases &&
        post &&
        phrases.map((phrase, index) => {
          return <AnimatedText key={index}>{phrase}</AnimatedText>;
        })}
    </div>
  );
}

// const calculateDuration = (length) => {
//   // Adjust this factor based on your preference
//   const factor = 0.02;
//   return Math.max(length * factor, 1); // Ensure a minimum duration
// };

// ...

function AnimatedText({ children }) {
  const text = useRef(null);

  
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(text.current, { opacity: 1, left: "-100px" });

    gsap.from(text.current, {
      scrollTrigger: {
        trigger: text.current,
        scrub: true,
        start: "0px bottom",
        end: "bottom+=400px bottom",
        
      },
      opacity: 0,
      left: "-200px",
      ease: "power3.Out",
    });
  }, []);

  return <p ref={text}>{children}</p>;
}
