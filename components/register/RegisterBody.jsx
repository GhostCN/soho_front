import Image from "next/image";
import Link from "next/link";
import PersonalTab from "./PersonalTab";
import logo from "/public/soho.png";


const RegisterBody = () => {
  return (
    <section className="log-reg register">
      <div className="overlay">
        <div className="container">
          <div className="top-head-area">
            <div className="row d-flex align-items-center">{/*
              <div className="col-sm-5 col">
                <Link
                  className="back-home d-flex gap-2 align-items-center text-black"
                  href="/">
                  <i className="fa fa-angle-double-left mb-1"></i>
                  Retours
                </Link>
              </div>*/}
              <div className="col-sm-5 col">
                <Link href="/">
                  <Image src={logo} alt="image" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">

            <div className="col-lg-12 col-md-12 z-1 text-center d-flex justify-content-center pb-120">
              <div className="form-box">
                <h4>Valider votre compte</h4>
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

export default RegisterBody;
