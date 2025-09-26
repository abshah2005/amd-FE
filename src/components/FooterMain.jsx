import React from "react";
import { Link } from "react-router-dom"; // Add this import
import iconSvg from "../assets/icon.svg";
import { footerData } from "../utils/Constant";

const FooterMain = () => {
  

  // Helper function to determine if a link should use React Router
  const isInternalLink = (href) => {
    return href.startsWith("/") && !href.startsWith("http");
  };

  return (
    <footer className="bg-[#F1F4F9] border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex md:flex-row flex-col px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-[60%]  ">
            <img src={iconSvg} className="h-10 w-20" alt="" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[40%] ">
          {/* Links Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              LINKS
            </h3>
            <ul className="space-y-2">
              {footerData.links.map((link) => (
                <li key={link.name}>
                  {isInternalLink(link.href) ? (
                    // <Link
                    //   to={link.href}
                    //   className="text-base text-gray-600 hover:text-gray-900 relative group"
                    // >
                    //   {link.name}
                    //   <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all group-hover:w-full"></span>
                    // </Link>
                    <a
                      href={link.href}
                      className="text-base text-gray-600 hover:text-gray-900 relative group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all group-hover:w-full"></span>
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="text-base text-gray-600 hover:text-gray-900 relative group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full"></span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              LEGAL
            </h3>
            <ul className="space-y-2">
              {footerData.legal.map((link) => (
                <li key={link.name}>
                  {isInternalLink(link.href) ? (
                    <Link
                      to={link.href}
                      className="text-base text-gray-600 hover:text-gray-900 relative group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all group-hover:w-full"></span>
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-base text-gray-600 hover:text-gray-900 relative group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all group-hover:w-full"></span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              SOCIALS
            </h3>
            <div className="flex flex-col ">
              {footerData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-600 hover:text-gray-900 flex items-center group"
                >
                  <span className=" text-base relative">
                    {social.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all group-hover:w-full"></span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12  pt-4 flex flex-col  justify-between items-center">
        <div className=" md:text-8xl sm:text-4xl text-5xl font-bold text-[#4D5B70] mb-4 md:mb-0">
          AskMeDirect
        </div>
        <p className="text-base text-gray-600 pt-10 pb-2">
          ©2025 AskMeDirect, All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterMain;