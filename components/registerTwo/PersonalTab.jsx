"use client";

import Image from "next/image";
import {Fragment, useEffect, useState} from "react";
import show_hide from "/public/img/show-hide.png";
import axios from "axios";
import {Listbox, Transition} from "@headlessui/react";


const PersonalTab = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState([
        {id: 1, name: "Votre pays", shortName: "",indicatif:""},
        {id: 2, name: "SÉNÉGAL", shortName: "SN",indicatif:"+221"},
        {id: 3, name: "CÔTE D'IVOIRE", shortName: "CI",indicatif:"+225"},
        {id: 4, name: "BÉNIN", shortName: "BN",indicatif:"+229"},
        {id: 5, name: "BURKINA FASO", shortName: "BF",indicatif:"+226"},
        {id: 6, name: "TOGO", shortName: "TG",indicatif:"+228"},
        {id: 7, name: "MALI", shortName: "ML",indicatif:"+223"}
    ]);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
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
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selected, setSelected] = useState(country[0]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false)
    const [otp, setOtp] = useState('');
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {

    }, [message])
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation logic
        const errors = {};
        if (!firstName) {
            errors.firstName = 'Veuillez entrer votre prénom';
        }
        if (!otp) {
            errors.otp = 'Veuillez entrer votre otp';
        }
        if (!lastName) {
            errors.lastName = 'Veuillez entrer votre nom';
        }
        if (!country) {
            errors.country = 'Veuillez sélectionner un pays';
        }
        if (!phone) {
            errors.phone = 'Veuillez entrer votre numéro de téléphone';
        }
        if (!email) {
            errors.email = 'Veuillez entrer votre adresse e-mail';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Adresse e-mail invalide';
        }
        if (!password) {
            errors.password = 'Veuillez entrer un mot de passe';
        }
        if (!confirmPassword) {
            errors.confirmPassword = 'Veuillez confirmer votre mot de passe';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        if (Object.keys(errors).length === 0) {
            try {
                let data = JSON.stringify({
                    "email": email,
                    "first_name": firstName,
                    "last_name": lastName,
                    "phone_number": phone,
                    "password": password,
                    "pays_iso_2": selected.shortName,
                    "otp_code": otp
                });
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/register`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                axios.request(config)
                    .then((response) => {
                        console.log("reponse", response)
                        setEmail('')
                        setFirstName('')
                        setLastName('')
                        setPhone('')
                        setPassword('')
                        setConfirmPassword('')
                        setOtp('')
                        setSuccess(true)
                        console.log(JSON.stringify(response.data));
                        setStatus('' + response.status)
                        setMessage(response.data.message)
                        setErrors({})
                    })
                    .catch(({response}) => {
                        setSuccess(true)
                        setStatus('' + response.status)
                        setMessage(response.data.message)
                        console.log(response);
                    });
                // Handle success response, e.g., redirect user
            } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error response, e.g., display error message to user
            }
            console.log('Form submitted successfully');
        } else {
            setErrors(errors);
        }
    };
    const handleOtp = async (receiver) => {

        if (receiver) {
            try {
                const bodyRequest = receiver.includes('@') ? {
                    "receiver": receiver,
                    "chanel": "email"
                } : {
                    "receiver": receiver.startsWith('+') ? receiver : selected.indicatif+receiver,
                    "chanel": "sms"
                };

                const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/send-otp-chanel`, bodyRequest);
                setStatus(status + '');
                setMessage(data.message);
                setSuccess(true);
                if (status === 200) {
                    setIsSent(true);
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
                setStatus("" + error.response.status);
                setMessage(error.response.data.message);
            }
        }
    };

    const handleValidate = async (tel, code,e) => {
        e.preventDefault();
        try {
            const bodyRequest = {
                "phone_number": tel.startsWith('+') ? tel :selected.indicatif+tel,
                "otp_code": code
            };
            const { status, data } = await axios.post(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/check-otp-phone`, bodyRequest);
            if (status === 200) {
                setStep(2);
                //pour masquer le toast sur la partie 2
                setSuccess(false)
                setOtp('')
                setIsSent(false)
            } else {
                setStatus("" + status);
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error validating OTP:', error);
            setStatus("" + error.response.status);
            setMessage(error.response.data.message);
        }
    };

    return (
        <>
            {success && <AlertMessage/>}
            <form onSubmit={handleSubmit}>
                {step === 1 ?
                    <>
                        <div className="row">
                            <div className="col-12">
                                <div className="single-input d-flex align-items-center"
                                     style={errors.firstName ? {marginBottom: "10px"} : {}}>
                                    <input
                                        type="text"
                                        placeholder="Prénom"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                {errors.firstName && <span className="error">{errors.firstName}</span>}
                            </div>
                            <div className="col-12">
                                <div className="single-input d-flex align-items-center"
                                     style={errors.lastName ? {marginBottom: "10px"} : {}}>
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                {errors.lastName && <span className="error">{errors.lastName}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="single-input d-flex align-items-center">
                                    {/* Replace Select component with your actual Select component */}
                                    <Listbox value={selected.name} onChange={setSelected}>
                                        <div className="selector">
                                            <Listbox.Button>
                                                <span className="">{selected?.name}</span>
                                            </Listbox.Button>
                                            <Transition as={Fragment}>
                                                <Listbox.Options>
                                                    {country.map((itm) => (
                                                        <Listbox.Option key={itm.id} value={itm}>
                                                            {({selected}) => (
                                                                <span className={selected ? "selected fw-bold" : ""}>
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
                                {errors.selected && <span className="error">{errors.selected}</span>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="single-input d-flex align-items-center"
                                     style={errors.phone ? {marginBottom: "10px"} : {}}>
                                    <input
                                        type="tel"
                                        placeholder={selected.indicatif}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                {errors.phone && <span className="error">{errors.phone}</span>}
                            </div>
                        </div>
                        <div className="row">
                            {!isSent &&
                                <div className="col-12 mb-3">
                                    <a className="cmn-btn" onClick={() => handleOtp(phone)}>Envoyer cote OtP</a>
                                </div>}
                            <div className="col-12">
                                <div className="single-input d-flex align-items-center"
                                     style={errors.otp ? {marginBottom: "10px"} : {}}>
                                    <input
                                        type="text"
                                        placeholder="Veuillez saisir code OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                                {errors.otp && <span className="error">{errors.otp}</span>}
                            </div>
                        </div>
                    </> :
                    <>
                        <div className="row">
                            <div className="col-12">
                                <div className="single-input d-flex align-items-center"
                                     style={errors.email ? {marginBottom: "10px"} : {}}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                        </div>
                        <div className="row">
                            {!isSent &&
                                <div className="col-12 mb-3">
                                    <a className="cmn-btn" onClick={() => handleOtp(email)}>Envoyer cote OtP</a>
                                </div>}
                            <div className="col-12">
                                <div className="single-input d-flex align-items-center"
                                     style={errors.otp ? {marginBottom: "10px"} : {}}>
                                    <input
                                        type="text"
                                        placeholder="Veuillez saisir code OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                                {errors.otp && <span className="error">{errors.otp}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="single-input d-flex align-items-center"
                                     style={errors.password ? {marginBottom: "10px"} : {}}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="passInput"
                                        placeholder="Mot de passe"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Image
                                        className="showPass"
                                        src={show_hide}
                                        alt="image"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </div>
                                {errors.password && <span className="error">{errors.password}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="single-input d-flex align-items-center"
                                     style={errors.confirmPassword ? {marginBottom: "10px"} : {}}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="passInput"
                                        placeholder="Confirmation Mot de passe"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <Image
                                        className="showPass"
                                        src={show_hide}
                                        alt="image"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </div>
                                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                            </div>
                        </div>
                    </>}
                {step === 1 ?
                    <div className="btn-area">
                        <button onClick={(e) => handleValidate(phone,otp,e)} className="cmn-btn">Continuer</button>
                    </div> :
                    <div className="btn-area">
                        <button type="submit" className="cmn-btn">S&apos;inscrire</button>
                    </div>
                }
            </form>
        </>
    );
};

export default PersonalTab;
