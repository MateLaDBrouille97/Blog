'use client';
import { useEffect } from 'react';
import styles from './page.module.scss'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
]

export default function Parallax1({blogArt}) {
  
  useEffect( () => {
    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.spacer}></div>
      <div className={styles.gallery}>
        <div className={styles.galleryWrapper}>
          <Column images={[images[0], images[1], images[2]]}/>
          <Column images={[images[3], images[4], images[5]]}/>
          <Column images={[images[6], images[7], images[8]]}/>
          <Column images={[images[9], images[10], images[11]]}/>
        </div>
      </div>
      <div className={styles.spacer}></div>
    </main>
  )
}

const Column = ({images}) => {
  return (
    <div 
      className={styles.column}
      >
      {
        images.map( (src, i) => {
          return <div key={i} className={styles.imageContainer}>
            <Image 
              src={`/images/${src}`}
              alt='image'
              fill
            />
          </div>
        })
      }
    </div>
  )
}