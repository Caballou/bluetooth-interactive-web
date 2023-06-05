import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const handleBluetooth = () => {
    navigator.bluetooth
      .requestDevice({ acceptAllDevices: true, optionalServices: ['battery_service']})
      .then((device) => device.gatt.connect())
      .then(server => {return server.getPrimaryService('battery_service')})
      .then(service => {return service.getCharacteristic('battery_level')})
      .then(charac => {return charac.readValue()})
      .then(value => console.log(`El porcentaje de batería es ${value.getUint8(0)}`))
      .catch(error => { console.log(error)})
    
      console.log(server.g)
  };

  return (
    <>
      {user ? (
        <section
          id='home'
          className='flex flex-col justify-center items-center h-[100dvh]'
        >
          <div className='flex flex-col border border-white rounded-2xl justify-evenly items-center h-5/6 w-11/12 max-w-4xl min-w-[300px] bg-[#222]'>
            <label>Bienvenido/a {user.username}!</label>
            <button
              className='border w-40 h-fit rounded-lg'
              onClick={handleBluetooth}
            >
              Conectar dispositivo Bluetooth
            </button>
            <button
              className='border border-white w-[120px] h-[40px] rounded-xl flex justify-center items-center mt-6'
              onClick={logoutHandler}
            >
              Cerrar Sessión
            </button>
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default Home;
