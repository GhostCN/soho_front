"use client";
import Faqs from "@/components/home/Faqs";
import Banner from "@/components/homeFour/Banner";
import {useCurrentUser} from "@/app/lib";

export default function HomeFour() {
    const currentUser=useCurrentUser();
  return (
    <>
      {/* Banner section */}
      <Banner user={currentUser}/>

      {/* Features section */}
{/*      <Features />*/}

      {/* App Download section */}
     {/* <AppDownload />*/}

      {/* How Its Work section */}
  {/*    <HowItsWork />*/}

      {/* Market Solutions section */}
 {/*     <MarketSolutions />*/}

      {/* Testimonials section */}
     {/* <Testimonials />*/}

      {/* Call To Action section */}
 {/*     <CallToAction />
*/}
      {/* Faqs section */}
      <Faqs />
    </>
  );
}
