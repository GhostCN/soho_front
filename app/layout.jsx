import "node_modules/react-modal-video/scss/modal-video.scss";
import "/public/vendor/font-awesome/css/all.min.css";
// slick css
import "slick-carousel/slick/slick.css";
// main css
import Preloader from "@/components/preloader/Preloader";
import { Manrope, Roboto } from "next/font/google";
import "../styles/globals.scss";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--roboto",
  weight: ["400", "500", "700"],
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--manrope",
});
export default function RootLayout({ children }) {
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
      <body className={`${roboto.variable} ${manrope.variable}`}>
        {/* Preloader */}
        <Preloader />
        {children}
      </body>
    </html>
  );
}
