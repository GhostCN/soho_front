import Image from "next/image";
import Link from "next/link";
import BusinessTab from "./BusinessTab";
import PersonalTab from "./PersonalTab";
import logo from "/public/soho.png";

const LoginBody = () => {
  return (
    <section className="log-reg">
      <div className="overlay pb-120">
        <div className="container">
          <div className="top-head-area">
            <div className="row d-flex align-items-center">
              <div className="col-sm-5 col">
                <Link
                  className="back-home d-flex gap-2 align-items-center text-black"
                  href="/">
                  <i className="fa fa-angle-double-left mb-1 primaire"></i> Retour
                </Link>
              </div>
              <div className="col-sm-5 col">
                <Link href="/">
                  <Image src={logo} alt="image" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="form-box">
                <h4 style={{color: '#007f61'}}>Connexion Soho</h4>
                <p className="dont-acc">
                  Tu n&#39;as pas de compte?{" "}
                  <Link href={"/register-2"} color={'#007f61'}>s&#39;inscrire</Link>
                </p>
                <div className="tab-content mt-3" id="myTabContent">
                  {/* Personal Tab  */}
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

export default LoginBody;
