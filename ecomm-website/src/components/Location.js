import React,{useEffect, useState} from "react"
import '../style/cart.css'
import {Link, useNavigate} from "react-router-dom"
import '../style/location.css'

export default function Location(){
    const [products, setProducts] = useState([])
    const [house, setHouse]= React.useState('');
    const [Street, setStreet]= React.useState('');
    const [Landmark, setLandmark]= React.useState('');
    const [City, setCity]= React.useState('');
    const [State, setState]=React.useState('')
    const [totalAmount, setTotalAmount] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');

    useEffect(()=>{
        const existingCart = JSON.parse(localStorage.getItem("cart"))
        if(existingCart){
            setProducts(existingCart)
        }
    }, [])

    const navigate = useNavigate();

    const calculateTotalPrice = () =>{

        return products.reduce((total, product)=> total+product.price*product.quantity, 0);
    }

    useEffect(()=>{
        const totalPrice=calculateTotalPrice();
        setTotalAmount(totalPrice)
    }, [products])

    const addLocation = async() => {
        if (submitting) return;

        if (!house || !Street || !City || !State) {
            alert("Please fill in all required fields.");
            return;
        }

        setSubmitting(true);

        const userId = JSON.parse(localStorage.getItem('user'))
        const totalAmount = calculateTotalPrice()

        let result = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/add-location`,{
            method: 'post',
            body: JSON.stringify({house, Street, Landmark, City, State, userId}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result = await result.json();
        console.log(result);

        if (result.status === 'error') {
            setFormSubmitted(false);
            setSubmitting(false);
            return;
        }

        setFormSubmitted(true);
    }

    useEffect(() => {
        if (formSubmitted) {
            navigate('/final');
        }
    }, [formSubmitted, navigate]);

    return(
        <div className="confirm">
            <h1 className="location-heading">Add Location</h1>
            <input type="text" placeholder="Enter House Number" className="inputBox1" value={house} onChange={(e)=>{setHouse(e.target.value)}} required></input>
            <input type="text" placeholder="Enter Street" className="inputBox1" value={Street} onChange={(e)=>{setStreet(e.target.value)}} required></input>
            <input type="text" placeholder="Enter Landmark(Optional)" className="inputBox1" value={Landmark} onChange={(e)=>{setLandmark(e.target.value)}} required></input>
            <input type="text" placeholder="Enter City" className="inputBox1" value={City} onChange={(e)=>{setCity(e.target.value)}} required></input>
            <input type="text" placeholder="Enter State" className="inputBox1" value={State} onChange={(e)=>{setState(e.target.value)}} required></input>
            <p className="total-price">Total Price: Rs {calculateTotalPrice()}</p>
            <div>
                <label htmlFor="payment" className="payment">Select Payment Method:</label>
                <select id="payment" name="payment" className="paymentM" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="CashOnDelivery">Cash On Delivery</option>
                    <option value="UPI">UPI</option>
                </select>
            </div>
            <button type="button" className="confirm-button" onClick={addLocation} disabled={submitting}>
                {paymentMethod === 'UPI' ? 'PAY' : 'Confirm Order'}
                {submitting ? 'Submitting...' : ''}
            </button>
        </div>
    )
}