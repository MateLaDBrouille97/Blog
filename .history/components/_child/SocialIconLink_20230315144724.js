import React from "react";
import { IconName } from "react-icons/im";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaTelegram,
} from "react-icons/fa";

export default function SocialIconLink() {
  return (
    <div className="social-icons">
      <Link href="https://www.facebook.com/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaFacebook />
        </a>
      </Link>
      <Link href="https://twitter.com/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaTwitter />
        </a>
      </Link>
      <Link href="https://www.instagram.com/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaInstagram />
        </a>
      </Link>
      <Link href="https://github.com/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaGithub />
        </a>
      </Link>
      <Link href="https://www.linkedin.com/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaLinkedin />
        </a>
      </Link>
      <Link href="https://telegram.org/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaTelegram />
        </a>
      </Link>
    </div>
  );
}
