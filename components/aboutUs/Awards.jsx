import Image from "next/image";
import award_icon from "/public/img/award-icon.png";

const Awards = () => {
  return (
    <section className="awards-section">
      <div className="overlay pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 text-center">
              <div className="section-header sticky-top">
                <h3>Awards</h3>
                <p>
                  Paylio is an award winning Fintech company that has been
                  featured on multiple media outlets
                </p>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6 cus-mar">
              <div className="single-item d-flex align-items-center">
                <div className="img-area">
                  <Image src={award_icon} alt="icon" />
                </div>
                <div className="text-area">
                  <h3>2015</h3>
                  <h5>Excellence of Innovation for Retailing award</h5>
                  <p>Lorem ipsum dolor sit amet</p>
                </div>
              </div>
              <div className="single-item d-flex align-items-center">
                <div className="img-area">
                  <Image src={award_icon} alt="icon" />
                </div>
                <div className="text-area">
                  <h3>2018</h3>
                  <h5>Outstanding Cross-Border FX Platform award</h5>
                  <p>Lorem ipsum dolor sit amet</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 cus-mar">
              <div className="single-item d-flex align-items-center">
                <div className="img-area">
                  <Image src={award_icon} alt="icon" />
                </div>
                <div className="text-area">
                  <h3>2019</h3>
                  <h5>Outstanding Cross-Border FX Platform award</h5>
                  <p>Lorem ipsum dolor sit amet</p>
                </div>
              </div>
              <div className="single-item d-flex align-items-center">
                <div className="img-area">
                  <Image src={award_icon} alt="icon" />
                </div>
                <div className="text-area">
                  <h3>2022</h3>
                  <h5>Excellence of Innovation for Retailing award</h5>
                  <p>Lorem ipsum dolor sit amet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
