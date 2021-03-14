
import './App.css';
import firebase from "firebase/app";
// import * as firebase from "firebase/app"
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then (res => {
      // console.log(res)
      const {photoURL, displayName, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo:photoURL,
      }
      setUser(signedInUser);
      console.log(photoURL, displayName, email);

    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }
  const handleSignOut =() =>{
    console.log('Clicked sign outttttt')
    firebase.auth().signOut()
    .then(res =>{
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        password:'',
        photoURL: '',
      }
      setUser(signedOutUser);
      
    })
    .catch(err =>{
      console.log(err.message)
    })
  }

  const handleSubmit = () =>{
    console.log('onSubmit');
  }

  const handleBlur = (e) =>{
    debugger;
    console.log(e.target.name, e.target.value)
    let isFormValid = true;
    if(e.target.name === 'email'){
      // const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value); // tested by Regular Expression
      // console.log(isEmailValid);
     isFormValid = /\S+@\S+\.\S+/.test(e.target.value); // tested by Regular Expression
  
    }
    if(e.target.name === 'password'){
      // const isPasswordValid = e.target.value.length > 6;
      // console.log(isPasswordValid);
      isFormValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/.test(e.target.value); // 1 upper, 1 lower, 1 number
      
      // console.log(isPasswordValid && isUpLowNumPasswordValid );
    }
    if(isFormValid){
      // [...cart, newCart]
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>
        
      }
      {
        user.isSignedIn && 
        <div>
          <p>Welcome, {user.name}!</p>
          <p>email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
    
        <h1>Own Authentication</h1>
        <p>Your Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>PassWord: {user.password}</p>
        <form onSubmit={handleSubmit}>
            <input onBlur={handleBlur} type="text" name= "name" placeholder="Your Name" required></input>
            <br/>
            <input onBlur={handleBlur} type="text" name="email" placeholder="E-mail" required/>
            <br/>
            <input onBlur={handleBlur} type="password" name="password" id="" placeholder="your password" required/>
            <br/>
            <input type="submit" value="Submit"/>
        </form>
    </div>
  );
}

export default App;
