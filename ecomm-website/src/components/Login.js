import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom";
import '../style/login.css'

const Login = ()=>{
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate= useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }, [navigate])

    const handleLogin= async()=>{
        console.log("email, password", email, password);
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
        console.log(result);
        if(result){
            localStorage.setItem("user", JSON.stringify(result));
            //localStorage.setItem("token", result.auth)
            navigate('/')
        }
        else{
            alert("please enter correct details")
        }
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Enter Email" className="inputBox" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter Password" className="inputBox" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button onClick={handleLogin} className="button" type="button">Login</button>
        </div>
    )
}

export default Login