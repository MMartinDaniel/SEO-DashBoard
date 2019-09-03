import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage , setInStorage} from "../utils/storage";
import {Redirect,Link} from "react-router-dom";

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
      signUpPassword:'',
      login: 1
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.avoidSubmit = this.avoidSubmit.bind(this);

  this.logout = this.logout.bind(this);
  this.swapLogin = this.swapLogin.bind(this);


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
    if(signUpEmail === "" || signUpPassword === ""){ return;}

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
          this.swapLogin();
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
  avoidSubmit(){
    event.preventDefault();
  }

  swapLogin(event){
    const {login} = this.state;
      (login) ? this.setState({login:false}) : this.setState({login:true});
  }

  onSignIn(event){
    const {signInEmail,signInPassword} = this.state;

    if(signInEmail === "" || signInPassword === ""){ return;}
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
          setInStorage('static',{token:json.token, website:'http://instantes.net', uid:json.uid,admin:json.admin,email:json.email});
          setInStorage('static-progress',[]);
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
    const {
      token,signInPassword,signInEmail,signInError,
      signUpEmail,signUpError,signUpPassword,isLoading,login
    } = this.state;

    let message = "";
    if(isLoading){
      message = <p>cargando...</p>;
    }
    if(token) {
      window.location.reload();
    }else{
      if(login){
        return (

          <div className='login-wrapper'>
            <div>
                {message}
              { (signInError) ? ( <p> { signInError }</p> ) : (null)}
              { (signUpError) ? ( <p> { signUpError }</p> ) : (null)}
            </div>
            <div className='container'>
            <div className="login-form-div">

               <form onSubmit={this.avoidSubmit}>
                <input type='email' value={signInEmail} placeholder={"email"} onChange={this.onTextboxChangeSignInEmail} required/>
                <input type='password' value={signInPassword} placeholder={"contraseña"} onChange={this.onTextboxChangeSignInPassword} required/>
                <input type='submit'  className="loginButton" onClick={this.onSignIn} value='Entrar'/>
                <p className='dont-account'>No tienes cuenta? <a onClick={this.swapLogin} >registrate</a> </p>
                </form>

              </div>
            </div>
         
  
          </div>
  
          );
      }else{
        return (

          <div className='login-wrapper'>
            <div>
                {message}
              { (signInError) ? ( <p> { signInError }</p> ) : (null)}
              { (signUpError) ? ( <p> { signUpError }</p> ) : (null)}
            </div>
            <div className='container'>
            <div className="login-form-div">

            <form onSubmit={this.avoidSubmit}>
              <input type='email'
                        placeholder="Registrar email"
                        value={signUpEmail}
                        onChange={this.onTextboxChangeSignUpEmail} required />
                  <input type='password'
                        placeholder="registrar password"
                        value={signUpPassword}
                        onChange={this.onTextboxChangeSignUpPassword} required/>
                  <input type='submit'  className="registerButton" onClick={this.onSignUp} value='Registrarse'/>
                </form>
                  <p className='dont-account'>Tienes una cuenta? <a onClick={this.swapLogin} >Logeate</a> </p>
  
              </div>
            </div>
         
  
          </div>
  
          );
      }
     
    }


   /* return (<button onClick={this.logout}> logout </button>); */
  }

}

export default LoginPage;
