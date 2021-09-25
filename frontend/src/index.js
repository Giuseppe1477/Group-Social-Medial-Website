import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loggedIn: false,
      username: "",
      password: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]:value});
  }

  handleSubmit (event) {
    event.preventDefault();
    alert("You are submitting " + this.state.username + " " + this.state.password);
    fetch('https://4hduy444e6.execute-api.us-east-1.amazonaws.com/auth',{
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
    .then(response=>response.json())
    .then(data=>console.log(data));
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input name="username" type="text" onChange={this.handleChange}/>
        </label>
        <br/>
        <label>
          Password:
          <input name="password" type="text" onChange={this.handleChange}/>
        </label>
        <br/>
        <button>Login</button>
      </form>
    )
  }
}

ReactDOM.render(<InputBox />, document.getElementById('root'));