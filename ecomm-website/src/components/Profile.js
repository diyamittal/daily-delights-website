import React, { useEffect, useState } from "react"
import '../style/profile.css'

export default function Profile(){
    const user = JSON.parse(localStorage.getItem('user'))
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchOrders = async()=>{
            try {
                let result = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/orders/${user._id}`)
                result = await result.json()
                setOrders(Array.isArray(result) ? result : [])
            } catch(err){
                setOrders([])
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    return (
        <div className="profile">
            <div className="profile-details">
                <h2>My Profile</h2>
                <p><span>Name:</span> {user.name}</p>
                <p><span>Email:</span> {user.email}</p>
                <p><span>Phone:</span> {user.phone}</p>
            </div>
            <div className="profile-orders">
                <h2>Order History</h2>
                {loading ? (
                    <div className="empty-state"><p>Loading orders...</p></div>
                ) : orders.length === 0 ? (
                    <div className="empty-state">
                        <p>🛍️ No orders yet.</p>
                        <p>Start shopping to see your orders here!</p>
                    </div>
                ) :
                    orders.map((order, i) => (
                        <div key={i} className="order-card">
                            <div className="order-header">
                                <span>Order #{i + 1}</span>
                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                <span>{order.paymentMethod}</span>
                                <span className={`order-status status-${order.status?.toLowerCase()}`}>{order.status || 'Placed'}</span>
                            </div>
                            {order.items.map((item, j) => (
                                <div key={j} className="order-item">
                                    <span>{item.title} x {item.quantity}</span>
                                    <span>Rs {item.price * item.quantity}</span>
                                </div>
                            ))}
                            <div className="order-total">Total: Rs {order.totalAmount}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
