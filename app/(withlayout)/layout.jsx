"use client";
import { useEffect } from "react";
// main css
import NavBar from "@/components/navBar/NavBar";
import Head from "next/head";

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <Head>
          <meta
              name="description"
              content="Soho - un autre moyen de transfert d'argent"
          />
        <link rel="icon" href={"soho.png"} />
        <title>Soho - un autre moyen de transfert d&apos;argent</title>
      </Head>
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
