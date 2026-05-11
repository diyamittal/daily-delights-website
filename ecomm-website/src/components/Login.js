import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import '../style/login.css'
import Toast from './Toast'

const Login = ()=>{
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const navigate= useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }, [navigate])

    const handleLogin= async()=>{
        if(!email || !password){
            setToast({ message: 'Please enter email and password', type: 'error' })
            return
        }
        setLoading(true)
        try{
            //const token = localStorage.getItem('token')
            let result = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/login`, {
                method: 'post',
                body: JSON.stringify({email, password}),
                headers:{
                    'Content-Type': 'application/json',
                    //"Authorization": `Bearer ${token}`
                },
            });
            result = await result.json();
            if(result && !result.result){
                localStorage.setItem("user", JSON.stringify(result));
                window.dispatchEvent(new Event('storage'))
                setToast({ message: 'Logged in successfully!', type: 'success' })
                setTimeout(()=> navigate('/'), 1000)
            } else {
                setToast({ message: 'Invalid email or password', type: 'error' })
            }
        } catch(err){
            setToast({ message: 'Something went wrong. Try again.', type: 'error' })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Enter Email" className="inputBox" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter Password" className="inputBox" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button onClick={handleLogin} className="button" type="button" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            <p style={{color:'white', fontSize:'14px'}}>Don't have an account? <span onClick={()=>navigate('/SignUp')} style={{color:'#04fb6b', cursor:'pointer'}}>Sign Up</span></p>
            {toast && <Toast message={toast.message} type={toast.type} onClose={()=>setToast(null)} />}
        </div>
    )
}

export default Login