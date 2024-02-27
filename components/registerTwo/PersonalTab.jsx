"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Select from "../common/Select";
import fb from "/public/img/fb.png";
import google from "/public/img/google.png";
import show_hide from "/public/img/show-hide.png";
import axios from "axios";

const PersonalTab = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState([
    { id: 1, name: "Selectionnez votre pays" },
    { id: 2, name: "United State" },
    { id: 3, name: "United kingdom" },
    { id: 4, name: "Canada" },
  ]);
  const AlertMessage=()=>{
    return (
        <div className="alert alert-success d-flex align-items-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"></svg>
          <div>
            Utilisateur bien crée
          </div>
        </div>
    )
  }
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [success,setSuccess] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic
    const errors = {};
    if (!firstName) {
      errors.firstName = 'Veuillez entrer votre prénom';
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
          "pays_iso_2": "SN"
        });

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/register`,
          headers: {
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios.request(config)
            .then((response) => {
              setEmail('')
              setFirstName('')
              setLastName('')
              setPhone('')
              setPassword('')
              setConfirmPassword('')
              setSuccess(true)
              console.log(JSON.stringify(response.data));
              setErrors({})
            })
            .catch((error) => {
              console.log(error);
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
  return (
      <>
      {success && <AlertMessage/>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="single-input d-flex align-items-center" style={errors.firstName ? {marginBottom:"10px"} : {} }>
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
            <div className="single-input d-flex align-items-center" style={errors.lastName ? {marginBottom:"10px"} : {} }>
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
              <Select data={country} />
            </div>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="single-input d-flex align-items-center" style={errors.phone ? {marginBottom:"10px"} : {} }>
              <input
                  type="tel"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="single-input d-flex align-items-center" style={errors.email ? {marginBottom:"10px"} : {}}>
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
          <div className="col-12">
            <div className="single-input d-flex align-items-center" style={errors.password ? {marginBottom:"10px"} : {}}>
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
            <div className="single-input d-flex align-items-center" style={errors.confirmPassword ? {marginBottom:"10px"} : {} }>
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
        <div className="remember-forgot d-flex justify-content-between">
          <div className="form-group d-flex">
            <div className="checkbox_wrapper">
              <input
                  className="check-box"
                  id="check1"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
              />
              <label></label>
            </div>
            <label htmlFor="check1">
              <span className="check_span">Se souvenir</span>
            </label>
          </div>
          <div className="forget-pw">
            <Link href={"/forgot-password-2"}>Mot de passe oublié?</Link>
          </div>
        </div>
        <div className="btn-area">
          <button type="submit" className="cmn-btn">S&apos;inscrire</button>
        </div>
      </form>
        </>
  );
};

export default PersonalTab;
