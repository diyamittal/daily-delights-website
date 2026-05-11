import React,{useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import '../style/signup.css'
import Toast from './Toast'

export default function SignUp(){
    const [name, setName]=useState("")
    const [password, setPassword]=useState("")
    const [email, setEmail]=useState("")
    const [phone, setPhone]=useState("")
    const [loading, setLoading]=useState(false)
    const [toast, setToast]=useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }, [navigate])

    const collectData = async()=>{
        if(!name || !email || !password || !phone){
            setToast({ message: 'Please fill in all fields', type: 'error' })
            return
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setToast({ message: 'Please enter a valid email address', type: 'error' })
            return
        }
        if(password.length < 6){
            setToast({ message: 'Password must be at least 6 characters', type: 'error' })
            return
        }
        setLoading(true)
        try{
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
            if(result.error){
                setToast({ message: result.error, type: 'error' })
            } else if(result){
                localStorage.setItem("user", JSON.stringify(result));
                //localStorage.setItem("token", result.auth)
                window.dispatchEvent(new Event('storage'))
                setToast({ message: 'Registered successfully!', type: 'success' })
                setTimeout(()=> navigate('/'), 1000)
            }
        } catch(err){
            setToast({ message: 'Something went wrong. Try again.', type: 'error' })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="register">
            <h1>Register</h1>
            <input type="text" placeholder="Enter Name" className="inputBox" value={name} onChange={(e)=>setName(e.target.value)}></input>
            <input type="email" placeholder="Enter Email" className="inputBox" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter Password" className="inputBox" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <input type="tel" placeholder="Enter Phone Number" className="inputBox" value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
            <button type="button" className="button" onClick={collectData} disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
            <p style={{color:'white', fontSize:'14px'}}>Already have an account? <span onClick={()=>navigate('/Login')} style={{color:'#04fb6b', cursor:'pointer'}}>Login</span></p>
            {toast && <Toast message={toast.message} type={toast.type} onClose={()=>setToast(null)} />}
        </div>
    )
}