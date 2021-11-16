import * as constants from './const.js';
import Services from './Services.js';
import sha256 from 'crypto-js/sha256';
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

function InputBox({ setAuth }) {

  const defaultInfo = () => {
    return { name: "", password: ""}
  }

  const [info, setInfo] = useState(defaultInfo());
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    Services.auth({
      user_id: info.name,
      pass: sha256(info.password).toString()
    })
        .then(r => {
          if (r.logged_in) setAuth(r)
          else {
              setError(true);
              setInfo(defaultInfo);
              console.log('failed')
          }
        })
        .catch(err => setError(true));
  }
  return (
    <div className='logContainer'>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="loginField">
          <TextField
            id='outlined-basic'
            label='Username'
            variant='standard'
            name='username'
            type='text'
            onChange={e => {
                setInfo({...info, name:e.target.value})
                setError(false);
            }}
            value={info.name}
          />
        </label>
        <br />
        <label className="loginField">
          <TextField
            id='outlinede-basic'
            label='Password'
            variant='standard'
            name="password"
            type="password"
            onChange={e => {
                setInfo({...info, password:e.target.value})
                setError(false);
            }}
            value={info.password}
          />
        </label>
        <br />
        <button>Login</button>
        <div>{error === true && <p>Incorrect Credentials. Not Logged In.</p>}</div>

      </form>
      <div>
      </div>
    </div>
  )
}

export default InputBox;
