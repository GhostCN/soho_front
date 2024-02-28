import {useEffect, useState} from "react";
import { getCookie } from 'cookies-next';
export const useCurrentUser=()=>{
    const [user,setUser]=useState({})

    useEffect(()=>{
        const currentUser= getCookie('user');
        if (currentUser){
            setUser(JSON.parse(currentUser));
        }
    },[]
    )
    return user;
}