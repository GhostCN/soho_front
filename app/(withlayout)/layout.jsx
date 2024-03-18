"use client";
import { useEffect } from "react";
// main css
import NavBar from "@/components/navBar/NavBar";

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <head>
          <meta
              name="description"
              content="Soho - un autre moyen de transfert d'argent"
          />
        <link rel="icon" href={"soho.png"} />
        <title>Soho - un autre moyen de transfert d&apos;argent</title>
      </head>
      <body>
        <>
          {/* NavBar */}
          <NavBar />

          {children}

          {/* Footer Two */}
         {/* <FooterTwo />

           Scroll To Top
          <ScrollToTop />*/}
        </>
      </body>
    </html>
  );
}
