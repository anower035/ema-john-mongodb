import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


 

function Login() {
  const [newUser,setNewUser]=useState(false);
  const [user,setUser]=useState({
    isSignIn: false,
    name:'',
    email:'',
    password:'',
    photo:'',
  })
  
  initializeLoginFramework();

  const [loggedInUser,setLoggedInUser]=useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then (res =>{
     handleResponse(res,true)
    })
  }

  const signOut = () =>{
    handleSignOut()
    .then (res =>{
      handleResponse(res,false)
    })
  }
  
  const fbSignIn = () => {
    handleFbSignIn()
    .then (res =>{
      handleResponse(res, true)
    })
  }
  


  const handleResponse = (res,redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }
   


    const handleBlur=(e)=>{
      let isFieldValid=true;
      if(e.target.name === "email"){
        isFieldValid=/\S+@\S+\.\S+/.test(e.target.value);
      }
      if(e.target.name === 'password'){
        const isPasswordValid=e.target.value.length > 6
        const passwordCheck=/\d{1}/.test(e.target.value)
        isFieldValid=isPasswordValid && passwordCheck
      }
      if(isFieldValid){
        const newUserInfo={...user}
        newUserInfo[e.target.name]=e.target.value
        setUser(newUserInfo)
      }
    }
    const handleSubmit=(e) =>{
      // console.log(user.email, user.password)
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then (res =>{
        handleResponse(res,true)
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(res => {
        handleResponse(res,true)
      })
    }
      e.preventDefault()
    }

  return (
    <div style={{textAlign:'center'}}>
      {
          user.isSignIn ? <button onClick={signOut}>Sign out</button>
                        : <button onClick={googleSignIn}>Sign in</button>
      }
      <br/>
      <button onClick={fbSignIn}>loggedIn with Facebook</button>
        {
          user.isSignIn && <div>
                            <h1>WelCome {user.name}</h1>
                            <p>Email: {user.email}</p>
                            <img src={user.photo} alt=""/>
                          </div>
        }
        <h1>Our Own Authentication</h1>
            {/* <p>Name:{user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p> */}
           <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id=""/>
           <label htmlFor="newUser">New User SignUp</label>
        <form onSubmit={handleSubmit}>
          {newUser && <input type="text" name="name" onBlur={handleBlur} id="" placeholder="Your name here"/>}<br/>
          <input type="text" name='email' onBlur={handleBlur} placeholder="Your E-mali here" required/><br/>
          <input type="password" name='password' onBlur={handleBlur} placeholder='Your password here' required/><br/>
          <input type="submit" value={newUser ? 'SignUp' : 'SignIn'}/>
        </form>
          <p style={{color:'red'}}>{user.error}</p>
          {user.success && <p style={{color:'green'}}>User {newUser ? 'Created' : 'logged In'} successfully</p>}
    </div>
  );
}

export default Login;
