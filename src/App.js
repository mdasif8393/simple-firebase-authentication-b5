import './App.css';
import app from './firebase.init';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);

function App() {

  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, provider)
    .then((result)=>{
      const user = result.user;
      setUser(user);
    })
    .catch((error) =>{
      console.log('error', error)
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(()=>{
      setUser({});
    })
    .catch((error)=>{

    })
  }
  
  return (
    <div className="App">
      {
        user.email ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleGoogleSignIn}>Google Sign In</button>
      }
      <h2>Name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default App;
