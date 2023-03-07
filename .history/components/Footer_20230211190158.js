import Link from 'next/link'
import React from 'react'
import { ImFacebook, ImTwitter, ImYoutube } from 'react-icons/im'

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto flex justify-center py-12">
        <div className="py-5">
          <div className="flex gap-6 justify-center">
          <Link href="/" legacyBehavior>
              <a>
                <ImFacebook color="#888888" />
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a>
                <ImTwitter color="#888888" />
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a>
                <ImYoutube color="#888888" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
