"use client";

import { useState } from "react";
import axios from "axios";
import {useCurrentUser} from "@/app/lib";
import {getCookie, setCookie} from "cookies-next";

const PersonalTab = () => {
  const user=useCurrentUser();
  const [recto, setRecto] = useState('');
  const [verso, setVerso] = useState('');
  const [profil, setProfil] = useState('');
  const handleFileChange = (event, setter) => {
    const selectedFile = event.target.files[0];
    setter(selectedFile);
  };
  const handleSubmit= (event) => {
    event.preventDefault();
    if (!recto) {
      console.log('Please select a file');
      return false;
    }
    if (!verso) {
      console.log('Please select a file');
      return false;
    }
    if (!profil) {
      console.log('Please select a file');
      return false;
    }
    const formData = new FormData();
    formData.append("id", user.user.id);
    formData.append('recto', recto);
    formData.append('verso', verso);
    formData.append('profil', profil);
    console.log(formData);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/upload-file`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data : formData
    };

    axios.request(config)
        .then((response) => {
          setRecto('')
          setVerso('')
          setProfil('')
           const user=getCookie('user')
          if (user){
            const updateUser={...JSON.parse(user),user:response.data.user}
            setCookie('user',updateUser);
          }

        })
        .catch((error) => {
          console.log(error.message);
        });

  }
  return (
    <div
      className="tab-pane fade show active"
      id="personal"
      role="tabpanel"
      aria-labelledby="personal-tab"
    >
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <label htmlFor="recto" style={{width:"100%"}}>Recto CNI</label>
              <input type="file" name="recto" onChange={(e)=>handleFileChange(e,setRecto)}/>
              {recto && recto.name}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <label htmlFor="verso" style={{width:"100%"}}>Verso CNI</label>
              <input type="file" name="verso" onChange={(e)=>handleFileChange(e,setVerso)} />

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <label htmlFor="profile" style={{width:"100%"}}>Votre profil</label>
              <input type="file" id="profile" onChange={(e)=>handleFileChange(e,setProfil)} />
            </div>
          </div>
        </div>
        <div className="btn-area">
          <button className="cmn-btn">Valider</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalTab;
