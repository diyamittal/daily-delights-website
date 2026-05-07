import React, {useEffect, useState} from "react"
import '../style/cart.css'
import {Link, useNavigate} from "react-router-dom"
import Quantity from './Quantity'

export default function Cart(){
    const [products, setProducts] = useState([])

    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(()=>{
        getProducts();
    }, [])

    const getProducts = async()=>{
        try{
            const existingCart = JSON.parse(localStorage.getItem("cart"));
            if(existingCart){
                //const token = localStorage.getItem('token')
                //if(token){
                    let response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/products`,
                    //headers:{
                       // authorization: `Bearer ${token}`
                    //}
                )
                if(!response.ok){
                    throw new Error('Network response was not ok')
                }
                const products = await response.json();
                setProducts(existingCart);
            }
            //else{
            //    console.log("Token not found")
            //}
        }catch(error){
            console.error('Error', error);
        }
    }

    const saveProducts = (updatedProducts)=>{
        setProducts(updatedProducts);
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
    }

    const navigate = useNavigate();

    const AddLocation =()=>{
        navigate('/location')
    }

    const handleAddtocart = (index)=>{
        const updatedProducts=[...products];
        updatedProducts[index].quantity++;
        saveProducts(updatedProducts);
    }
    const handleRemovefromcart = async(index)=>{
        const updatedProducts=[...products];
        //const token = localStorage.getItem('token')

        //if(!token){
          //  console.error("Token not found")
            //return;
        //}
        try {
            
            if (updatedProducts[index].quantity <= 1) {
                const productId = updatedProducts[index].id;
                const response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/products/${productId}`, {
                    method: "DELETE",
                    headers:{
                        "Content-Type":"application/json",
                        //authorization: `Bearer ${token}`
                    }
                });
            }
        } catch (error) {
            console.error("Error removing product from database:", error);
        }
    
        
        if (updatedProducts[index].quantity > 1) {
            updatedProducts[index].quantity--;
        } 
        else {
            
            updatedProducts.splice(index, 1);
        }
    
        saveProducts(updatedProducts);
    }
    
    const calculateTotalPrice = () =>{

        return products.reduce((total, product)=> total+product.price*product.quantity, 0);
    }

    useEffect(()=>{
        const totalPrice=calculateTotalPrice();
        setTotalAmount(totalPrice)
    }, [products])

    return (
        <div className="cart">
            <h3 className="Cart-name">Shopping Cart</h3>
            {products.length>0 ? products.map((item, index)=>
                <div key={item._id} className="cart-items">
                    <div>
                        <img src={item.image} alt={item.title} className="cart-image"></img>
                    </div>
                    <div className="item-details">
                        <div>{item.title}</div>
                        <div>Rs {item.price}</div>
                    </div>
                    <div>
                        <h3 className="cross">X</h3>
                    </div>
                    <div>
                        <div className="item-quantity">
                        {item.quantity}
                        </div>
                    </div>
                    <div className="item-quantity">=</div>
                    <div className="price">
                        <div className="currency">Rs</div>
                        <div className="item-quantity">{item.price*item.quantity}</div>
                    </div>
                    <div>
                        <Quantity quantity={item.quantity} onAddToCart={()=>handleAddtocart(index)} onRemoveFromCart={()=>handleRemovefromcart(index)}></Quantity>
                    </div>
                </div>): <h1>No item in cart</h1>}
                <div className="total-amount">
                    <h3 className="amount">Total Amount: Rs {calculateTotalPrice()}</h3>
                </div>
            <button className="cart-button" ><Link onClick={AddLocation} to="/location" className="location">Add Location</Link></button>
        </div>
    )
}