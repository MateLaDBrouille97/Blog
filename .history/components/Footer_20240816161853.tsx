"use client";

import { POSTS } from "../lib/constants";
import { Icons } from "./icon";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createSubscriber } from "../lib/actions";
import { useFormState } from "react-dom";

export default function Footer() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createSubscriber, initialState);
  return (
    <footer className="footer dark">
    <div className="footer__container container">
      <div className="grid-container">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="text-md font-semibold">OTOMATA</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Stay Up to Date with the latest news and insights from our blog.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/otomata_blog/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Icons.instagram className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
            </a>
            <a
              href="https://github.com/LuckyMate97"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
            >
              <Icons.gitHub className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/manuel-thomas-labridy-70220a3a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Icons.linkedId className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-md font-semibold">Blog & Websites</h3>
          <ul className="space-y-2 text-sm">
            {POSTS.map((post) => (
              <li key={post.title}>
                <Link
                  href={post.href}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-md font-semibold">Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://portfolio-manulab.vercel.app/"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                href="/terms-of-services"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Terms of Services
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/sitemap.xml"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-md font-semibold">Newsletter</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Subscribe to our newsletter to stay up-to-date with the latest news and updates.
          </p>
          <form action={dispatch}>
            <div className="flex space-x-2">
            <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  defaultValue=""
                  aria-describedby="email-error"
                />
              <Button type="submit">Subscribe</Button>
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true" className="px-1">
            {state?.errors?.email &&
                  state.errors.email.map((error: string) => (
                    <p key={error} className="text-xs text-red-500">
                      {error}
                    </p>
                  ))}
                {!state?.errors?.email && (
                  <p className="text-xs text-green-500">{state?.message}</p>
                )}
            </div>
          </form>
        </div>
      </div>
      <div className="div-custom">
        &copy; 2024 OTOMATA. All rights reserved.
      </div>
    </div>
  </footer>
  
  );
}
