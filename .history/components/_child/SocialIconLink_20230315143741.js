import React from 'react';
import { IconName } from "react-icons/im";
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';


export default function SocialIconLink() {
  return (
    <div className="social-icons">
    <Link href="https://www.facebook.com/"><a target="_blank" rel="noopener noreferrer"><FaFacebook /></a></Link>
    <Link href="https://twitter.com/"><a target="_blank" rel="noopener noreferrer"><FaTwitter /></a></Link>
    <Link href="https://www.instagram.com/"><a target="_blank" rel="noopener noreferrer"><FaInstagram /></a></Link>
    <Link href="https://github.com/"><a target="_blank" rel="noopener noreferrer"><FaGithub /></a></Link>
    <Link href="https://www.linkedin.com/"><a target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></Link>
    <Link href="https://telegram.org/"><a target="_blank" rel="noopener noreferrer"><FaTelegram /></a></Link>
  </div>
  )
}
