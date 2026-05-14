import React, { useState, useEffect } from "react"
import {Link, useNavigate} from "react-router-dom"
import '../style/navbar.css'

export default function Navbar(){
    const [auth, setAuth] = useState(localStorage.getItem('user') || '')
    const navigate = useNavigate();
    const user = auth ? JSON.parse(auth) : null
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

    useEffect(()=>{
        const handleStorage = () => setAuth(localStorage.getItem('user') || '')
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])

    const logout = ()=>{
        localStorage.clear();
        setAuth('')
        navigate('/SignUp')
    }
    return (
        <nav>
            {auth ? <ul className="nav-ul">
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="/Products">Products</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                {user?.isAdmin && <li><Link to="/admin">Admin</Link></li>}
                <li className="right-nav"><Link to="/Cart">Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</Link></li>
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