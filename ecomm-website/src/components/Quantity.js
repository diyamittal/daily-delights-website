import React from "react"
import '../style/products.css'
import '../style/Home.css'

export default function Quantity({quantity, onAddToCart, onRemoveFromCart}){

    const add=()=>{
        onAddToCart();
    }

    const sub=()=>{
            onRemoveFromCart();
    }

    return (
        <div className="counter">
            <button className="counter-change" onClick={sub}>-</button>
            <div className="counter-change1">
                <h1 className="counting">{quantity}</h1>
            </div>
            <button className="counter-change" onClick={add}>+</button>
        </div>
    )
}