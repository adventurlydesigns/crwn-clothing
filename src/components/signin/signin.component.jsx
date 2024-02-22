import React, {useState} from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './signin.styles.scss';
import Button from '../button/button.component';

const Signin = () => {
    const defaultFormFields = {
        email: '',
        password: '',
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (err) {
            switch(err.code) {
                case 'auth/invalid-credential':
                    alert('Email and/or password are incorrect');
                    break;
                case 'auth/user-not-found':
                    alert('User not found');
                    break;
            }
        }
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

  return (
    <div className="signup-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput label={'Email'} type="text" required onChange={handleOnChange} name="email" value={email} />
        <FormInput label={'Password'} type="password" required onChange={handleOnChange} name="password" value={password} />
        <div className="buttons-container">
            <Button type="submit">Sign In</Button> 
            <Button type="button" onClick={signInWithGoogle} buttonType="google">Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default Signin;
