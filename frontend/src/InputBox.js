
import * as consants from './const.js';

import React, { Component } from "react";
import TextField from "@mui/material/TextField";

import './App.css';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(`You are submitting ${this.state.username} - ${this.state.password}`);
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
        user: this.state.username,
        pass: this.state.password,
      })
    })
    .then(res  => res.json())
    .then(res => res.body)
    .then(data => {
      console.log(data);
      if (data.logged_in) {
        this.props.login();
      } else {
        return
      }
      if (data.admin) {
        this.props.setAdmin();
      }
    })
    .catch(err => console.error(err));
  }

  render () {
    return (
      <div className='former'>
        <form onSubmit={this.handleSubmit}>
          <label>
            <TextField
                id='outlined-basic'
                label='Username'
                variant='standard'
                name='username'
                type='text'
                onChange={this.handleChange}
            />
          </label>
          <br/>
          <label>
            <TextField
                id='outlinede-basic'
                label='Password'
                variant='standard'
                name="password"
                type="text"
                onChange={this.handleChange}
            />
          </label>
          <br/>
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default InputBox