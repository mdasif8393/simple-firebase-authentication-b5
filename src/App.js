import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);

function App() {

  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();


  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then((result)=>{
      setUser(result);
    })
    .catch((error) =>{
      console.log('error', error)
    })
  }

  const handleGitHubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then((result)=>{
      const user = result.user;
      setUser(user);
    })
    .catch((error) =>{
      console.log(error)
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
        user.uid ? <button onClick={handleSignOut}>Sign Out</button> : <div> <button onClick={handleGoogleSignIn}>Google Sign In</button> <button onClick={handleGitHubSignIn}>GitHub LogIn</button> </div>
      }
      <h2>Name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default App;
