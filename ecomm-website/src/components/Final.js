import React, { useEffect, useState } from "react"
import Confetti from "react-confetti"

export default function Final(){
    const [order, setOrder] = useState(null)

    useEffect(()=>{
        const lastOrder = JSON.parse(localStorage.getItem('lastOrder'))
        if(lastOrder) setOrder(lastOrder)
        localStorage.removeItem('cart')
        window.dispatchEvent(new Event('storage'))
    }, [])

    return(
        <div style={{ color: 'white', padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <Confetti />
            <h1 className="Final-text">Thank You For Shopping !!</h1>
            {order && (
                <div style={{ marginTop: '30px' }}>
                    <h3>Order Summary</h3>
                    <p>Payment: {order.paymentMethod}</p>
                    {order.items.map((item, i) => (
                        <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #444' }}>
                            <span>{item.title} x {item.quantity}</span>
                            <span>Rs {item.price * item.quantity}</span>
                        </div>
                    ))}
                    <h3 style={{ textAlign:'right', marginTop:'16px' }}>Total: Rs {order.totalAmount}</h3>
                </div>
            )}
        </div>
    )
}