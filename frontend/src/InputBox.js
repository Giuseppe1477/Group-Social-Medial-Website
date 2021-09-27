import * as consants from './const.js';
import sha256 from 'crypto-js/sha256';
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import './App.css';

function InputBox({ getOutput }) {
  const [info, setInfo] = useState({ name: "", password: ""})

  const handleSubmit=e=>{
    e.preventDefault();

    console.log(`You are submitting ${info.name} - ${info.password} - HASH:${sha256(info.password)}`);
    fetch(consants.BASE_URL + 'auth',{
      method: 'POST',
      mode: 'cors',
      cache: 'force-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        user: info.password,
        pass: sha256(info.password).toString()
      })
    })
    .then(res  => res.json())
    .then(res => res.body)
    .then(data => {
      getOutput(data);
      console.log(data);
    })
    .catch(err => console.error(err));
  }

  return (
    <div className='former'>
      <form onSubmit={handleSubmit}>
        <label>
          <TextField
            id='outlined-basic'
            label='Username'
            variant='standard'
            name='username'
            type='text'
            onChange={e=>setInfo({...info, name:e.target.value})}
            value={info.name}
          />
        </label>
        <br />
        <label>
          <TextField
            id='outlinede-basic'
            label='Password'
            variant='standard'
            name="password"
            type="password"
            onChange={e=>setInfo({...info, password:e.target.value})}
            value={info.password}
          />
        </label>
        <br />
        <button>Login</button>
      </form>
    </div>
  )
}

export default InputBox;