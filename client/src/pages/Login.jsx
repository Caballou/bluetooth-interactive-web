import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { loginRoute } from '../utilities/axios-routes';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import decodeJwt from '../utilities/decodeJwt';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = user;
    // console.log(email, password);
    await axios
      .post(loginRoute, {
        email,
        password,
      })
      .then(async (res) => {
        // console.log(res)
        if (res.status === 200) {
          // console.log('LOGIN DATA', res.data);
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Usuario o contraseña incorrectos');
      });
  };

  const handleSuccess = (res) => {
    // console.log(res);
    if (res.credential) {
      const { payload } = decodeJwt(res.credential);
      // console.log(payload);
      const data = {
        email: payload.email,
        username: payload.name,
        token: res.credential,
      };
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    }
  };

  return (
    <section
      id='login'
      className='flex flex-col justify-center items-center h-[100dvh]'
    >
      <div className='flex flex-col border border-white rounded-2xl justify-evenly items-center h-3/6 w-11/12 min-h-[375px] max-w-lg min-w-[300px] bg-[#222]'>
        <h1 className='text-4xl'>Bienvenido</h1>
        <form
          className='flex flex-col w-8/12 justify-evenly'
          onSubmit={(event) => submitHandler(event)}
        >
          <label>Email</label>
          <input 
            type='email'
            // placeholder='Email'
            name='email'
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
          <label>Contraseña</label>
          <input 
            type='password'
            // placeholder='Contraseña'
            name='password'
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
          <div className='flex justify-center'>
            <button
              type='submit'
              className='border border-white w-[120px] h-[40px] rounded-xl flex justify-center items-center mt-6'
            >
              Ingresar
            </button>
          </div>
        </form>
        <div className='flex flex-wrap justify-center px-2'>
          Si todavía no estás registrado haz{' '}
          <Link to='/register'>
            <span className='text-[#dadd3f] pl-1'>click aquí</span>
          </Link>
        </div>
        <hr className='w-10/12' />
        <label>O puedes iniciar sesión con Google:</label>
        <div className='flex'>
          <GoogleOAuthProvider
            clientId={
              '260626386164-gcth9v15dekrq55t3tc3a0n403gsujss.apps.googleusercontent.com'
            }
          >
            <GoogleLogin useOneTap onSuccess={handleSuccess} />
          </GoogleOAuthProvider>
        </div>
      </div>
    </section>
  );
};

export default Login;
