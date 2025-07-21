import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F0F1F3] py-4 text-center text-xs text-gray-500">
      <p>
        © 2025 AskMeDirect, All rights reserved. •{" "}
        <a href="#" className="hover:underline text-sm">
          Terms of use
        </a>{" "}
        •{" "}
        <a href="#" className="hover:underline text-sm">
          Privacy Policy
        </a>
      </p>
    </footer>
  );
};

export default Footer;