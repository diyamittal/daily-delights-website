import React from "react"
import {Link, useNavigate} from "react-router-dom"
import '../style/navbar.css'

export default function Navbar(){
    const auth = localStorage.getItem('user') || ''
    const navigate = useNavigate();
    const user = auth ? JSON.parse(auth) : null
    const logout = async()=>{
        localStorage.clear();
        navigate('/SignUp')
        let result = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/products`, {
            method: "Delete"
        })
        result = await result.json()
    }
    return (
        <nav>
            {auth ? <ul className="nav-ul">
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="/Products">Products</Link></li>
                {/* <li><Link to="/Profile">Profile</Link></li> */}
                <li className="right-nav"><Link to="/Cart">Cart</Link></li>
                <li className="right-nav"><Link onClick={logout} to="/SignUp">Logout({user.name})</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/SignUp">Sign Up</Link></li>
                    <li><Link to="/Login">Login</Link></li>

            </ul>
        }
        </nav>
    )
}