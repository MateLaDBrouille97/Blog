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

export default function SocialIconLink(instagram,github,facebook,twitter,linkedIn,telegram) {
  return (
    <div className="social-icons">
      {facebook&&<Link href={facebook} legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaFacebook />
        </a>
      </Link>}
      {twitter&&<Link href={twitter} legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaTwitter />
        </a>
      </Link>}
      {instagram&&<Link href={instagram} legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaInstagram />
        </a>
      </Link>}
      {github&&<Link href={github} legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaGithub />
        </a>
      </Link>}
      {linkedIn&&<Link href={linkedIn} legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaLinkedin />
        </a>
      </Link>}
      {telegram&&<Link href={telegram} legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="social-icons-link">
          <FaTelegram />
        </a>
      </Link>}
    </div>
  );
}
