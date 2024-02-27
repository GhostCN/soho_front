import Image from "next/image";
import Link from "next/link";
import Select from "../common/Select";
import info_icon from "/public/img/info_icon.png";
import logo from "/public/soho.png";

const currency = [
  { id: 1, name: "Orange Money" },
  { id: 2, name: "Wave" },
  { id: 3, name: "Free Money" },
];

const Banner = () => {
  return (
    <section className="banner-section inner-banner index-4">
      <div className="overlay">
        <div className="banner-content pb-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-10">
                <div className="main-content">
                  <h1>Un autre moyen d&apos;envoyer de l&apos;argent</h1>
           {/*       <p>Safe and affordable online money transfer service</p>*/}
                  <Link href="/register-2" className="cmn-btn">
                   Connexion/Inscription
                  </Link>
                </div>
              </div>
              <div className="col-lg-5 col-md-10">
                <div className="right-content">
                  <div className="logo-item">
                    <Image src={logo} alt="image" />
                  </div>
                 {/* <h5>
                    From <span>GBP</span> to <span>USD</span> in seconds
                  </h5>*/}
                  <form className="form text-center">
                    <div className="top-area">
                      <div className="single-input d-flex align-items-center">
                        <div className="input-control">
                          <input
                            type="number"
                            className="input-field"
                            placeholder="You Send"
                          />
                          <label className="input-label">De</label>
                        </div>
                        <div className="select-area">
                          {/* select */}
                          <Select data={currency} />
                        </div>
                      </div>
                      <div className="single-input d-flex align-items-center">
                        <div className="input-control">
                          <input
                            type="number"
                            className="input-field"
                            placeholder="Recipient Gets"
                          />
                          <label className="input-label">Vers</label>
                        </div>
                        <div className="select-area">
                          {/* select */}
                          <Select data={currency} />
                        </div>
                      </div>
                    </div>
                    {/*<div className="bottom-area">
                      <ul>
                        <li>
                          <span>
                            Exchange Rate{" "}
                            <span className="tooltip-area">
                              <Image src={info_icon} alt="Icon" />
                              <span className="item-show">
                                The Convert rate represents the rate of exchange
                                you will receive when sending your money with
                                Xe.
                              </span>
                            </span>
                          </span>{" "}
                          <span>1.37310</span>
                        </li>
                      </ul>
                    </div>*/}
                    <Link href="/register-2" className="cmn-btn">
                      Commencez
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="illu-area wow fadeInLeft"></div>
    </section>
  );
};

export default Banner;
