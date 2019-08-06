import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {getFromStorage} from "../utils/storage";


class SignOutBtn extends Component{
  constructor(props){
   super(props);
   this.state = {};
 }

 logout(){

    const obj = getFromStorage('static');
    if(obj && obj.token) {
      const {token } = obj;
      console.log('/api/account/logout?token=' + token);
      fetch('/api/account/logout?token=' + token,{method:'GET'})
        .then(res => res.json()).then(json=>{
        localStorage.clear();
      });
      window.location.reload();
    };
  }

 render(){
    return (
      <a onClick={this.logout} className="dropdown-item" >
        <i className="icon dripicons-lock-open"/> Sign Out
      </a>);
  };


};



class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#"><img className="logo"
                                                    src='assets/img/logo-white.png'></img><strong>S</strong>tatic</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link className="nav-link"  to="/">Home</Link>

              </li>
              <li className="nav-item">
                <a className="nav-link logut-right" href="#">Logout <span className="sr-only">(current)</span></a>
              </li>
            </ul> 
          </div>
        </nav>
      </header>


    </>);
  }
}

export default Header;
