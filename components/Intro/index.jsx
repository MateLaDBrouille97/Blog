import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import styles from '../../styles/style.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Intro({ post }) {
  const background = useRef(null);
  const introImage = useRef(null);
  const homeHeader = useRef(null);
  const title = useRef(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const fadeInTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: 'top',
        end: '+=700px',
        onToggle: (self) => {
          setLoading(!self.isActive);
        },
      },
    }).fromTo(
      background.current,
      { clipPath: 'inset(15%)', opacity: 1 },
      { clipPath: 'inset(0%)', opacity: 0.7, duration: 1, ease: 'power3.out' },
      0
    );

    const scaleTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: 'top',
        end: '+=500px',
      },
    })
      .to(introImage.current, { width: '300px', height: '350px', duration: 1, ease: 'power3.out' }, 0)
      .to(introImage.current, { width: '400px', height: '450px', duration: 1, ease: 'power3.out' }, '+=100px')
      .to(introImage.current, { width: '450px', height: '500px', duration: 1, ease: 'power3.out' }, '+=100px')
      .to(introImage.current, { width: '500px', height: '550px', duration: 1, ease: 'power3.out' }, '+=100px');

    const titleTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: introImage.current,
        start: 'top center', // Adjust the start position based on your design
        end: '+=300px', // Adjust the end position based on your design
        scrub: true,
      },
    })
      .fromTo(
        title.current,
        { y: '-50%', opacity: 0 },
        { y: '0%', opacity: 0.8, duration: 1,scale: 0.75, ease: 'power3.out' },
        { y: '50%', opacity: 0.9, duration: 1,scale: 0.5, ease: 'power3.out' },
        0
      )
      .to(title.current, { y: '100%', opacity: 1, duration: 1,scale: 0.45, ease: 'power3.out' }, '+=1'); // Adjust the delay based on your design

    return () => {
      fadeInTimeline.kill();
      scaleTimeline.kill();
      titleTimeline.kill();
    };
  }, []);

  return (
    <div ref={homeHeader} className={styles.homeHeader}>
      <div className={styles.backgroundImage} ref={background}>
        {post.imageUrl && <Image src={post?.imageUrl} fill={true} alt="background image" priority={true} />}
      </div>
      {loading && <LoadingOverlay />} {/* Add loading overlay */}
      <div className={styles.intro}>
        <div ref={introImage} data-scroll data-scroll-speed="0.3" className={styles.introImage}>
          {post.imageUrl && <Image src={post?.imageUrl} alt="intro image" fill={true} priority={true} />}
        </div>
        <h1 ref={title} data-scroll data-scroll-speed="0.6">
          {post?.title}
        </h1>
      </div>
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div className={styles.loadingOverlay}>
      <p>Loading...</p>
    </div>
  );
}
