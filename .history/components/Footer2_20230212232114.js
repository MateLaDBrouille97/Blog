import React from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { Icon } from '@iconify/react';

const Footer = () => {

const {dbUser}=useUserContext();

  return (
    <footer className="footer">
        <div className="footer__container container">
            <h1 className="footer__title">{dbUser?.lastName}</h1>
            <ul className="footer__list">
                <li>
                    <a href="#about" className="footer__link">About</a>
                </li>
                <li>
                    <a href="#portfolio" className="footer__link">Projects</a>
                </li>
                <li>
                    <a href="#ownership" className="footer__link">Ownerships</a>
                </li>
            </ul>
            <div className="footer__social">

              <a href="https://www.instagram.com/oto.mata33/" className="footer__social-link" target="_blank" rel="noreferrer">
               <Icon icon="bxl:instagram"></Icon>
              </a>

              <a href="https://www.linkedin.com/" className="footer__social-link color-link1" target="_blank" rel="noreferrer">
                <Icon icon="bxl:linkedin-square"></Icon>
              </a>

              <a href="https://github.com/LuckyMate97" className="footer__social-link color-link2" target="_blank" rel="noreferrer">
                 <Icon icon="bxl:github"></Icon>
              </a>
     
            </div>
            <span className="footer__copy">&#169;2022 Manuel LABRIDY All rights reserved</span>
        </div>
    </footer>
  )
}

export default Footer