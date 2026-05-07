import React,{useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import '../style/signup.css'

export default function SignUp(){
    const [name, setName]=useState("")
    const [password, setPassword]=useState("")
    const [email, setEmail]=useState("")
    const [phone, setPhone]=useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }, [navigate])

    const collectData = async()=>{
        console.log(name, email, password, phone)
        //const token = localStorage.getItem('token')
        let result = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/register`, {
            method: 'post',
            body: JSON.stringify({name, email, password, phone}),
            headers:{
                'Content-Type': 'application/json',
                //"Authorization": `Bearer ${token}`
            },
        });
        result = await result.json()
        console.log(result);
        if(result){
            localStorage.setItem("user", JSON.stringify(result));
            //localStorage.setItem("token", result.auth)
            navigate('/')
        }
    }
    return (
        <div className="register">
            <h1>Register</h1>
            <input type="text" placeholder="Enter Name" className="inputBox" value={name} onChange={(e)=>setName(e.target.value)}></input>
            <input type="email" placeholder="Enter Email" className="inputBox" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter Password" className="inputBox" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <input type="tel" placeholder="Enter Phone Number" className="inputBox" value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
            <button type="button" className="button" onClick={collectData}>Sign Up</button>
        </div>
    )
}