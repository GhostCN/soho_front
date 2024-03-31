"use client";
import {useCurrentUser} from "@/app/lib";
import Image from "next/image";
import logo from "@/public/soho.png";

import {useEffect, useState} from "react";
import axios from "axios";


export default function HomeTwo() {
    const currentUser=useCurrentUser();
    const [transactions,setTransactions]=useState([])
    const formatedDate=(dateString)=>{
        const date = new Date(dateString);
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
        };

        return date.toLocaleString("en-US", options).replace(" PM", "").replace(" GMT", "").replace(" AM","");

    }
    useEffect(()=>{
        async function getTransactions() {
            try {
                return await axios.get(process.env.NEXT_PUBLIC_APP_BASE_URL + '/transaction/list/'+currentUser?.user?.id);
            } catch (error) {
                console.log(error)
                // Handle error
            }
        }
        currentUser?.user && getTransactions().then(({data})=>setTransactions(data));
    },[currentUser?.user])
  return (
    <>
        <section className="banner-section inner-banner index-4">
            <div className="overlay" style={{paddingTop: "150px"}}>
                <div className="banner-content pb-120" style={{marginBottom: "60px"}}>
                    <div className="container transaction">
                        <div className="row justify-content-center flex-column">
                            <div className="col-lg-12 col-md-10">
                                <div className="text-center align-self-center" >
                                    <h3 style={{color:"#007f61 !important"}}>Mes transactions</h3>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 d-none d-md-block">
                                <div className="right-content">
                                    <div className="logo-item">
                                        <Image src={logo} alt="image"/>
                                    </div>
                                    <table className="table mt-5">
                                        <thead>
                                        <tr>
                                            <th scope="col">Téléphone</th>
                                            <th scope="col">De</th>
                                            <th scope="col">Vers</th>
                                            <th scope="col">Bénéficiaire</th>
                                            <th scope="col">Statut</th>
                                            <th scope="col">Montant</th>
                                            <th scope="col">Date transaction</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {transactions.map((trans,index)=>{
                                            return (
                                                <tr key={index}>
                                                    <td>{trans.phoneNumberSender}</td>
                                                    <td>{trans.walletSender}</td>
                                                    <td>{trans.walletReciever}</td>
                                                    <td>{trans.phoneNumberReciever}</td>
                                                    <td className={trans.sohoTxnStatus.includes('SUCCESS')?'badge bg-success':trans.sohoTxnStatus.includes('INIT')?'badge bg-secondary w-100':'"badge bg-danger w-100'}>{trans.sohoTxnStatus}</td>
                                                    <td className="text-center">{trans.amount}</td>
                                                    <td>{formatedDate(trans.txnDate)}</td>
                                                </tr>
                                            )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col-12 d-md-none d-block">
                                {transactions.map((trans,index)=> {
                                    return (
                                        <div className="card my-4" key={index}>
                                            <div className="card-body d-flex flex-column gap-3">
                                                <p className="card-text d-flex justify-content-between">
                                                    Téléphone : <span className="">{trans.phoneNumberSender}</span>
                                                </p>
                                                <p className="card-text d-flex justify-content-between">
                                                    De : <span className="">{trans.walletSender}</span>
                                                </p>
                                                <p className="card-text d-flex justify-content-between">
                                                    Vers : <span className="">{trans.walletReciever}</span>
                                                </p>
                                                <p className="card-text d-flex justify-content-between">
                                                    Montant : <span className="">{trans.amount}</span>
                                                </p>
                                                <p className="card-text d-flex justify-content-between">
                                                    Bénéficiaire : <span className="">{trans.phoneNumberReciever}</span>
                                                </p>
                                                <p className="card-text d-flex justify-content-between">
                                                    Statut : <span className={trans.sohoTxnStatus.includes('SUCCESS')?'badge bg-success':trans.sohoTxnStatus.includes('INIT')?'badge bg-secondary':'"badge bg-danger w-100'}>{trans.sohoTxnStatus}</span>
                                                </p>
                                                <p className="card-text d-flex justify-content-between">
                                                    Date transaction : <span className="">{formatedDate(trans.txnDate)}</span>
                                                </p>
                                            </div>
                                        </div>)
                                })}

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
