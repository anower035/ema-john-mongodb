import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const onSubmit = data => {
        const savedCart=getDatabaseCart();
        const orderDetails ={...loggedInUser,products: savedCart,shipment:data,orderTime:new Date()};

      fetch('https://mysterious-waters-58960.herokuapp.com/addOrder',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          processOrder()
          alert('your ordered place successfully')
        }
      })
      };


  console.log(watch("example"));    

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='Your Name here'/>
      {errors.name && <span className='error'>Name is required</span>}
      
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email here'/>
      {errors.email && <span className='error'>Email is required</span>}
      
      <input name="address" ref={register({ required: true })} placeholder='Your Address here'/>
      {errors.address && <span className='error'>Address is required</span>}
      
      <input name="phone" ref={register({ required: true })} placeholder='Your Phone Number here'/>
      {errors.phone && <span className='error'>Phone is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;