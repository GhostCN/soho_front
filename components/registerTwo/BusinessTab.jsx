"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Select from "../common/Select";
import fb from "/public/img/fb.png";
import google from "/public/img/google.png";
import show_hide from "/public/img/show-hide.png";

const country8 = [
  { id: 1, name: "Select Your Country" },
  { id: 2, name: "United State" },
  { id: 3, name: "United kingdom" },
  { id: 4, name: "Canada" },
];

const countryCode8 = [
  { id: 1, name: "+44" },
  { id: 2, name: "+82" },
  { id: 3, name: "+34" },
];

const BusinessTab = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="tab-pane fade"
      id="business"
      role="tabpanel"
      aria-labelledby="business-tab"
    >
      <form action="#">
        <div className="row">
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              {/* Select */}
              <Select data={country8} />
            </div>
          </div>
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <input type="email" placeholder="Business email" />
            </div>
          </div>
          <div className="col-12">
            <div className="single-input country-code d-flex align-items-center">
              {/* Select */}
              <Select data={countryCode8} />
              <input type="number" placeholder="0000 000000" />
            </div>
          </div>
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <input
                type={!showPassword ? "password" : "text"}
                className="passInput"
                placeholder="Password"
              />
              <Image
                className="showPass"
                src={show_hide}
                alt="image"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
        </div>
        <div className="btn-area">
          <button className="cmn-btn">Register Now</button>
        </div>
      </form>
      <div className="bottom-area">
        <div className="continue">
          <p>Or continue with</p>
        </div>
        <div className="login-with d-flex align-items-center">
          <Link href="#">
            <Image src={google} alt="image" />
          </Link>
          <Link href="#">
            <Image src={fb} alt="image" />
          </Link>
        </div>
      </div>
      <div className="privacy">
        <p>
          By registering you accept our{" "}
          <Link href="/terms-conditions">Terms & Conditions</Link> and{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default BusinessTab;
