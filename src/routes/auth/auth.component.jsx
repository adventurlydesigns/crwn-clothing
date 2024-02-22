import Signup from '../../components/signup/signup.component';
import Signin from '../../components/signin/signin.component';
import './auth.styles.scss';

const Auth = () => {
  
  return (
    <div className='auth-container'>
      <Signin />
      <Signup />
    </div>
  )
}

export default Auth;
