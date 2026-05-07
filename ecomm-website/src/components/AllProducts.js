import React, {useEffect, useState} from "react"
import Quantity from './Quantity'
import '../style/products.css'

export default function AllProducts({selectedCategory, filteredProducts}){
    const [cart, setCart] = useState([])
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        if(existingCart){
            setCart(existingCart);
        }
    }, []);

    const addToCart = async(product) => {
        const updatedCart = [...cart];
        
        const existingItemIndex = cart.findIndex(item=>item.id === product.id);
        if(existingItemIndex!==-1){
            updatedCart[existingItemIndex].quantity++;
        }
        else{
            updatedCart.push({...product, quantity: 1})
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        if(user){
            //const token = localStorage.getItem('token')
            //console.log(token)
            try{
                let result = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/add-product`,{
                    method: 'post',
                    body: JSON.stringify({id: product.id, image: product.image, title: product.title, category: product.category, userId: user.id, price: product.price}),
                    headers:{
                        "Content-Type":"application/json",
                    }
                });
                // let result2 = await fetch('http://localhost:5000/update-quantity', {
                //     method: 'PUT',
                //     headers:{
                //         "Content-Type":"application/json",
                //         authorization: `Bearer ${token}`
                //     },
                //     body: JSON.stringify({productId: product._id, quantity: updatedCart[existingItemIndex]?.quantity || 1})
                // })
                result = await result.json();
                // result2 = await result2.json();
                console.log(result);
                // console.log(result2);
            }
            catch(error){
                console.error("Error updating product quantity:", error)
            }
        }
    }
    const addInCart = async(product) => {
        const updatedCart = [...cart];
        const existingItemIndex = cart.findIndex(item=>item.id === product.id);
        if(existingItemIndex!==-1){
            updatedCart[existingItemIndex].quantity++;
        }
        else{
            updatedCart.push({...product, quantity: 1})
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

    }

    const removeFromCart = (productId)=>{
        const updatedCart=cart.map(item=>{
            if(item.id===productId && item.quantity>0){
                return {...item, quantity: item.quantity-1}
            }
            return item
        })
        setCart(updatedCart.filter(item=>item.quantity>0));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    
    const isInCart = (productId)=>{
        return cart.some((item)=> item.id===productId)
    }

    return (
        <section className="all-products">
            <h1 className="selected-category">{selectedCategory ? `${selectedCategory} Products` : 'Products'}</h1>
            <div className="product-list-horizontal">
                {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product, index)=>{
                    const productId=product.id;
                    const isProductInCart = isInCart(productId)
                    const cartProduct = cart.find(item => item.id === productId);
                    const quantity = cartProduct ? cartProduct.quantity : 0;

                    return(
                        <div key={index} className="product-box">
                            <img src={product.image} alt={product.title} className="selected-image"></img>
                            <h3 className="title">{product.title}</h3>
                            <p className="price1">{product.price}</p>
                            {isProductInCart ? (<Quantity quantity={quantity} onAddToCart={()=> addInCart(product)} onRemoveFromCart={()=> removeFromCart(productId)}/>
                            ): (<button className='AddtoCart' onClick={()=>addToCart(product)}>ADD TO CART</button>
                            )}
                        </div>
                    );
                })
            ):(
                <p>No products found</p>
            )}
            </div>
        </section>
    )
}