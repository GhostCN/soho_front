import Image from "next/image";
import Link from "next/link";
import apple_btn from "/public/img/apple_btn.png";
import gPlay_btn from "/public/img/gPlay_btn.png";

const FooterTwo = () => {
  return (
    <footer className="footer-section inner">
      <div className="overlay">
        <div className="container">
          <div className="row wrapper pt-120 pb-120">
            <div className="col-lg-3 col-md-6">
              <div className="single-area">
                <h5 style={{color:"#007f61"}}>COMPANY</h5>
                <ul className="items">
                  <li>
                    <Link href="/about-us">About Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="single-area">
                <h5 style={{color:"#007f61"}}>Solutions</h5>
                <ul className="items">
                  <li>
                    <Link href="/index-4">Transfer Money Abroad</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="single-area">
                <h5 style={{color:"#007f61"}}>Features</h5>
                <ul className="items">
                  <li>
                    <Link href="/login-2">Account</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="single-area">
                <h5 style={{color:"#007f61"}}>Support</h5>
                <ul className="items">
                  <li>
                    <Link href="/help-center">Help centre</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTwo;
