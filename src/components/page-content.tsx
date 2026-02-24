"use client";
import { usePathname } from "next/navigation";
import { siteConfig } from "../config/site.config";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";

const PageContent = () => {
  const pathname = usePathname();
  const pageContent =
    siteConfig.pagesContent[pathname as keyof typeof siteConfig.pagesContent];
  console.dir("Page content", siteConfig.pagesContent);

  if (!pageContent) {
    return <div>Page not found</div>;
  }

  const sanitizedHTML = DOMPurify.sanitize(pageContent.content);

  return <div>{parse(sanitizedHTML)} </div>;
};
export default PageContent;
