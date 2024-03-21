"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navData } from "./navData";
import logo from "/public/soho.png";
import {useCurrentUser} from "@/app/lib";

const langSelector = [
  { id: 1, name: "EN" },
  { id: 2, name: "BN" },
  { id: 3, name: "ES" },
  { id: 4, name: "NL" },
];

const NavBar = () => {
  const {token}=useCurrentUser();
  const [windowHeight, setWindowHeight] = useState(0);
  const menus = useRef();
  const path = usePathname();
  const hidenMenu = () => {
    menus.current.classList.remove("show");
  };

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navBarTop);
    return () => {
      window.removeEventListener("scroll", navBarTop);
    };
  }, []);

  return (
    <header
      className={`header-section ${
        windowHeight > 50 && "animated fadeInDown header-fixed"
      } `}>
      <div className="overlay">
        <div className="container">
          <div className="row d-flex header-area">
            <nav className="navbar d-flex navbar-expand-lg navbar-dark">
              <Link className="navbar-brand" href="/">
                <Image src={logo} className="logo" alt="logo" width={100}/>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-label="Toggle navigation">
                <i className="fas fa-bars"></i>
              </button>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNavDropdown"
                ref={menus}>
                <ul className="navbar-nav">
                  {navData.map(
                    ({ itm, url, id, dropdown, dropdown_itms, mega_menu }) => {
                      const isActive =
                        dropdown_itms &&
                        dropdown_itms.some(({ url }) => path == url);
                      return !dropdown ? (
                        <li className="nav-item" key={id}>
                          <Link
                            className={`nav-link ${path == url && "active"}`}
                            href={url}
                            onClick={hidenMenu}>
                            {itm}
                          </Link>
                        </li>
                      ) : (
                        <li className="nav-item dropdown" key={id}>
                          <Link
                            className={`nav-link dropdown-toggle ${
                              isActive && "active"
                            }`}
                            href="/"
                            role="button"
                            data-bs-toggle="dropdown">
                            {itm}
                          </Link>
                          {mega_menu ? (
                            <div className="dropdown-menu show mega-menu">
                              <ul className="dropdown">
                                {dropdown_itms?.map(({ id, dp_itm, url }) => (
                                  <li key={id}>
                                    <Link
                                      className={`nav-item ${
                                        path == url && "active"
                                      }`}
                                      href={url}
                                      onClick={hidenMenu}>
                                      {dp_itm}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <ul className="dropdown-menu">
                              {dropdown_itms?.map(({ id, dp_itm, url }) => (
                                <li key={id}>
                                  <Link
                                    className={`nav-item ${
                                      path == url && "active"
                                    }`}
                                    href={url}
                                    onClick={hidenMenu}>
                                    {dp_itm}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    }
                  )}
                </ul>
                {!token ?
                <div className="right-area header-action d-flex align-items-center">
                  <Link href={"/login"} className="cmn-btn login">
                    Se connecter
                  </Link>
                  <Link
                    href={"/register-2"}
                    className="cmn-btn d-lg-none d-xxl-block">
                    Souscrire
                  </Link>
                </div>
                    :
                    <div className="right-area header-action d-flex align-items-center">
                      <Link href={"/logout"} className="cmn-btn">
                        Déconnexion
                      </Link>
                    </div>
                }

              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
