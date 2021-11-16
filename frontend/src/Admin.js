import Services from './Services.js'
import sha256 from 'crypto-js/sha256';
import React, { useState } from "react";
import { TextField, Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const Admin = () => {

    const defaultInfo = () => {
        return {
          user_id: "", password: "", bio: "", img_url: "", is_admin: false, song_url: "",
        }
    }

    const [info, setInfo] = useState(defaultInfo())
    const [error, setError] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();

        const pHidden = sha256(info.password).toString();

        Services.create_user({
            user_id: info.user_id,
            pass: pHidden,
            bio: info.bio,
            img_url: info.img_url,
            is_admin: info.is_admin,
            song_url: info.song_url,
        })
            .then(r => r)
            .then(r => {
                if (r.pass) {
                    setError(false);
                }
            })
            .then(() => setInfo(defaultInfo()))
            .catch(err => setError(true));
      }

    return (
        <div className='createContainer'>
            <form className="createForm">
                <h3>Create a user.</h3>
                <label className="createField">
                  <TextField
                      id='outlined-basic1'
                      label='Username'
                      variant='standard'
                      required={true}
                      name='username'
                      type='text'
                      onChange={e => {
                        setInfo({...info, user_id: e.target.value});
                        setError(null);
                      }}
                      value={info.user_id}
                  />
                </label>
                <br />
                <label className="createField">
                  <TextField
                      id='outlinede-basic2'
                      label='Password'
                      variant='standard'
                      required={true}
                      name="password"
                      type="password"
                      onChange={e => {
                        setInfo({...info, password: e.target.value});
                        setError(null);
                      }}
                      value={info.password}
                  />
                </label>
                <br/>
                <label className="createField">
                  <TextField
                      id='outlined-basic3'
                      label='Bio'
                      variant='standard'
                      name='bio'
                      type='text'
                      onChange={e => {
                        setInfo({...info, bio: e.target.value});
                        setError(null);
                      }}
                      value={info.bio}
                  />
                </label>
                <br />
                <label className="createField">
                  <TextField
                      id='outlined-basic4'
                      label='Img URL'
                      variant='standard'
                      name='img'
                      type='text'
                      onChange={e => {
                        setInfo({...info, img_url: e.target.value})
                        setError(null);
                      }}
                      value={info.img_url}
                  />
                </label>
                <br />
                <label className="createField">
                  <TextField
                      id='outlined-basic4'
                      label='Song'
                      variant='standard'
                      name='song'
                      type='text'
                      onChange={e => {
                        setInfo({...info, song_url: e.target.value})
                        setError(null);
                      }}
                      value={info.song_url}
                  />
                </label>
                <br />
                <label className="createField">
                  <TextField
                      id='outlined-basic5'
                      label='Song URL'
                      variant='standard'
                      name='song'
                      type='text'
                      onChange={e=>setInfo({...info, img:e.target.value})}
                      value={info.song}
                  />
                </label>
                <br />
                <div className="createCheckbox">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox
                            checked={info.admin}
                            onChange={e => {
                              setInfo({...info, is_admin: e.target.checked});
                              setError(null);
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />} label="Admin" />
                    </FormGroup>
                </div>
                <div className="createButton">
                    <Button size="small" onClick={handleSubmit}>Submit</Button>
                </div>
            </form>
            <div>
                {
                  error === true ?
                    <p className="loginError">Invalid.</p>
                  : (error === false ?
                    <p>User {info.user_id} Created</p>: null)
                }
            </div>
        </div>
    );
}

export default Admin;
