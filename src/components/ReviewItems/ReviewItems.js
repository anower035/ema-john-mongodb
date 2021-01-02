import React from 'react';

const ReviewItems = (props) => {
    console.log(props)
    const {name,quantity,key,price}=props.Items
    const reviewItemStyle={
        marginLeft:'200px',
        borderBottom:'1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
    };
    const handleProduct=props.handleProduct
    return (
        <div style={reviewItemStyle} className='review-item'>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price:$ {price}</p>
            <br/>
            <button 
                className='main-button'
                onClick={() => handleProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItems;