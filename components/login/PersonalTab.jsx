"use client";

import Image from "next/image";
import {useState} from "react";
import show_hide from "/public/img/show-hide.png";
import axios from "axios";
import { setCookie } from 'cookies-next';
import {useRouter} from "next/navigation";
import {verifyToken} from "@/app/lib/tools";


const PersonalTab = ()  => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState({})
    const router=useRouter();
    const [message, setMessage] = useState('');

    const AlertMessage = () => {
        return (
            <div className={`alert ${status === "201" ? 'alert-success' : 'alert-danger'} d-flex align-items-center`}
                 role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"></svg>
                <div>
                    {message}
                </div>
            </div>
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation logic
        const errors = {};
        if (!email) {
            errors.email = 'Veuillez entrer votre adresse e-mail';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Adresse e-mail invalide';
        }
        if (!password) {
            errors.password = 'Veuillez entrer un mot de passe';
        }
        if (Object.keys(errors).length === 0) {
            try {
                let data = JSON.stringify({
                    "email": email,
                    "password": password
                });
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/login`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                axios.request(config)
                    .then((response) => {
                        if (verifyToken(response.data.token)){
                            setEmail('')
                            setPassword('')
                            setSuccess(true)
                            setErrors({})
                            setCookie('user', JSON.stringify(response.data));
                            router.push('/')
                        }
                        else {
                            setSuccess(false)
                            setStatus(''+401)
                            setMessage('Erreur serveur')
                        }

                    })
                    .catch((error) => {
                        setStatus(''+error.response.status)
                        setMessage(error.response.data.message)
                        console.log(error.response);
                    });
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
    }
    return (
        <div
            className="tab-pane fade show active"
            id="personal"
            role="tabpanel"
            aria-labelledby="personal-tab"
        >
            {status && <AlertMessage/>}
            <form action="#" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        <div className="single-input d-flex align-items-center" style={errors.email ? {marginBottom:"10px"} : {}}>
                            <input type="email" placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="col-12">
                        <div className="single-input d-flex align-items-center" style={errors.password ? {marginBottom:"10px"} : {}}>
                            <input
                                type={!showPassword ? "password" : "text"}
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
                <div className="btn-area">
                    <button className="cmn-btn">Connexion</button>
                </div>
            </form>
        </div>
    );
};

export default PersonalTab;
