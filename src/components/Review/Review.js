import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyFace from '../../images/giphy.gif';
import './Review.css';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const[cart,setCart]=useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false)
    const history=useHistory()

    const handleProceedCheckout=() => {
        history.push('/shipment');
    }
    useEffect(() =>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart)


        fetch('https://mysterious-waters-58960.herokuapp.com/productByKeys',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
        // const cartProducts=productKeys.map(key =>{
        //    const product=fakeData.find(pd => pd.key === key)
        //    product.quantity=savedCart[key]
        //    return product;
        // });
        // setCart(cartProducts);
    },[])
    const handleProduct=(productKey) =>{
        // console.log('oi click korse keda?',productKey);
        const newCart=cart.filter(pd =>pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }
    let thankyou;
    if(orderPlaced)
    {
        thankyou=<img className="happy-face" src={happyFace} alt=""/>
    }
    return (
        <div className='Shops-container'>
            <div className="product-container">
                {
                    cart.map(Items => <ReviewItems Items={Items} key={Items.key} handleProduct={handleProduct}></ReviewItems>)
                }
                {thankyou}
            </div>
            <div className="cart-container">
                         <Cart cart={cart}>
                                <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
                         </Cart>
            </div>
        </div>
    );
};

export default Review;