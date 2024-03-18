import Image from "next/image";
import Link from "next/link";
import Social from "../social/Social";
import mail_icon from "/public//img/mail-icon.png";
import sub_icon from "/public//img/sub-icon.png";
import view_icon from "/public/img/view-icon.png";
const blogs = [
  {
    id: 1,
    img: "/img/latest-posts-1.png",
    title:
      "THE REFERRAL PROGRAM: $10 IN BTC FOR EVERY FRIEND THAT JOINS PAYLIO",
    views: "2532",
  },
  {
    id: 2,
    img: "/img/latest-posts-2.png",
    title:
      "INTRODUCING: COLLATERAL EXCHANGE OPTION FOR OUR INSTANT CRYPTO CREDIT LINES",
    views: "2532",
  },
  {
    id: 3,
    img: "/img/latest-posts-3.png",
    title: "PAYLIO’S LOYALTY PROGRAM NOW FEATURES FREE CRYPTO WITHDRAWALS",
    views: "2532",
  },
  {
    id: 4,
    img: "/img/latest-posts-4.png",
    title: "HOW TO GET PAID AS A FREELANCER (EASILY AND ON TIME)",
    views: "2532",
  },
];

const LatestPosts = () => {
  return (
    <section className="latest-articles posts latest blog-4">
      <div className="overlay pb-120 pt-120">
        <div className="container">
          <div className="row cus-mar">
            <div className="col-lg-8">
              <div className="section-header">
                <h2 className="title">Popular Posts</h2>
              </div>
              {blogs.map(({ id, img, title, views }) => (
                <div key={id} className="single-item d-flex align-items-center">
                  <div className="img-area text-center flex-shrink-0">
                    <Image
                      width={320}
                      height={220}
                      className="h-100"
                      src={img}
                      alt="image"
                    />
                  </div>
                  <div className="text-area">
                    <Link href="/blog-single">
                      <h5>{title}</h5>
                    </Link>
                    <p className="date-view d-flex align-items-center">
                      <span>May 7, 2023</span>
                      <span className="view d-flex align-items-center">
                        <Image src={view_icon} alt="icon" />
                        <span>{views}</span>
                      </span>
                    </p>
                    <Link href="/blog-single">
                      Read More{" "}
                      <i className="fa fa-angle-double-right mb-1"></i>{" "}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4">
              <div className="sidebar-area">
                <div className="single-side">
                  <div className="top-icon">
                    <Image src={sub_icon} alt="icon" />
                  </div>
                  <h5>
                    Subscribe to our newsletter and don&#39;t miss any article!
                  </h5>
                  <p>
                    Enter you email into the form below to join our newsletter.
                  </p>
                  <form action="#">
                    <div className="input-area d-flex">
                      <div className="icon d-grid align-items-center">
                        <Image src={mail_icon} alt="icon" />
                      </div>
                      <input type="email" placeholder="What’s your email?" />
                    </div>
                    <button className="cmn-btn">
                      <span>Subscribe Now</span>
                    </button>
                  </form>
                </div>
                <div className="single-side follow">
                  <h5>Follow Us</h5>
                  <div className="social">
                    <ul className="d-flex">
                      {/* Social links */}
                      <Social />
                    </ul>
                  </div>
                </div>
                <div className="single-side side-banner text-center">
                  <h5>Faster, cheaper global money transfers</h5>
                  <p>Join Paylio today and get two fee-free transfers</p>
                  <Link href="/index-4" className="cmn-btn">
                    <span>Send Money</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
