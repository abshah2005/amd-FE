import React, { useEffect, useRef, useState } from "react";
import Grid from "./Grid";
import LandingHeader from "./LandingHeader";
import FAQs from "./FAQs";
import MapComponent from "./MapComponent";
import InfoSection from "./InfoSection";
import FooterMain from "./FooterMain";
import { useLocation, useSearchParams } from "react-router-dom";
import TermsPage from "../pages/TermsPage";
import PrivacyPage from "../PrivacyPage";
import CookiePage from "../pages/CookiePage";
import Test from "../pages/Test";
import HeaderLower from "./HeaderLower";
import HowItWorksComponent from "./HowItWorksComponent";

const LandingPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const faqsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const professionalsRef = useRef(null);
  const askerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);

  // Enhanced smooth scrolling function
  const scrollToSection = (elementRef) => {
    if (!elementRef) return;

    // Get the element's position
    const yOffset = -80; // Adjust this value to account for fixed headers if needed
    const element = elementRef.current;

    if (!element) return;

    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  
  useEffect(() => {
    const handleRouteChange = () => {
      const section = searchParams.get("section");
      if (section) {
        setActiveSection(section);
        window.scrollTo(0, 0);
      } else {
        setActiveSection(null);
      }
    };

    handleRouteChange();
  }, [searchParams]);

  // Determine if we should show the landing header
  const shouldShowLandingHeader = () => {
    return !activeSection; // Only show when no special section is active
  };

  // Render the appropriate content based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case "terms":
        return (
          <div className="bg-white">
            <TermsPage />
          </div>
        );
      case "privacy":
        return (
          <div className="bg-white">
            <PrivacyPage />
          </div>
        );
      case "prof-list":
        return (
          <div className="bg-white">
            <Test />
          </div>
        );
      case "cookie":
        return (
          <div className="bg-white">
            <CookiePage />
          </div>
        );
      default:
        return (
          <>
            <Grid />
            <div className="w-full bg-[#F1F4F9]" id="how-it-works" ref={howItWorksRef}>
              <HowItWorksComponent />
            </div>
            <div id="professionals" ref={professionalsRef}>
              <InfoSection />
            </div>
            <MapComponent />
            <div id="faqs" ref={faqsRef}>
              <FAQs />
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-[#F1F4F9]">
      {/* Conditionally render LandingHeader */}
      {shouldShowLandingHeader() && (
        <div className="w-[60%] mx-auto bg-[#F1F4F9]">
          <LandingHeader />
          <HeaderLower />
        </div>
      )}
      <div className="bg-white">{renderContent()}</div>
      {/* <FooterMain /> */}
    </div>
  );
};

export default LandingPage;


