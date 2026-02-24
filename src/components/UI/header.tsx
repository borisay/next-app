"use client";
import Image from "next/image";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "../../config/site.config";
import { layoutConfig } from "@/src/config/layout.config";
import { useState } from "react";
import RegistrationModal from "./modal/registration.modal";
import LoginModal from "./modal/login.modal";
import { signOutFunc } from "@/src/actions/sign-out";
import { useAuthStore } from "@/src/store/auth.store";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo-kitchen.png"
        alt={siteConfig.title}
        width={36}
        height={36}
        priority
      />
    </Link>
  );
};

export default function Header() {
  const { isAuth, session, status, setAuthState } = useAuthStore();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.log("Error", error);
    }
    setAuthState("unauthenticated", null);
  };

  const getNavItems = () => {
    {
      // return siteConfig.navItems.map((item) => { // add filter for menu for not authoris. user
      return siteConfig.navItems
        .filter((item) => {
          if (item.href === "/ingredients") {
            return isAuth;
          }
          return true;
        })
        .map((item) => {
          const isActive = pathName === item.href;
          return (
            <div key={item.href} className="flex flex-col">
              <Link
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                color="foreground"
                href={item.href}
                className={`py-1 ${
                  isActive ? "text-blue-500" : "text-foreground"
                }
              hover:text-blue-300
              // hover:border-blue-300 hover:rounded-md 
              transition-colors 
              // transition-border 
              duration-200`}
              >
                {item.label}
              </Link>
            </div>
          );
        });
    }
  };

  const pathName = usePathname();

  return (
    <div
      className={`header fixed top-0 left-0  w-full z-50 bg-default-800 h-[${layoutConfig.headerHeight}]`}
    >
      <div
        className={`navbar flex items-center justify-between h-[${layoutConfig.headerHeight}]`}
      >
        <div className="navbarMobile flex items-center justify-between w-full px-4">
          <div className="md:hidden navbarBrand flex gap-4">
            <Logo />
            <p className="font-bold text-inherit">{siteConfig.title}</p>
          </div>
          <div className="navbarBurger md:hidden">
            <button
              className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={toggleMobileMenu}
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div
          className={`h-[${layoutConfig.headerHeight}] navbarContent max-w-[1024px] md:justify-between md:flex md:w-full fixed top-0 right-0 md:left-0 mx-auto px-4 min-h-screen md:min-h-0 bg-gray-800 md:bg-transparent md:items-center w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "translate-x-full md:translate-x-0"
          } z-50`}
        >
          <div className="hidden md:navbarBrand md:flex md:gap-4">
            <Logo />
            <p className="font-bold text-inherit">{siteConfig.title}</p>
          </div>
          <div className="navbarItems flex flex-col px-3 mt-[60px] md:mt-0 md:flex-row mb-10 md:mb-0 text-center gap-y-4 md:gap-x-6">
            {getNavItems()}
          </div>
          <div className="navbarLogin flex flex-col md:flex-row gap-y-4 md:gap-x-6">
            {status === "loading" ? (
              <p>"Loading..."</p>
            ) : !isAuth ? (
              <>
                <div className="text-center">
                  <Button
                    as={Link}
                    color="secondary"
                    href="#"
                    onPress={() => setIsLoginOpen(true)}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    as={Link}
                    color="primary"
                    href="#"
                    onPress={() => setIsRegistrationOpen(true)}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Button
                  as={Link}
                  color="secondary"
                  href="#"
                  // variant="flat"
                  onPress={handleSignOut}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
          <div className="navbarCloseMobile md:hidden flex flex-row items-center pb-16">
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <RegistrationModal
          isOpen={isRegistrationOpen}
          onClose={() => setIsRegistrationOpen(false)}
        />
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      </div>
    </div>
  );
}
