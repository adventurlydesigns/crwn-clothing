import React, {useState, useContext} from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './signup.styles.scss';
import Button from '../button/button.component';

const Signup = () => {
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
          alert("passwords do not match");
          return;
        }
    
        try {
          const { user } = await createAuthUserWithEmailAndPassword(
            email,
            password
          );
          
          await createUserDocumentFromAuth(user, { displayName });
          resetFormFields();
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            alert("Cannot create user, email already in use");
          } else {
            console.log("user creation encountered an error", error);
          }
        }
      };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

  return (
    <div className="signup-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput label={'Display Name'} type="text" required onChange={handleOnChange} name="displayName" value={displayName} />
        <FormInput label={'Email'} type="text" required onChange={handleOnChange} name="email" value={email} />
        <FormInput label={'Password'} type="text" required onChange={handleOnChange} name="password" value={password} />
        <FormInput label={'Confirm Password'} type="text" required onChange={handleOnChange} name="confirmPassword" value={confirmPassword} />
        <Button type="submit">Register</Button>
      </form>
    </div>
  )
}

export default Signup
