import React, { useEffect, useState } from "react"
import Confetti from "react-confetti"

const steps = ['Placed', 'Confirmed', 'Delivered']

export default function Final(){
    const [order, setOrder] = useState(null)
    const [status, setStatus] = useState('Placed')
    const [orderId, setOrderId] = useState(null)

    useEffect(()=>{
        const lastOrder = JSON.parse(localStorage.getItem('lastOrder'))
        if(lastOrder){
            setOrder(lastOrder)
            setOrderId(lastOrder._id)
        }
        localStorage.removeItem('cart')
        window.dispatchEvent(new Event('storage'))
    }, [])

    useEffect(()=>{
        if(!orderId) return
        const interval = setInterval(async()=>{
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/order/${orderId}`)
                const data = await res.json()
                if(data.status) setStatus(data.status)
                if(data.status === 'Delivered') clearInterval(interval)
            } catch(err){}
        }, 15000)
        return () => clearInterval(interval)
    }, [orderId])

    return(
        <div style={{ color: 'white', padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <Confetti />
            <h1 className="Final-text">Thank You For Shopping !!</h1>

            <div style={{ display:'flex', justifyContent:'space-between', margin:'30px 0' }}>
                {steps.map((step, i) => (
                    <div key={i} style={{ textAlign:'center', flex:1 }}>
                        <div style={{
                            width:'36px', height:'36px', borderRadius:'50%', margin:'0 auto 8px',
                            background: steps.indexOf(status) >= i ? '#04fb6b' : '#444',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            color: steps.indexOf(status) >= i ? '#000' : '#fff',
                            fontWeight:'bold'
                        }}>{i+1}</div>
                        <span style={{ fontSize:'13px', color: steps.indexOf(status) >= i ? '#04fb6b' : '#888' }}>{step}</span>
                    </div>
                ))}
            </div>

            {order && (
                <div style={{ marginTop: '10px' }}>
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