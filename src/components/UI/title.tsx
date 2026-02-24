// this is component to use for all pages titles
"use client";
import { siteConfig } from "@/src/config/site.config";
import { Sriracha } from "next/font/google";
import { usePathname } from "next/navigation";
const Title = () => {
  const pathname = usePathname();
  const currentNavItem = siteConfig.navItems.find(
    (item) => item.href === pathname,
  );
  const pageTitle = currentNavItem ? currentNavItem.label : siteConfig.title;
  return (
    <div className="w-full flex justify-center my-8">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
    </div>
  );
};
export default Title;
