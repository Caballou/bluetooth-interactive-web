import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { registerRoute } from '../utilities/axios-routes';

function Register() {
  const [userRegister, setUserRegister] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(event)
    const { username, email, password, confirmPassword } = userRegister;
    if (password != confirmPassword) {
      alert('Las contraseñas deben coincidir')
    } else {
      await axios
      .post(registerRoute, {
        username,
        email,
        password,
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          alert('Registrado con exito!');
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Algo salio mal, intente de nuevo');
      });
    }
    
  };

  return (
    <section
      id='login'
      className='flex flex-col justify-center items-center h-[100dvh]'
    >
      <div className='flex flex-col border border-white rounded-2xl justify-evenly items-center h-3/6 w-11/12 min-h-[375px] max-w-lg min-w-[300px] bg-[#222]'>
        <h1 className='text-4xl'>Crear cuenta</h1>
        <form
          className='flex flex-col w-8/12 h-4/6 justify-evenly'
          onSubmit={(event) => submitHandler(event)}
        >
          <label>Email</label>
          <input 
            type='email'
            name='email'
            required
            onChange={(e) =>
              setUserRegister({
                ...userRegister,
                [e.target.name]: e.target.value,
              })
            }
          />
          <label>Nombre completo</label>
          <input 
            type='text'
            name='username'
            required
            onChange={(e) =>
              setUserRegister({
                ...userRegister,
                [e.target.name]: e.target.value,
              })
            }
          />

          <label>Contraseña</label>
          <input 
            type='password'
            name='password'
            required
            onChange={(e) =>
              setUserRegister({
                ...userRegister,
                [e.target.name]: e.target.value,
              })
            }
          />
          <label>Repetir contraseña</label>
          <input 
            type='password'
            name='confirmPassword'
            required
            onChange={(e) =>
              setUserRegister({
                ...userRegister,
                [e.target.name]: e.target.value,
              })
            }
          />
          <div className='flex justify-evenly'>
            <button
              className='border border-white w-[120px] h-[40px] rounded-xl flex justify-center items-center mt-6'
              type='submit'
            >
              Registrarse
            </button>
          </div>
        </form>
        <div className='flex flex-wrap justify-center px-2'>
          Si ya tienes una cuenta{' '}
          <Link to='/login'>
            <span className='text-[#dadd3f] pl-1'>inicia sesión aquí</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
