"use client"
import Image from "next/image";
import Link from "next/link";
import logo from "/public/soho.png";
import {Listbox, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {verifyToken} from "@/app/lib/tools";
import {ModalBanner} from "@/components/homeFour/ModalBanner";
import {useRouter} from "next/navigation";


const operateurs = [
    {id: 1, name: "Orange Money"},
    {id: 2, name: "Wave"},
    {id: 3, name: "Free Money"},
];
const Banner = ({user}) => {
    const [showModal, setShowModal] = useState(false);
    const [isValide, setIsvalide] = useState(false);
    const [defaultLibelleFrom, setDefaultLibelleFrom] = useState('');
    const [defaultLibelleTo, setDefaultLibelleTo] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const validateForm = () => {
        setIsvalide(true)
        setShowModal(false)
    }
    const router = useRouter();
    const openModal = () => step === 2 && setShowModal(true);
    const closeModal = () => setShowModal(false);
    const token = user?.token;
    const [to, setTo] = useState(operateurs[0]);
    const [telDestinatire, setTelDestinatire] = useState('');
    const [montant, setMontant] = useState('');
    const [success, setSuccess] = useState(false)
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [from, setFrom] = useState({});
    const [sources, setSources] = useState([]);
    const [destinations, setDestinations] = useState([]);
    useEffect(() => {
        async function getService() {
            try {
                return await axios.get(process.env.NEXT_PUBLIC_APP_BASE_URL + '/transaction/list-services');
            } catch (error) {
                console.log(error)
            }
        }

        getService().then(({data}) => {
            setSources(data?.source)
            setFrom(data?.source[0])
            setDestinations(data?.destinations)
            setTo(data?.destinations[0])
            setDefaultLibelleFrom(data?.source[0]?.libelle)
            setDefaultLibelleTo(data?.destinations[0]?.libelle)
        })
        verifyToken(token)

    }, [token]);
    const sourceCash = [
        {id: 1, value: "Mobile Money", slug: "MOBILE-MONEY"},
        {id: 2, value: "Carte bancaire", slug: "CARTE"},
    ]
    const [source, setSource] = useState(sourceCash[0])
    const [isSelected, setIsSelected] = useState(0)
    const handleClick = (element, index) => {
        setSource(element)
        setIsSelected(index)
       setFrom(getServiceByType(sources, element?.slug)[0])
        setTo(getServiceByType(destinations, sourceCash[0].slug)[0])
    }
    const getServiceByType = (services, type) => {
        return services.filter((source) => source.type.includes(type))
    }
    const [step, setStep] = useState(1);
    const AlertMessage = () => {
        return (
            <div
                className={`alert ${status.includes("20") ? 'alert-success' : 'alert-danger'} d-flex align-items-center`}
                role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"></svg>
                <div>
                    {message}
                </div>
            </div>
        )
    }
    const handleValidate = (e) => {
        e.preventDefault();
        // Validation logic
        const newErrors = {};
        if (!telDestinatire) {
            newErrors.telDestinatire = 'Veuillez entrer votre téléphone';
        }
        if (!montant) {
            newErrors.montant = 'Veuillez entrer votre montant';
        }else if (montant > 5000){
            newErrors.montant = 'Le montant doit être supérieur ou égale à 5000F';
        }
        setErrors(newErrors)
        if (Object.keys(newErrors).length === 0) {
            if(!user.user){
                return router.push('/login')
            }
            if (user?.user?.state.includes("INIT")) {
                return router.push('/register')
            }
            setStep(2)
        } else return false
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        closeModal()
        if (step === 2 && isValide) {
            try {
                    let data = JSON.stringify({
                        "walletSender": from.slug,
                        "totalAmount": totalAmount,
                        "phoneNumberSender": user.user.phone_number,
                        "walletReciever": to.slug,
                        "phoneNumberReciever": telDestinatire,
                        "ussdCode": code || '', // REQUERIED SI LA TXN EST ORANGE MONEY,
                        "fullName": user.user.first_name + ' ' + user.user.last_name, // NOM COMPLET UTILISATEUR CONNECTER QUI FAIT LA TXN
                        "userId": user.user.id,// I
                        "amount": montant
                    });
                    console.log(data)
                    let config = {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        maxBodyLength: Infinity,
                        url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/transaction/init`,
                        data: data
                    };
                    axios.request(config)
                        .then((response) => {

                            /* setCode('')
                             setTelDestinatire('')
                             setMontant('')*/
                            setSuccess(true)
                            setStatus('' + response.status)
                            setMessage(response.data.message)
                            setErrors({})
                            response.data.data.url && router.push(response.data.data.url)
                            !response.data.data.url &&
                            setTimeout(() => {
                                router.push('/index-2');
                            }, 30000); // 1
                        })
                        .catch((error) => {
                            setSuccess(true)
                            setStatus('' + error.response.status)
                            setMessage(JSON.parse(error.response.data.error).message)
                            setTimeout(() => {
                                window.location.reload();
                            }, 30000);
                        });
                } catch (error) {
                console.error('Error submitting form:', error);
            }
            console.log('Form submitted successfully');
        }
    };
    return (
        <section className="banner-section inner-banner index-4">
            <div className="overlay" style={{paddingTop: "150px"}}>
                <div className="banner-content pb-120" style={{marginBottom: "60px"}}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7 col-md-10">
                                <div className="main-content text-center align-self-center">
                                    <h1>Un autre moyen d&apos;envoyer de l&apos;argent</h1>
                                    {
                                        user.token && user.user.state.includes("INIT") &&
                                        <Link href={"/register"} className="cmn-btn mt-4">
                                            Valider compte
                                        </Link>
                                    }

                                </div>
                            </div>
                            <div className="col-lg-5 col-md-10">
                                    <div className="right-content">
                                        <div className="logo-item">
                                            <Image src={logo} alt="image"/>
                                        </div>
                                        {success && <AlertMessage/>}

                                        <form className="form text-center" onSubmit={handleValidate}>
                                            {step === 1 ?
                                                <div className="top-area d-flex flex-column gap-3">
                                                    <div className="nav navs-tabs d-flex justify-content-between align-self-center"
                                                         id="myTab" role="tablist">
                                                        {
                                                            sourceCash.map((element, index) =>
                                                                <div className="nav-item" role="presentation"
                                                                     key={index}>
                                                                    <button
                                                                        className={`navs-check text-black text-black tab ${isSelected === index ? 'active' : ''}`}
                                                                        id="business-tab"
                                                                        data-bs-toggle="tab"
                                                                        data-bs-target="#business"
                                                                        type="button"
                                                                        role="tab"
                                                                        aria-controls="business"
                                                                        onClick={() => handleClick(element, index)}
                                                                        value={element.slug}
                                                                        aria-selected="false">
                                                                        {element.value}
                                                                    </button>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    {source.id === 1 &&
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="single-input d-flex align-items-center">
                                                                <div className="input-control">
                                                                    <label className="input-label">De</label>
                                                                </div>
                                                                <div className="select-area">
                                                                    <Listbox value={from?.slug} onChange={setFrom}>
                                                                        <div className="selector"
                                                                             style={{width: "13vw"}}>
                                                                            <Listbox.Button>
                                                                                    <span className="">{from?.libelle}</span>
                                                                            </Listbox.Button>
                                                                            <Transition as={Fragment}>
                                                                                <Listbox.Options>
                                                                                        {sources
                                                                                            .filter(itm => itm.type.includes(source.slug))
                                                                                            .map((itm) => (
                                                                                                <Listbox.Option
                                                                                                    key={itm.id}
                                                                                                    value={itm}>
                                                                                                    {({from}) => (
                                                                                                        <span
                                                                                                            className={from ? "selected fw-bold" : ""}>
                                                                                                             {itm.libelle}
                                                                                                        </span>
                                                                                                    )}
                                                                                                </Listbox.Option>
                                                                                            ))
                                                                                        }
                                                                                </Listbox.Options>
                                                                            </Transition>
                                                                        </div>
                                                                    </Listbox>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    }
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="single-input d-flex align-items-center"
                                                                 style={errors.montant ? {marginBottom: "10px"} : {}}>
                                                                <input
                                                                    type="number"
                                                                    className="bg-transparent"
                                                                    style={{border: '1px solid transparent'}}
                                                                    placeholder="Montant à envoyer"
                                                                    value={montant}
                                                                    onChange={(e) => {
                                                                        const newMontant = parseInt(e.target.value);
                                                                        setMontant(newMontant);
                                                                        // Calculate total amount
                                                                        const newTotalAmount = newMontant * from?.Fees[0].taux / 100 + newMontant || 0;
                                                                        setTotalAmount(newTotalAmount);
                                                                    }}
                                                                />
                                                            </div>
                                                            {errors.montant &&
                                                                <span className="error">{errors.montant}</span>}
                                                        </div>
                                                    </div>
                                                    {from?.Fees &&
                                                        <div className="row">
                                                            <div className="col-6 align-self-center"
                                                                 style={{color: "#4a507e",textAlign:"justify"}}>
                                                                <label>Montant Total</label>
                                                            </div>

                                                            <div className="col-6">
                                                                <div className="d-flex align-items-center" style={{borderRadius:"10px"}}>
                                                                    <input
                                                                        type="number"
                                                                        className="bg-transparent"
                                                                        placeholder="Montant total"
                                                                        disabled
                                                                        value={totalAmount}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }

                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="single-input d-flex align-items-center">
                                                                <div className="input-control">
                                                                    <label className="input-label">Vers</label>
                                                                </div>
                                                                <div className="select-area">
                                                                    <Listbox value={to?.slug} onChange={setTo}>
                                                                        <div className="selector"
                                                                             style={{width: "14.2vw"}}>
                                                                            <Listbox.Button>
                                                                                <span className="">{to?.libelle}</span>
                                                                            </Listbox.Button>
                                                                            <div className="options-container">
                                                                                <Transition as={Fragment}>
                                                                                    <Listbox.Options>
                                                                                        {
                                                                                            destinations
                                                                                            .filter(itm => itm.type.includes("MOBILE-MONEY"))
                                                                                            .map((itm) => (
                                                                                                <Listbox.Option
                                                                                                    key={itm.id}
                                                                                                    value={itm}>
                                                                                                    {({to}) => (
                                                                                                        <span
                                                                                                            className={to ? "selected fw-bold" : ""}>
                                                                                                             {itm.libelle}
                                                                                                        </span>
                                                                                                    )}
                                                                                                </Listbox.Option>
                                                                                            )
                                                                                            )
                                                                                        }
                                                                                    </Listbox.Options>
                                                                                </Transition>
                                                                            </div>
                                                                        </div>
                                                                    </Listbox>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="single-input d-flex align-items-center"
                                                                 style={errors.telDestinatire ? {marginBottom: "10px"} : {}}>
                                                                <input
                                                                    type={"number"}
                                                                    className="bg-transparent"
                                                                    style={{border: '1px solid transparent'}}
                                                                    placeholder="Numéro de téléphone du destinataire"
                                                                    value={telDestinatire}
                                                                    onChange={(e) => setTelDestinatire(e.target.value)}
                                                                />
                                                            </div>
                                                            {errors.telDestinatire &&
                                                                <span className="error">{errors.telDestinatire}</span>}
                                                        </div>
                                                    </div>

                                                    {from?.libelle && source.id === 1 && from.libelle.includes("Orange Money") &&
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="single-input d-flex align-items-center"
                                                                     style={errors.code ? {marginBottom: "10px"} : {}}>
                                                                    <input
                                                                        type={"number"}
                                                                        className="bg-transparent"
                                                                        style={{border: '1px solid transparent'}}
                                                                        placeholder="Code OTP OM"
                                                                        value={code}
                                                                        onChange={(e) => setCode(e.target.value)}
                                                                    />
                                                                </div>
                                                                <span className="d-flex" style={{fontSize:"12px"}}>* code otp OM = #144#391*code secret OM #</span>
                                                                {errors.code &&
                                                                    <span className="error">{errors.code}</span>}
                                                            </div>
                                                        </div>}
                                                </div> :
                                                <div className="recap mb-3">
                                                    <div className="d-flex justify-content-between mb-3">
                                                <span>
                                                    De
                                                </span>
                                                        <span>
                                                    {from.libelle}
                                                </span>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-3">
                                                <span>
                                                    Montant
                                                </span>
                                                        <span>
                                                    {montant}
                                                </span>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-3">
                                                <span>
                                                    Montant Total
                                                </span>
                                                        <span>
                                                    {totalAmount}
                                                </span>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-3">
                                                <span>
                                                    Vers
                                                </span>
                                                        <span>
                                                    {to.libelle}
                                                </span>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-3">
                                                <span>
                                                    Numéro téléphone
                                                </span>
                                                        <span>
                                                    {telDestinatire}
                                                </span>
                                                    </div>
                                                    {code &&
                                                        <div className="d-flex justify-content-between mb-3">
                                                <span>
                                                    Code otp OM
                                                </span>
                                                            <span>
                                                    {code}
                                                </span>
                                                        </div>
                                                    }

                                                    <div className="form-check">
                                                        <label className="form-check-label">
                                                            Je confirme que les informations fournies sont exactes!
                                                        </label>
                                                        <input className="form-check-input" type="checkbox"
                                                               value={isValide} onClick={() => setIsvalide(true)}
                                                               style={{padding: "1%", borderColor: "black"}}/>
                                                    </div>
                                                </div>
                                            }
                                            <div className="d-flex justify-content-center gap-3 mt-3">
                                                {step === 2 &&
                                                    <Fragment>
                                                        <div className="btn-area">
                                                            <a className="cmn-btn"
                                                               onClick={() => setStep(1)}>Modifier</a>
                                                        </div>
                                                        {showModal && isValide &&
                                                            <ModalBanner onClose={closeModal} onValidate={validateForm}
                                                                         handleSubmit={handleSubmit}/>}
                                                    </Fragment>
                                                }

                                                {isValide && step === 2 ?
                                                    <div className="btn-area">
                                                        <button type="submit" className="cmn-btn" onClick={openModal}>
                                                            envoyer
                                                        </button>
                                                    </div> :
                                                    step === 1 && !user?.user?.state.includes("KYC") ?
                                                        <div className="btn-area">
                                                            <button type="submit" className="cmn-btn">
                                                                envoyer
                                                            </button>
                                                        </div> :
                                                       step===1 && <p className="error">Votre compte est en attente de
                                                            validation</p>
                                                }
                                            </div>
                                        </form>

                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="illu-area wow fadeInLeft"></div>
        </section>
    );
};

export default Banner;
