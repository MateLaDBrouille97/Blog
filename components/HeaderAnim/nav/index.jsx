import React, { useState } from 'react'
// import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../animation';
import Link2 from './Link';
import Curve from './Curve';
import Footer from './Footer';

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Techie's Society",
    href: "/Categories/NEWS",
  },
  {
    title: "Useful Hacks",
    href: "/Categories/USEFULHACKS",
  },
  {
    title: "Tools To",
      href: `/Categories/TOOLS`
  },
 
]

export default function Nav() {

  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className="menu4"
      >
       <div className="body4">
            <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className="nav4">
                    <div className="header4">
                        <p>Navigation</p>
                    </div>
                    <div className="top4">
                       {
                      navItems.map( (data, index) => {
                        return <Link2 
                        key={index} 
                        data={{...data, index}} 
                        isActive={selectedIndicator == data.href} 
                        setSelectedIndicator={setSelectedIndicator}>
                        </Link2>
                      })
                    }
                    </div>
                   
            </div>
            <Footer />
        </div>
        <Curve />
    </motion.div>
  )
}