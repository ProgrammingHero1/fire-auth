import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email:'',
    photo: ''
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
      console.log(displayName, email, photoURL);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false, 
        name: '',
        phot:'',
        email:''
      }
      setUser(signedOutUser);
      console.log(res);
    })
    .catch( err => {

    })
  }

  const handleChange = e => {
    console.log(e.target.name, e.target.value);
  }

  const handleAuthentication = () => {

  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut} >Sign out</button> :
        <button onClick={handleSignIn} >Sign in</button>
      }
      {
        user.isSignedIn && <div>
          <p> Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      }
      <h1>Email and Password</h1>
      <input type="text" onBlur={handleChange} name="email" id="email" placeholder="Your Email"/>
      <br/>
      <input type="password" onBlur={handleChange } name="password" id="password" placeholder="Your Password"/>
      <br/>
      <button onClick={handleAuthentication}> Create New Account</button>
    </div>
  );
}

export default App;
