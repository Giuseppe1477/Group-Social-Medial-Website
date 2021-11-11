import * as constants from './const.js';
import sha256 from 'crypto-js/sha256';
import React, { useState } from "react";
import { TextField, Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const Admin = () => {
    const [info, setInfo] = useState({ name: "", password: "", bio: "", img:"", admin: true})
    const [error, setError] = useState(null);

    const handleSubmit=e=>{
        e.preventDefault();
    
        console.log(`You are submitting ${info.name} - ${info.password} - admin: ${info.admin} - HASH:${sha256(info.password)}`);
        fetch(constants.BASE_URL + 'create_user',{
          method: 'POST',
          mode: 'cors',
          cache: 'force-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            user_id: info.name,
            pass: sha256(info.password).toString(),
            is_admin: info.admin
          })
        })
        .then(res => {
          if(!res.ok)
            throw Error("Error");
          return res;
        })
        .then(res  => res.json())
        .then(res => res.body)
        .then(data => {
          console.log(data);
        })
        .catch((err) => {
          setError(true);
        });
      }

    return ( 
        <div className='createContainer'>
            <form className="createForm">
                <h3>Create a user.</h3>
                <label className="createField">
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
                <label className="createField">
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
                <br/>
                <label className="createField">
                  <TextField
                      id='outlined-basic'
                      label='Bio'
                      variant='standard'
                      name='bio'
                      type='text'
                      onChange={e=>setInfo({...info, bio:e.target.value})}
                      value={info.bio}
                  />
                </label>
                <br />
                <label className="createField">
                  <TextField
                      id='outlined-basic'
                      label='Img'
                      variant='standard'
                      name='img'
                      type='text'
                      onChange={e=>setInfo({...info, img:e.target.value})}
                      value={info.img}
                  />
                </label>
                <br />
                <div className="createCheckbox">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox
                            checked={info.admin}
                            onChange={e=>setInfo({...info, admin:e.target.checked})}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />} label="Admin" />
                    </FormGroup>
                </div>
                <div className="createButton">
                    <Button size="small" onClick={handleSubmit}>Submit</Button>
                </div>            
            </form>
            <div>
                {error && (<p className="loginError">Invalid.</p>)}   
            </div>
        </div>
    );
}
 
export default Admin;