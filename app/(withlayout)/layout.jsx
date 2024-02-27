"use client";
import { useEffect } from "react";
// main css
import FooterTwo from "@/components/footer/FooterTwo";
import NavBar from "@/components/navBar/NavBar";
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Paylio - Online Payment Platform React Nextjs Template"
        />
        <link rel="icon" href="favicon.ico" />
        <title>Paylio - Online Payment Platform React Nextjs Template</title>
      </head>
      <body>
        <>
          {/* NavBar */}
          <NavBar />

          {children}

          {/* Footer Two */}
          <FooterTwo />

          {/* Scroll To Top */}
          <ScrollToTop />
        </>
      </body>
    </html>
  );
}
