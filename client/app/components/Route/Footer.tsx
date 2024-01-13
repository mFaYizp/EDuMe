import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="border border-black dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Our Story{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Courses{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Youtube{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
              Contact Info
            </h3>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              <b>Call Us:</b> 1-885-4443-2024
            </p>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              <b>Address:</b>{" "}
              <i className="text-[300]">
                Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
                Bangalore-560016
              </i>
            </p>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              <b>Mail Us:</b> edume@gmail.com
            </p>
          </div>
        </div>
        <br />
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          Copyright © 2024 EDuMe | All Rights Reserved
        </p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
