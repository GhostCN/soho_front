import Image from "next/image";
import Link from "next/link";
import view_icon from "/public/img/view-icon.png";

const blogs = [
  {
    id: 1,
    img: "/img/popular-posts-1.png",
    title: "MAJOR COMPANIES ACCEPTING CRYPTO",
    views: "2532",
  },
  {
    id: 2,
    img: "/img/popular-posts-2.png",
    title: "WHAT IS THE CHEAPEST WAY TO TRANSFER MONEY?",
    views: "2532",
  },
  {
    id: 3,
    img: "/img/popular-posts-3.png",
    title: "GET €10 CASHBACK WHEN YOU DEPOSIT WITH TRUSTLY",
    views: "2532",
  },
  {
    id: 4,
    img: "/img/popular-posts-4.png",
    title: "10 BEST CRYPTO CURRENCIES TO INVEST",
    views: "2532",
  },
  {
    id: 5,
    img: "/img/popular-posts-5.png",
    title: "TOP 5 FINANCIAL TECH TRENDS IN 2021",
    views: "2532",
  },
  {
    id: 6,
    img: "/img/popular-posts-6.png",
    title: "PREPAID CARDS TYPES AND DIFFERENCES",
    views: "2532",
  },
];

const PopularPosts = () => {
  return (
    <section className="latest-articles posts blog-4">
      <div className="overlay pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-header">
                <h2 className="title">Popular Posts</h2>
              </div>
            </div>
          </div>
          <div className="row cus-mar">
            {blogs.map(({ id, img, title, views }) => (
              <div key={id} className="col-lg-4">
                <div className="single-item">
                  <div className="img-area text-center">
                    <Image width={376} height={248} src={img} alt="image" />
                  </div>
                  <Link href="/blog-single">
                    <h5>{title}</h5>
                  </Link>
                  <p className="date-view d-flex align-items-center">
                    <span>4 days ago</span>
                    <span className="view d-flex align-items-center">
                      <Image src={view_icon} alt="icon" />
                      <span>{views}</span>
                    </span>
                  </p>
                  <Link href="/blog-single">
                    Read More <i className="fa fa-angle-double-right mb-1"></i>{" "}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularPosts;
