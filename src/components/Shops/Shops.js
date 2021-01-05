import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import {Link} from 'react-router-dom';

import Products from '../Products/Products';
import './Shops.css'

const Shops = () => {
    // const first10=fakeData.slice(0,10)
    const [product,setProduct]=useState([])
    const [cart,setCart]=useState([])

    useEffect(() =>{
        fetch('http://mysterious-waters-58960.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProduct(data))
    },[])
    
    useEffect(() =>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        fetch('http://mysterious-waters-58960.herokuapp.com/productByKeys',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

    },[])



    const handleProduct= (product) =>{
        const toBeAdded=product.key
        const sameProduct=cart.find(pd => pd.key === toBeAdded)
        let count = 1
        let newCart
        if(sameProduct){
            count=sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others=cart.filter(pd => pd.key !== toBeAdded)
            newCart=[...others,sameProduct]
        }
        else{
            product.quantity=1
            newCart=[...cart,product]
        }
        setCart(newCart);

        addToDatabaseCart(product.key,count);
    }
    return (
        <div className='Shops-container'>
           <div className="product-container">
                    {
                        product.map(item =><Products
                            key={item.key}
                            showAddToCart={true}
                            handleProduct={handleProduct}
                             items={item}>

                             </Products>)
                    }
           </div>
           <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className='main-button'>Product Review</button>
                        </Link>
                    </Cart>
           </div>

        </div>
    );
};

export default Shops;