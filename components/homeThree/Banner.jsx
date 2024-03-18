import Image from "next/image";
import Link from "next/link";
import index3_illu from "/public/img/index3-illu.png";

const Banner = () => {
  return (
    <section className="banner-section index-3">
      <div className="overlay">
        <div className="banner-content pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-10">
                <div className="main-content">
                  <h1>Freelancers, get paid faster with Paylio</h1>
                  <p>
                    Accept payment from clients to through 100+ payment modes
                    anytime, anywhere with a single click.
                  </p>
                  <Link href="/register-2" className="cmn-btn">
                    Request a Payment Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="banner-bottom">
              <p className="xxlr">
                Acceptable to millions of customers worldwide and in top
                marketplaces.
              </p>
              <div className="row single-head justify-content-center align-items-center">
                <div className="col-xl-3 col-lg-6">
                  <Link href="#" className="single">
                    <Image
                      width={140}
                      height={38}
                      src="/img/marketplaces-1.png"
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <Link href="#" className="single">
                    <Image
                      width={140}
                      height={38}
                      src="/img/marketplaces-2.png"
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <Link href="#" className="single">
                    <Image
                      width={140}
                      height={38}
                      src="/img/marketplaces-3.png"
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <Link href="#" className="single">
                    <Image
                      width={140}
                      height={38}
                      src="/img/marketplaces-4.png"
                      alt="image"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-illu">
        <Image className="right-1 wow fadeInUp" src={index3_illu} alt="image" />
      </div>
    </section>
  );
};

export default Banner;
