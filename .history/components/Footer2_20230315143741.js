import React from "react";
// import { useUserContext } from '../../contexts/UserContext';
import { Icon } from "@iconify/react";
import Newsletter from "./_child/Newsletter";
import Link from "next/link";
import SocialIconLink from "./_child/SocialIconLink";
const Footer2 = () => {
  // const {dbUser}=useUserContext();
  const bg = {
    background: "url('/images/Miroodles2.png')no-repeat",
    backgroundPosition: "bottom right",
  };

  return (
    <footer className="footer" style={bg}>
      {/* <Newsletter/> */}
      <div className="footer__container container">
        <h1 className="footer__title">OTOMATA</h1>
        <div className="footer__social">
          <a
            href="https://www.instagram.com/oto.mata33/"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="bxl:instagram"></Icon>
          </a>

          <a
            href="https://www.linkedin.com/"
            className="footer__social-link color-link1"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="bxl:linkedin-square"></Icon>
          </a>

          <a
            href="https://github.com/LuckyMate97"
            className="footer__social-link color-link2"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="bxl:github"></Icon>
          </a>
        </div>
        <ul className="footer__list">
          <li>
            <Link href={`/`} legacyBehavior>
              <a  className="footer__link">
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/Categories/USEFULHACKS`} legacyBehavior>
              <a  className="footer__link">
                Useful Hacks
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/Categories/PROJECTS`} legacyBehavior>
              <a  className="footer__link">
                Projects
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/Categories/NEWS`} legacyBehavior>
              <a  className="footer__link">
                Tech News
              </a>
            </Link>
          </li>
        </ul>
        <span className="footer__copy">
          Copyright &#169;2022 Manuel LABRIDY All rights reserved
        </span>
        {/* <span className="footer__copy">Terms & Conditions</span> */}
      </div>
    </footer>
  );
};

export default Footer2;
