import Image from "next/image";
import Link from "next/link";
import icon_left from "/public/img/icon-left.png";
import icon_right from "/public/img/icon-right.png";
import latest_articles_1 from "/public/img/latest-articles-1.png";
import latest_articles_2 from "/public/img/latest-articles-2.png";
import latest_articles_3 from "/public/img/latest-articles-3.png";
import latest_articles_4 from "/public/img/latest-articles-4.png";
import latest_articles_5 from "/public/img/latest-articles-5.png";
import latest_articles_6 from "/public/img/latest-articles-6.png";

const ResourcesTab = () => {
  return (
    <div
      className="tab-pane fade"
      id="resources"
      role="tabpanel"
      aria-labelledby="resources-tab">
      <div className="row cus-mar">
        <div className="col-lg-6">
          <div className="single-area">
            <div className="top-item">
              <Image src={latest_articles_1} alt="image" />
            </div>
            <div className="bottom-item">
              <Link href="/blog-single">
                <h5>
                  What are NFTs and why are some selling for millions of
                  dollars?
                </h5>
              </Link>
              <p>
                Lacus vestibulum sed arcu non. Leo vel fringilla est ullamcorper
                eget nulla facilisi.
              </p>
              <div className="date-area d-flex justify-content-between">
                <Link
                  href="/blog-single"
                  className="d-flex align-items-center gap-2">
                  Read More <i className="fa fa-angle-double-right mb-1"></i>{" "}
                </Link>
                <p className="mdr">July 21, 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="single-area">
            <div className="top-item">
              <Image src={latest_articles_2} alt="image" />
            </div>
            <div className="bottom-item">
              <Link href="/blog-single">
                <h5>
                  How to start investing in the stock market: Step-by-step guide
                  for beginners
                </h5>
              </Link>
              <p>
                Lacus vestibulum sed arcu non. Leo vel fringilla est ullamcorper
                eget nulla facilisi.
              </p>
              <div className="date-area d-flex justify-content-between">
                <Link
                  href="/blog-single"
                  className="d-flex align-items-center gap-2">
                  Read More <i className="fa fa-angle-double-right mb-1"></i>{" "}
                </Link>
                <p className="mdr">July 21, 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="single-area">
            <div className="top-item">
              <Image src={latest_articles_3} alt="image" />
            </div>
            <div className="bottom-item">
              <Link href="/blog-single">
                <h5>
                  7 budgeting tools you should use to better manage and invest
                  your money
                </h5>
              </Link>
              <p>
                Lacus vestibulum sed arcu non. Leo vel fringilla est ullamcorper
                eget nulla facilisi.
              </p>
              <div className="date-area d-flex justify-content-between">
                <Link
                  href="/blog-single"
                  className="d-flex align-items-center gap-2">
                  Read More <i className="fa fa-angle-double-right mb-1"></i>{" "}
                </Link>
                <p className="mdr">July 21, 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="single-area">
            <div className="top-item">
              <Image src={latest_articles_4} alt="image" />
            </div>
            <div className="bottom-item">
              <Link href="/blog-single">
                <h5>
                  How do I buy & sell bitcoin? Everything you need to know
                  before buying bitcoin
                </h5>
              </Link>
              <p>
                Lacus vestibulum sed arcu non. Leo vel fringilla est ullamcorper
                eget nulla facilisi.
              </p>
              <div className="date-area d-flex justify-content-between">
                <Link
                  href="/blog-single"
                  className="d-flex align-items-center gap-2">
                  Read More <i className="fa fa-angle-double-right mb-1"></i>{" "}
                </Link>
                <p className="mdr">July 21, 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="single-area">
            <div className="top-item">
              <Image src={latest_articles_5} alt="image" />
            </div>
            <div className="bottom-item">
              <Link href="/blog-single">
                <h5>
                  Is it smart to invest in cryptocurrency in 2021? What you need
                  to know
                </h5>
              </Link>
              <p>
                Lacus vestibulum sed arcu non. Leo vel fringilla est ullamcorper
                eget nulla facilisi.
              </p>
              <div className="date-area d-flex justify-content-between">
                <Link
                  href="/blog-single"
                  className="d-flex align-items-center gap-2">
                  Read More <i className="fa fa-angle-double-right mb-1"></i>{" "}
                </Link>
                <p className="mdr">July 21, 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="single-area">
            <div className="top-item">
              <Image src={latest_articles_6} alt="image" />
            </div>
            <div className="bottom-item">
              <Link href="/blog-single">
                <h5>
                  How to save money - 8 simple ways to start saving money every
                  month
                </h5>
              </Link>
              <p>
                Lacus vestibulum sed arcu non. Leo vel fringilla est ullamcorper
                eget nulla facilisi.
              </p>
              <div className="date-area d-flex justify-content-between">
                <Link
                  href="/blog-single"
                  className="d-flex align-items-center gap-2">
                  Read More <i className="fa fa-angle-double-right mb-1"></i>{" "}
                </Link>
                <p className="mdr">July 21, 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item">
                <Link className="page-link" href="#" aria-label="Previous">
                  <Image src={icon_left} alt="icon" />
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link active" href="#">
                  <h5>1</h5>
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  <h5>2</h5>
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  <h5>3</h5>
                </Link>
              </li>
              <li className="page-dots">...</li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  <h5>7</h5>
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  <h5>8</h5>
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  <h5>9</h5>
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#" aria-label="Next">
                  <Image src={icon_right} alt="icon" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ResourcesTab;
