import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage , setInStorage} from "../utils/storage";
import {Redirect} from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <>
        <h1>Login</h1>
        <form action='/login' method='post' className="form">
          <input type="text" placeholder="Username"/>
          <input  type="password"  placeholder="Password"/>
          <button type="submit" id="login-button">Login</button>
        </form>
      </>
    );
  }

}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError:'',
      signInEmail:'',
      signInPassword:'',
      signUpEmail:'',
      signUpPassword:''
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  this.logout = this.logout.bind(this);

  }
  componentDidMount(){
    const obj = getFromStorage('static');
    if(obj && obj.token){
      const {token } = obj;
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json =>{
          if(json.success){
            this.setState({
              token:token,
              isLoading: false
            })
          }else{
            this.setState({
              isLoading: false,
            })
          }
        })
    }else{
      this.setState({
        isLoading:false,
      })
    }
  }

  onTextboxChangeSignInEmail(event){
    this.setState({
      signInEmail: event.target.value,
    })
  }
  onTextboxChangeSignInPassword(event){
    this.setState({
      signInPassword: event.target.value,
    })
  }
  onTextboxChangeSignUpEmail(event){
    this.setState({
      signUpEmail: event.target.value
    })
  }
  onTextboxChangeSignUpPassword(event){
    this.setState({
      signUpPassword: event.target.value
    })
  }
  onSignUp(event){
    const {signUpEmail,signUpPassword} = this.state;
    this.setState({
      isLoading: true,
    });

    fetch('/api/account/signup',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
      email: signUpEmail,
      password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json',json);
        if(json.success){
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpPassword: '',
            signUpEmail:''
          })
        }else{
          this.setState({
            signUpError:json.message,
            isLoading: false,
          })
        }
      })
  }

  logout(){
    this.setState({
      isLoading: true,
    })
    const obj = getFromStorage('static');
    if(obj && obj.token) {
      const {token } = obj;
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            })
          } else {
            this.setState({
              isLoading: false,
            })
          }
        })
    }
  }

  onSignIn(event){
    const {signInEmail,signInPassword} = this.state;
    this.setState({
      isLoading: true,
    });

    fetch('/api/account/signin',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json',json);
        if(json.success){
          setInStorage('static',{token:json.token, website:'http://instantes.net', uid:json.uid});
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail:'',
            token: json.token,
          })
        }else{
          this.setState({
            signInError:json.message,
            isLoading: false,
          })
        }
      })
  }
  render() {
    const { isLoading, token,signInPassword,signInEmail,signInError,signUpEmail,signUpError,signUpPassword} = this.state;
    let message = "";
    if(isLoading){
      message = <p>Loading...</p>;
    }
    if(token) {
      return (<Redirect to='/' />);
    }else{
      return (

        <div className='login-wrapper'>
          <div>
              {message}
            { (signInError) ? ( <p> { signInError }</p> ) : (null)}
          </div>
          <div className='container'>
            <div>
            <h1>Welcome</h1>
            <input type='email' value={signInEmail} onChange={this.onTextboxChangeSignInEmail} />
            <input type='password' value={signInPassword} onChange={this.onTextboxChangeSignInPassword} />
            <button onClick={this.onSignIn}>Signin</button>
              (<button onClick={this.logout}> logout </button>
          </div>
            <div className='invisible' >
              <div>
                { (signUpError) ? ( <p> { signUpError }</p> ) : (null)}
              </div>
              <p>Signup</p>
              <input type='email'
                     value={signUpEmail}
                     onChange={this.onTextboxChangeSignUpEmail} />
              <input type='password'
                     value={signUpPassword}
                     onChange={this.onTextboxChangeSignUpPassword} />
              <button onClick={this.onSignUp} id="login-button">Signup</button>
              <a href='/helloworld'>aa</a>

            </div>
          </div>
          <ul className="bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

        </div>

        );
    }


   /* return (<button onClick={this.logout}> logout </button>); */
  }

}

export default LoginPage;
