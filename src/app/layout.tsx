import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers/provider";
import { siteConfig } from "../config/site.config";
import { layoutConfig } from "../config/layout.config";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth/auth";
import AppLoader from "../hoc/app-loader";
import Title from "../components/UI/title";
import Header from "../components/UI/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <div className="page flex min-h-screen flex-col justify-between items-center">
                <Header />
                <div
                  className={`flex flex-col flex-1 mt-[${layoutConfig.headerHeight}]`}
                >
                  <main
                    className={`px-4 flex flex-col h-[calc(100vh-${layoutConfig.footerHeight}-${layoutConfig.headerHeight})] max-w-[1024px] items-center justify-self-center`}
                  >
                    <Title />
                    {children}
                  </main>
                </div>

                <footer className="flex justify-center items-center h-[80px] bg-[#303030] w-full mt-4">
                  <p className={`text - {var(--foreground)}`}>
                    {siteConfig.description}
                  </p>
                </footer>
              </div>
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
