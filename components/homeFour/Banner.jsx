"use client"
import Image from "next/image";
import Link from "next/link";
import Select from "../common/Select";
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
    const [destinataires, setDestinataires] = useState([]);

    useEffect(() => {
        async function getService() {
            try {
                return await axios.get(process.env.NEXT_PUBLIC_APP_BASE_URL + '/transaction/list-services');
            } catch (error) {
                // Handle error
            }
        }

        getService().then(({data}) => {
            setSources(data?.source)
            setFrom(data?.source[0])
            setDestinataires(data?.destinations)
            setTo(data?.destinations[0])
        })
        verifyToken(token)
    }, [token]);
    const sourceCash = [
        {id: 1, value: "Mobile Money"},
        {id: 2, value: "Carte bancaire"},
    ]
    const [source, setSource] = useState(sourceCash[0])
    const [isSelected, setIsSelected] = useState(0)
    const handleClick = (element, index) => {
        setSource(element)
        setIsSelected(index)
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

   const handleValidate = (e)=>{
        e.preventDefault();
       // Validation logic
       const newErrors = {};
       if (!telDestinatire) {
           newErrors.telDestinatire = 'Veuillez entrer votre téléphone';
       }
       if (!montant) {
           newErrors.montant = 'Veuillez entrer votre montant';
       }
       setErrors(newErrors)

       if(Object.keys(newErrors).length === 0){

           if (user.user.state.includes("INIT")) {
               return window.location.href = '/register'
           }
           setStep(2)
       }else return false


   }
    const handleSubmit = async (e) => {
        e.preventDefault();
         closeModal()
        // Validation logic
        const errors = {};
        if (!telDestinatire) {
            errors.telDestinatire = 'Veuillez entrer votre téléphone';
        }
        if (!montant) {
            errors.montant = 'Veuillez entrer votre montant';
        }
        console.log('Hello')
        if (step === 2 && isValide) {

            if (Object.keys(errors).length === 0) {

                try {
                    let data = JSON.stringify({
                        "walletSender": from.slug,
                        "phoneNumberSender": user.user.phone_number,
                        "walletReciever": to.slug,
                        "phoneNumberReciever": telDestinatire,
                        "ussdCode": code || '', // REQUERIED SI LA TXN EST ORANGE MONEY,
                        "fullName": user.user.first_name + ' ' + user.user.last_name, // NOM COMPLET UTILISATEUR CONNECTER QUI FAIT LA TXN
                        "userId": user.user.id,// I
                        "amount": montant
                    });
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
                        })
                        .catch(({response}) => {
                            setSuccess(true)
                            setStatus('' + response.status)
                            setMessage(response.data.message)
                            console.log(response);
                        });
                } catch (error) {
                    console.error('Error submitting form:', error);
                }
                console.log('Form submitted successfully');
            } else {
                setErrors(errors);
            }
        }
    };
    return (
        <section className="banner-section inner-banner index-4">
            <div className="overlay" style={{paddingTop: "150px"}}>
                <div className="banner-content pb-120" style={{marginBottom: "60px"}}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7 col-md-10">
                                <div className="main-content">
                                    <h1>Un autre moyen d&apos;envoyer de l&apos;argent</h1>
                                    {/*       <p>Safe and affordable online money transfer service</p>*/}
                                    <Link href={"/register"} className="cmn-btn">
                                        Valider compte
                                    </Link>
                                </div>
                            </div>
                            {!user.token ?
                                <div className="col-lg-5 col-md-10">
                                    <div className="right-content">
                                        <div className="logo-item">
                                            <Image src={logo} alt="image"/>
                                        </div>
                                        <form className="form text-center">
                                            <div className="top-area">
                                                <div className="single-input d-flex align-items-center">
                                                    <div className="input-control">
                                                        <label className="input-label">De</label>
                                                    </div>
                                                    <div className="select-area">
                                                        {/* select */}
                                                        <Select data={operateurs}/>
                                                    </div>
                                                </div>
                                                <div className="single-input d-flex align-items-center">
                                                    <div className="input-control">

                                                        <label className="input-label">Vers</label>
                                                    </div>
                                                    <div className="select-area">
                                                        {/* select */}
                                                        <Select data={operateurs}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link href={"/register-2"} className="cmn-btn">
                                                Commencez
                                            </Link>
                                        </form>
                                    </div>
                                </div> :

                                <div className="col-lg-5 col-md-10">
                                    <div className="right-content">
                                        <div className="logo-item">
                                            <Image src={logo} alt="image"/>
                                        </div>
                                        {success && <AlertMessage/>}

                                        <form className="form text-center" onSubmit={handleValidate}>
                                            {step === 1 ?
                                                <div className="top-area d-flex flex-column gap-3">
                                                    <ul className="nav navs-tabs" id="myTab" role="tablist">
                                                        {
                                                            sourceCash.map((element, index) =>
                                                                <li className="nav-item" role="presentation"
                                                                    key={index}>
                                                                    <button
                                                                        className={`nav-link text-black text-black tab ${isSelected === index ? 'active' : ''}`}
                                                                        id="business-tab"
                                                                        data-bs-toggle="tab"
                                                                        data-bs-target="#business"
                                                                        type="button"
                                                                        role="tab"
                                                                        aria-controls="business"
                                                                        onClick={() => handleClick(element, index)}
                                                                        value={element.value}
                                                                        aria-selected="false">
                                                                        {element.value}
                                                                    </button>
                                                                </li>
                                                            )
                                                        }
                                                    </ul>
                                                    {source.id === 1 &&
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="single-input d-flex align-items-center">
                                                                    <div className="input-control">
                                                                        <label className="input-label">De</label>
                                                                    </div>
                                                                    <div className="select-area">
                                                                        <Listbox value={from.slug} onChange={setFrom}>
                                                                            <div className="selector"
                                                                                 style={{width: "13vw"}}>
                                                                                <Listbox.Button>
                                                                                    <span
                                                                                        className="">{from.libelle}</span>
                                                                                </Listbox.Button>
                                                                                <Transition as={Fragment}>
                                                                                    <Listbox.Options>
                                                                                        {
                                                                                            sources.map((itm) => (
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
                                                                    onChange={(e) => setMontant(e.target.value)}
                                                                />
                                                            </div>
                                                            {errors.montant &&
                                                                <span className="error">{errors.montant}</span>}
                                                        </div>
                                                    </div>

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
                                                                                        {destinataires.map((itm) => (
                                                                                            <Listbox.Option key={itm.id}
                                                                                                            value={itm}>
                                                                                                {({to}) => (
                                                                                                    <span
                                                                                                        className={to ? "selected fw-bold" : ""}>
                                                            {itm.libelle}
                                                                                                        {to}
                                                        </span>
                                                                                                )}
                                                                                            </Listbox.Option>
                                                                                        ))}
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

                                                    <div className="d-flex justify-content-between mb-3">
                                                <span>
                                                    Code
                                                </span>
                                                        <span>
                                                    {code}
                                                </span>
                                                    </div>

                                                    <div className="form-check">
                                                            <label className="form-check-label">
                                                                Je confirme que les informations fournies sont exactes!
                                                            </label>
                                                        <input className="form-check-input" type="checkbox" value={isValide} onClick={()=>setIsvalide(true)}  style={{padding:"1%",borderColor:"black"}}/>
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

                                                {isValide && step===2 ?
                                                <div className="btn-area">
                                                    <button type="submit" className="cmn-btn" onClick={openModal}>
                                                        envoyer
                                                    </button>
                                                </div>:
                                                    step ===1 &&
                                                    <div className="btn-area">
                                                        <button type="submit" className="cmn-btn">
                                                            envoyer
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="illu-area wow fadeInLeft"></div>
        </section>
    );
};

export default Banner;
