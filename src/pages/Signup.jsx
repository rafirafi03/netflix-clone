import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UserAuth  from '../context/AuthContext';

const Signup = () => {

  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  const {user, signUp} = UserAuth();
  const navigate = useNavigate();

  useEffect(()=> {
    if(user) {
      navigate('/')
    }
  },[])

  const handleFormSubmit = async (e)=> {
    e.preventDefault()

    try {

      setEmailError('');
      setPassError('');

    let valid = true;

    if (email.trim() === '') {
      setEmailError('Enter email !!');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email format is invalid');
      valid = false;
    }

    if (password.trim() === '') {
      setPassError('Enter password');
      valid = false;
    } else if (password.length < 6) {
      setPassError('Minimum 6 characters required');
      valid = false;
    }

    if (!valid) return;
    
      await signUp(email, password)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='w-full h-screen'>
        <img
        className='sm:block absolute w-full h-full object-cover'
         src="https://assets.nflxext.com/ffe/siteui/vlv3/dd4dfce3-1a39-4b1a-8e19-b7242da17e68/86742114-c001-4800-a127-c9c89ca7bbe4/IN-en-20240527-popsignuptwoweeks-perspective_alpha_website_small.jpg"
         alt="///" 
        />

        <div className='bg-black/70 fixed top-0 left-0 w-full h-screen'/>

        <div className='fixed w-full px-4 py-24 z-20'>
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/40 rounded-lg'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-nsans-bold'>Sign Up</h1>

              <form onSubmit={handleFormSubmit} className='w-full flex flex-col py-4'>

                <input
                 className='p-3 my-2 bg-gray-700 rounded' 
                 type="email" 
                 placeholder='email' 
                 autoComplete='email' 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                />

                <p className='text-danger'>{emailError}</p>

                <input
                 className='p-3 my-2 bg-gray-700 rounded' 
                 type="password" 
                 placeholder='password' 
                 autoComplete='current-password'
                 value={password}
                 onChange={(e) => setPassword(e.target.value)} 
                />

                <p className='text-danger'>{passError}</p>

                <button className='bg-red-600 py-3 my-3 rounded font-nsans-bold'>
                  Sign Up
                </button>

                <div className='flex justify-between items-center text-gray-600'>
                  <p>
                    <input
                     type="checkbox"
                     className='mr-2'
                     checked={rememberLogin}
                     onChange={(e)=> setRememberLogin(!rememberLogin)}
                     />
                    Remember me
                  </p>
                  <p>
                    Need help?
                  </p>
                </div>

                <p className='my-4'>
                  <span className='text-gray-600 mr-2'>Already subscribed to Netflix?</span>
                  <Link to='/login'>Sign In</Link>
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Signup

