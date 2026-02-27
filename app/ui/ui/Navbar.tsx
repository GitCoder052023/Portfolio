"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";
import {
  IoMail,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { SITE_CONFIG } from "@/app/config/site";
import { NAV_ITEMS } from "@/app/constants/navigation";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navRef = useRef(null);
  const menuRef = useRef(null);

  const { scrollY } = useScroll();

  const socialLinks = [
    { icon: <FaGithub size={18} />, url: SITE_CONFIG.links.github, name: "GitHub" },
    { icon: <FaXTwitter size={18} />, url: SITE_CONFIG.links.twitter, name: "X" },
    { icon: <IoMail size={18} />, url: SITE_CONFIG.links.mail, name: "Email" },
  ];


  const colors = {
    glass: "rgba(255, 255, 255, 0.9)",
    border: "rgba(0, 0, 0, 0.08)",
    textMain: "#525252",
    textHover: "#000000",
    bgHover: "rgba(0, 0, 0, 0.05)",
    activeBg: "rgba(0, 0, 0, 0.08)",
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href.replace("#", ""));
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!mobileMenuOpen) return;

      const clickedInsideNav = navRef.current?.contains(event.target);
      const clickedInsideMenu = menuRef.current?.contains(event.target);

      if (!clickedInsideNav && !clickedInsideMenu) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  if (!isMounted) return null;

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <motion.nav
        ref={navRef}
        variants={{
          visible: { y: 0 },
          hidden: { y: -150 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <motion.div
          layout
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="pointer-events-auto backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-between md:justify-start p-2 px-5 md:px-6 gap-4 md:gap-6 w-[95%] max-w-md md:w-auto md:max-w-none"
          style={{
            backgroundColor: colors.glass,
            border: `1px solid ${colors.border}`,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {/* Logo */}
          <div
            onClick={() => scrollToSection("hero")}
            className="cursor-pointer"
          >
            <span
              className="font-sans font-bold text-xl tracking-tight whitespace-nowrap text-black"
            >
              {SITE_CONFIG.name}
            </span>
          </div>


          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 cursor-pointer py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  color: colors.textMain,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.textHover;
                  e.currentTarget.style.backgroundColor = colors.bgHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textMain;
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block w-px h-5 bg-gray-500/20"></div>

            {/* Socials Desktop */}
            <div className="hidden lg:flex overflow-hidden">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: isHovered ? "auto" : 0,
                  opacity: isHovered ? 1 : 0,
                }}
                className="flex items-center gap-1"
              >
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full transition-colors"
                    style={{ color: colors.textMain }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = colors.textHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = colors.textMain)
                    }
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              style={{ color: colors.textMain }}
            >
              {mobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-4 right-4 z-40 mx-auto max-w-sm"
          >
            <div
              className="backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-2"
              style={{
                backgroundColor: colors.glass,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors"
                    style={{
                      color: colors.textMain,
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.textHover;
                      e.currentTarget.style.backgroundColor = colors.bgHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.textMain;
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {item.name}
                  </button>
                ))}

                <div className="flex justify-center gap-3 px-4 py-3 mt-1 border-t border-gray-500/10">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      className="p-2 rounded-full transition-colors"
                      style={{ color: colors.textMain }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = colors.textHover)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = colors.textMain)
                      }
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}