import Image from "next/image";
import Comment from "../blogSingle/Comment";
import CommentForm from "../blogSingle/CommentForm";
import Social from "../social/Social";
import author_2 from "/public/img/author-2.png";
import blog_bg_img from "/public/img/blog-bg-img.png";
import eth_blog_sec from "/public/img/eth-blog-sec.png";
import share_icon from "/public/img/share-icon.png";

const BlogSingleBody = () => {
  return (
    <section className="blog-single second latest-articles blog-single-2 latest">
      <div className="overlay pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="main-content">
                <div className="single-content">
                  <h4 className="title-area">What are NFT tokens?</h4>
                  <p>
                    Convallis posuere morbi leo urna. Tellus cras adipiscing
                    enim eu. Interdum velit laoreet id donec ultrices tincidunt
                    arcu.
                    <span>Velit laoreet id</span> donec ultrices. Ornare arcu
                    dui vivamus arcu felis bibendum. Pharetra vel turpis nunc
                    eget. Vestibulum sed arcu non odio.
                  </p>
                </div>
                <div className="quotation">
                  <p className="xlr">
                    “Nulla facilisi etiam dignissim diam quis enim. Euismod
                    elementum nisi quis eleifend quam adipiscing vitae.”
                  </p>
                </div>
                <div className="single-content">
                  <h5 className="title-area">Should I invest in NFTs?</h5>
                  <p>
                    Odio tempor orci dapibus ultrices in iaculis nunc sed.
                    Iaculis eu non diam phasellus vestibulum. Eu sem integer
                    vitae justo eget magna fermentum. Tristique senectus et
                    netus et malesuada fames.
                  </p>
                </div>
                <div className="single-content">
                  <h5 className="title-area">
                    What cryptocurrency do I need to buy NFTs?
                  </h5>
                  <p>
                    Turpis egestas sed tempus urna et. Elementum eu facilisis
                    sed odio morbi quis. Urna nec tincidunt praesent semper
                    feugiat nibh sed pulvinar. In aliquam sem fringilla ut morbi
                    tincidunt augue interdum. Vestibulum mattis ullamcorper
                    velit sed.
                  </p>
                  <ul>
                    <li>
                      — Blandit dignissim nulla varius tristique a sed integer
                      ut tempor.
                    </li>
                    <li>— Augue interdum semper bibendum amet sed.</li>
                    <li>— Dis in at ultricies tortor sit tellus.</li>
                    <li>— Habitant ornare aenean maecenas pretium</li>
                  </ul>
                </div>
                <div className="single-content">
                  <h5 className="title-area">Are NFTs a good investment?</h5>
                  <p>
                    Turpis egestas sed tempus urna et. Elementum eu facilisis
                    sed odio morbi quis. Urna nec tincidunt praesent semper
                    feugiat nibh sed pulvinar. In aliquam sem fringilla ut morbi
                    tincidunt augue interdum. Vestibulum mattis ullamcorper
                    velit sed.
                  </p>
                  <ul>
                    <li>
                      — Blandit dignissim nulla varius tristique a sed integer
                      ut tempor.
                    </li>
                    <li>— Augue interdum semper bibendum amet sed.</li>
                    <li>— Dis in at ultricies tortor sit tellus.</li>
                    <li>— Habitant ornare aenean maecenas pretium</li>
                  </ul>
                </div>
                <div className="single-content">
                  <h5 className="title-area">
                    Are NFTs legal in all countries?
                  </h5>
                  <p>
                    Proin sed libero enim sed faucibus turpis in eu mi.
                    Dignissim cras tincidunt lobortis feugiat. Vitae purus
                    faucibus ornare suspendisse. Quis viverra nibh cras pulvinar
                    mattis nunc sed blandit libero.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSingleBody;
