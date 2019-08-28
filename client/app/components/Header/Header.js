import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {getFromStorage} from "../utils/storage";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload:false,
    }
    this.logout = this.logout.bind(this);

  }

  logout(){

    const obj = getFromStorage('static');
    console.log("Obj:");
    console.log(obj);
    console.log("---end---");
    if(obj && obj.token) {
      const {token } = obj;
      console.log('/api/account/logout?token=' + token);
      fetch('/api/account/logout?token=' + token,{method:'GET'})
        .then(res => res.json()).then(json=>{
          console.log(json);
        localStorage.clear();
        window.localStorage.clear(); 
        this.setState({reload:true})

      }); 
    };
  }
  

  render() {
    const obj = getFromStorage('static');
    (obj === null) ? window.location.reload(): null;

  
    return (<>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#"><img className="logo"
                                                    src='assets/img/logo-white.png'></img><strong>S</strong>tatic</a>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item hiddenwhen">
                <Link className="nav-link"  to="/"><i className={"fas fa-home"}></i></Link>
                <Link className="nav-link"  to="/reports"><i className={"fas fa-file-contract"}></i></Link>
                <Link className="nav-link"  to="/received"><i className={"fas fa-file-invoice"}></i></Link>
                <a onClick={this.logout} className="nav-link logut-right" href="#">Logout <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item hiddesm">
                <a onClick={this.logout} className="nav-link logut-right" href="#">Logout <span className="sr-only">(current)</span></a>
              </li>
            </ul> 
          </div>
        </nav>
      </header>


    </>);
  }
}

/*
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          */
export default Header;
