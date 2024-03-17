"use client"
import Image from "next/image";
import Link from "next/link";
import PersonalTab from "./PersonalTab";
import logo from "/public/soho.png";
import icon from "/public/img/index8-illu.png";

const RegisterTwoBody = () => {
  return (
    <section className="log-reg register reg-2">
      <div className="overlay">
        <div className="container">
          <div className="top-head-area">
            <div className="row d-flex align-items-center">
              <div className="col-sm-5 col">
                <Link
                  className="back-home d-flex gap-2 align-items-center text-black"
                  href="/">
                  <i className="fa fa-angle-double-left mb-1"></i> Retours
                </Link>
              </div>
              <div className="col-sm-5 col">
                <Link href="/">
                  <Image src={logo} alt="image" width={200} />
                </Link>
              </div>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-lg-5 pt-120">
              {/* Left Area */}
           {/*   <LeftArea />*/}
              <Image src={icon} alt="image not found" />
            </div>
            <div className="col-lg-6 z-1 text-center d-flex justify-content-center pb-120">
              <div className="form-box" style={{width:"100vw"}}>
                <h4>Souscription Soho</h4>
                <p className="alr-acc dont-acc">
                  j&apos;ai déja un compte  ?{" "}
                  <Link href={"/login"}>Se connecter.</Link>
                </p>
                <div className="tab-content" id="myTabContent">
                  {/* Personal Tab */}
                  <PersonalTab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterTwoBody;
