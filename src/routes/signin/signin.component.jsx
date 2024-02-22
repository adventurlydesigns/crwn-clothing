import React from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Signup from '../../components/signup/signup.component';

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }
  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      <Signup />
    </div>
  )
}

export default SignIn
