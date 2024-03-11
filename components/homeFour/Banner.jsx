"use client"
import Image from "next/image";
import Link from "next/link";
import Select from "../common/Select";
import logo from "/public/soho.png";
import {Listbox, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const operateurs = [
    {id: 1, name: "Orange Money"},
    {id: 2, name: "Wave"},
    {id: 3, name: "Free Money"},
];
const Banner = ({user}) => {
    const [from, setFrom] = useState(operateurs[0]);
    const [to, setTo] = useState(operateurs[0]);
    const [telDestinatire, setTelDestinatire] = useState('');
    const [montant, setMontant] = useState('');
    const [success, setSuccess] = useState(false)
    const [country, setCountry] = useState([
        {id: 1, name: "Votre pays", shortName: ""},
        {id: 2, name: "SÉNÉGAL", shortName: "SN"},
        {id: 3, name: "CÔTE D'IVOIRE", shortName: "CI"},
        {id: 4, name: "BÉNIN", shortName: "BN"},
        {id: 5, name: "BURKINA FASO", shortName: "BF"},
        {id: 6, name: "TOGO", shortName: "TG"},
        {id: 7, name: "MALI", shortName: "ML"}
    ]);
    const [selected, setSelected] = useState(country[0]);
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});
    const router = useRouter();
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStep(2)
        /*if (user.user.state.includes("INIT")) {
            return window.location.href = '/register'
        }*/
        // Validation logic
        const errors = {};
        if (!telDestinatire) {
            errors.telDestinatire = 'Veuillez entrer votre téléphone';
        }
        if (!montant) {
            errors.montant = 'Veuillez entrer votre montant';
        }
        if (!code) {
            errors.code = 'Veuillez entrer votre code';
        }
        if (step === 2) {
            if (Object.keys(errors).length === 0) {
                try {
                    let data = JSON.stringify({
                        "source": {
                            "id_user": 1,
                            "operator": from.name,
                            "pays_iso_2": user.user.pays_iso2,
                            "code": code
                        },
                        "destination": {
                            "phone_number": telDestinatire,
                            "operator": to.name + '-' + selected.shortName
                        },
                        "amount": montant
                    });
                    console.log("data", data)
                    let config = {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        maxBodyLength: Infinity,
                        url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/transaction/create-transaction`,
                        data: data
                    };
                    axios.request(config)
                        .then((response) => {
                            console.log(response)
                            setCode('')
                            setTelDestinatire('')
                            setMontant('')
                            console.log(JSON.stringify(response.data));
                            setSuccess(true)
                            setStatus('' + response.status)
                            setMessage(response.data.message)
                            setErrors({})
                        })
                        .catch((error) => {
                            console.log(error);
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
                <div className="banner-content pb-120">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7 col-md-10">
                                <div className="main-content">
                                    <h1>Un autre moyen d&apos;envoyer de l&apos;argent</h1>
                                    {/*       <p>Safe and affordable online money transfer service</p>*/}
                                    {!user.token && <Link href={"/register-2"} className="cmn-btn">
                                        Connexion/Inscription
                                    </Link>}
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

                                        <form className="form text-center" onSubmit={handleSubmit}>
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
                                                                        <Listbox value={from.name} onChange={setFrom}>
                                                                            <div className="selector">
                                                                                <Listbox.Button>
                                                                                    <span
                                                                                        className="">{from?.name}</span>
                                                                                </Listbox.Button>
                                                                                <Transition as={Fragment}>
                                                                                    <Listbox.Options>
                                                                                        {operateurs.map((itm) => (
                                                                                            <Listbox.Option key={itm.id}
                                                                                                            value={itm}>
                                                                                                {({from}) => (
                                                                                                    <span
                                                                                                        className={from ? "selected fw-bold" : ""}>
                                                  {itm.name}
                                                                                                        {from}
                                                </span>
                                                                                                )}
                                                                                            </Listbox.Option>
                                                                                        ))}
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
                                                                    <Listbox value={to.name} onChange={setTo}>
                                                                        <div className="selector">
                                                                            <Listbox.Button>
                                                                                <span className="">{to?.name}</span>
                                                                            </Listbox.Button>
                                                                            <Transition as={Fragment}>
                                                                                <Listbox.Options>
                                                                                    {operateurs.map((itm) => (
                                                                                        <Listbox.Option key={itm.id}
                                                                                                        value={itm}>
                                                                                            {({to}) => (
                                                                                                <span
                                                                                                    className={to ? "selected fw-bold" : ""}>
                                                  {itm.name}
                                                                                                    {to}
                                                </span>
                                                                                            )}
                                                                                        </Listbox.Option>
                                                                                    ))}
                                                                                </Listbox.Options>
                                                                            </Transition>
                                                                        </div>
                                                                    </Listbox>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="single-input d-flex align-items-center">
                                                                <div className="input-control">
                                                                    <label className="input-label">Pays</label>
                                                                </div>
                                                                <div className="select-area" style={{width: "165px"}}>
                                                                    <Listbox value={selected.name}
                                                                             onChange={setSelected}>
                                                                        <div className="selector">
                                                                            <Listbox.Button>
                                                                                <span
                                                                                    className="">{selected?.name}</span>
                                                                            </Listbox.Button>
                                                                            <Transition as={Fragment}>
                                                                                <Listbox.Options>
                                                                                    {country.map((itm) => (
                                                                                        <Listbox.Option key={itm.id}
                                                                                                        value={itm}>
                                                                                            {({selected}) => (
                                                                                                <span
                                                                                                    className={selected ? "selected fw-bold" : ""}>
                                                  {itm.name}
                                                                                                    {selected}
                                                </span>
                                                                                            )}
                                                                                        </Listbox.Option>
                                                                                    ))}
                                                                                </Listbox.Options>
                                                                            </Transition>
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

                                                    {source.id === 1 && to.name === "Orange Money" &&
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
                                                    {from.name}
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
                                                    {to.name}
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
                                                    Pays
                                                </span>
                                                        <span>
                                                    {selected.name}
                                                </span>
                                                    </div>
                                                </div>
                                            }
                                            <div className="btn-area">
                                                <button type="submit" className="cmn-btn">envoyer</button>
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
