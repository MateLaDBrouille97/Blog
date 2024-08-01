// import styles from './styles.module.scss';
import Picture1 from "../../public/coWorkers.jpg";
import Picture2 from "../../public/Industry2.jpg";
import Picture3 from "../../public/nuclearplant.jpg";
import Picture4 from "../../public/politics.jpg";
import Picture5 from "../../public/army.jpg";
import Picture6 from "../../public/agriculture2.jpg";
import Picture7 from "../../public/microship.jpg";
import Picture8 from "../../public/mining.jpg";
import Picture9 from "../../public/engeneer.jpg";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scale10 = useTransform(scrollYProgress, [0, 1], [1, 10]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    // {
    //     src: Picture7,
    //     scale: scale9
    // }
    // ,
    {
      src: Picture8,
      scale: scale9,
    },
    {
      src: Picture9,
      scale: scale10,
    },
  ];

  return (
    <>
      <section
        className="section section4 mx-auto md:px-20 py-16 w-9/10"
        id="section1"
      >
        <div className="container-section4">
          <div ref={container} className="container15">
            <div className="sticky15">
              {pictures.map(({ src, scale }, index) => {
                return (
                  <motion.div key={index} style={{ scale }} className="el15">
                    <div className="imageContainer15">
                      <Image src={src} fill alt="image" placeholder="blur" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
