"use client";
import {useCurrentUser} from "@/app/lib";
import Image from "next/image";
import logo from "@/public/soho.png";

import {useEffect} from "react";


export default function HomeTwo() {
    const currentUser=useCurrentUser();
    useEffect(()=>{

    },[])
  return (
    <>
        <section className="banner-section inner-banner index-4">
            <div className="overlay" style={{paddingTop: "150px"}}>
                <div className="banner-content pb-120" style={{marginBottom: "60px"}}>
                    <div className="container">
                        <div className="row justify-content-center flex-column">
                            <div className="col-lg-12 col-md-10">
                                <div className="text-center align-self-center" >
                                    <h3 style={{color:"#007f61 !important"}}>Mes transactions</h3>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="right-content">
                                    <div className="logo-item">
                                        <Image src={logo} alt="image"/>
                                    </div>
                                    <table className="table mt-5 d-none d-md-block">
                                        <thead>
                                        <tr>
                                            <th scope="col">Prénom</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Téléphone</th>
                                            <th scope="col">De</th>
                                            <th scope="col">Statut</th>
                                            <th scope="col">Vers</th>
                                            <th scope="col">Statut</th>
                                            <th scope="col">Montant</th>
                                            <th scope="col">Date transaction</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <div className="d-md-none d-block">
                                        <div className="d-flex justify-content-between">
                                           <span>
                                               Prénom
                                           </span>
                                            <span>
                                               Prénom
                                           </span>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                           <span>
                                               Prénom
                                           </span>
                                            <span>
                                               Prénom
                                           </span>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                           <span>
                                               Prénom
                                           </span>
                                            <span>
                                               Prénom
                                           </span>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                           <span>
                                               Prénom
                                           </span>
                                            <span>
                                               Prénom
                                           </span>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                           <span>
                                               Prénom
                                           </span>
                                            <span>
                                               Prénom
                                           </span>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                           <span>
                                               Prénom
                                           </span>
                                            <span>
                                               Prénom
                                           </span>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                           <span>
                                               Prénom
                                           </span>
                                            <span>
                                               Prénom
                                           </span>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                           <span>
                                               Prénom
                                           </span>
                                            <span>
                                               Prénom
                                           </span>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                           <span>
                                               Prénom
                                           </span>
                                            <span>
                                               Prénom
                                           </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="illu-area wow fadeInLeft"></div>
        </section>

    </>
  );
}
