import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../Products/Products';
import'./ProductDetails.css';


const ProductDetails = () => {
    const{productKey}=useParams();
    const [product,setProduct]=useState({})

    useEffect(() => {
        fetch('http://localhost:5000/product/'+productKey)
        .then(res => res.json())
        .then(data =>setProduct(data))
    },[productKey])
    // const item=fakeData.find(pd => pd.key === productKey)
    return (
        <div className='ProductDetails'>
            <h1>Your Product Details</h1>
            <Products items={product} showAddToCart={false}></Products>
        </div>
    );
};

export default ProductDetails;