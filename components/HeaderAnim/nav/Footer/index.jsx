// import styles from './style.module.scss';
import Link from "next/link"

export default function Footer() {
  return (
    <div className="footer5">
       <Link href="https://www.instagram.com/oto.mata33/" legacyBehavior>
      <a>Instagram</a>
      </Link>
      <Link href="https://github.com/LuckyMate97" legacyBehavior>
        <a>Github</a>
      </Link>
      <Link href="https://www.linkedin.com/in/manuel-thomas-labridy-70220a3a" legacyBehavior>
      <a>LinkedIn</a>
      </Link>
    </div>
  )
}