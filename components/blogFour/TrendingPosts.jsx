import Image from "next/image";
import Link from "next/link";
import view_icon from "/public/img/view-icon.png";
const blogs = [
  {
    id: 1,
    img: "/img/trending-posts-1.png",
    title: "WHAT IS BITCOIN CASH AND IS IT DIFFERENT THAN BITCOIN?",
    views: "2532",
  },
  {
    id: 2,
    img: "/img/trending-posts-2.png",
    title: "TIPS FOR SMOOTH  ONLINE MONEY TRANSFERS",
    views: "2532",
  },
  {
    id: 3,
    img: "/img/trending-posts-3.png",
    title: "MONEY TRANSFER CAN HELP SMALL BUSINESSES",
    views: "2532",
  },
  {
    id: 4,
    img: "/img/trending-posts-4.png",
    title: "MAJOR COMPANIES ACCEPTING CRYPTO IN 2021",
    views: "2532",
  },
  {
    id: 5,
    img: "/img/trending-posts-5.png",
    title: "WHAT IS THE MOST SECURE CRYPTO WALLET OF 2021?",
    views: "2532",
  },
  {
    id: 6,
    img: "/img/trending-posts-6.png",
    title: "ALL YOU NEED TO KNOW ABOUT THE CRYPTO WORLD",
    views: "2532",
  },
];
const TrendingPosts = () => {
  return (
    <section className="latest-articles posts trending blog-4">
      <div className="overlay pb-120 pt-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-header">
                <h2 className="title">Trending Posts</h2>
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
                  <Link href="/blog-single-2">
                    <h5>{title}</h5>
                  </Link>
                  <p className="date-view d-flex align-items-center">
                    <span>4 days ago</span>
                    <span className="view d-flex align-items-center">
                      <Image src={view_icon} alt="icon" />
                      <span>{views}</span>
                    </span>
                  </p>
                  <Link href="/blog-single-2">
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

export default TrendingPosts;
