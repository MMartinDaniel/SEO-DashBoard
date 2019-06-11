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
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                   data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul>
            {(1 === 0) ?
              <ul className="navbar-nav nav-right">
                <li className="nav-item dropdown dropdown-menu-lg">
                  <a href="javascript:void(0)" data-toggle="dropdown" role="button" aria-haspopup="true"
                     aria-expanded="false">
                    <i className="icon dripicons-view-apps"/>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right p-0">
                    <div className="dropdown-menu-grid">
                      <div className="menu-grid-row">
                        <div><a className="dropdown-item  border-bottom border-right" href="">
                          <i className="icon dripicons-mail"/><span>Mail</span></a></div>
                        <div><a className="dropdown-item  border-bottom" href="">
                          <i className="icon dripicons-message"/><span>Messages</span></a></div>
                      </div>
                      <div className="menu-grid-row">
                        <div><a className="dropdown-item  border-right" href="">
                          <i className="icon dripicons-archive"/><span>Contacts</span></a></div>
                        <div><a className="dropdown-item" href="">
                          <i className="icon dripicons-calendar"/><span>Calendar</span></a></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown dropdown-notifications dropdown-menu-lg">
                  <a href="javascript:void(0)" data-toggle="dropdown" role="button" aria-haspopup="true"
                     aria-expanded="false">
                    <i className="icon dripicons-bell"/>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <div className="card card-notification">
                      <div className="card-header">
                        <h5 className="card-title">Notifications</h5>
                        <ul className="actions top-right">
                          <li>
                            <a href="javascript:void(0);" data-q-action="open-notifi-config">
                              <i className="icon dripicons-gear"/>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="card-container-wrapper">
                          <div className="card-container">
                            <div className="timeline timeline-border">
                              <div className="timeline-list">
                                <div className="timeline-info">
                                  <div>Prep for bi-weekly meeting with <a href="javascript:void(0)"><strong>Steven
                                    Weinberg</strong></a></div>
                                  <small className="text-muted">07/05/18, 2:00 PM</small>
                                </div>
                              </div>
                              <div className="timeline-list timeline-border timeline-primary">
                                <div className="timeline-info">
                                  <div>Skype call with development team</div>
                                  <small className="text-muted">07/07/18, 1:00 PM</small>
                                </div>
                              </div>
                              <div className="timeline-list  timeline-border timeline-accent">
                                <div className="timeline-info">
                                  <div>Programming control system</div>
                                  <small className="text-muted">07/09/18, 10:00 AM - 6:00 PM</small>
                                </div>
                              </div>
                              <div className="timeline-list  timeline-border timeline-success">
                                <div className="timeline-info">
                                  <div>Lunch with Peter Higgs</div>
                                  <small className="text-muted">07/10/18, 12:00 PM</small>
                                </div>
                              </div>
                              <div className="timeline-list  timeline-border timeline-warning">
                                <div className="timeline-info">
                                  <div><a href="#"><strong>Approve Request</strong></a> for new training material by
                                  </div>
                                  <small className="text-muted">07/11/18, 9:00 AM</small>
                                </div>
                              </div>
                              <div className="timeline-list  timeline-border timeline-info">
                                <div className="timeline-info">
                                  <div><a href="#"><strong>RSVP</strong></a> for this year's hackathon.</div>
                                  <small className="text-muted">07/11/18, 1:30 PM</small>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link nav-pill user-avatar" data-toggle="dropdown" href="#" role="button"
                     aria-haspopup="true" aria-expanded="false">
                    <img src="../assets/img/avatars/1.jpg" className="w-35 rounded-circle" alt="Albert Einstein"/>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-accout">
                    <div className="dropdown-header pb-3">
                      <div className="media d-user">
                        <img className="align-self-center mr-3 w-40 rounded-circle" src="../assets/img/avatars/1.jpg"
                             alt="Albert Einstein"/>
                        <div className="media-body">
                          <h5 className="mt-0 mb-0">Albert Einstein</h5>
                          <span>support@authenticgoods.co</span>
                        </div>
                      </div>
                    </div>
                    <a className="dropdown-item" href="apps.messages.html"><i
                      className="icon dripicons-mail"/>Message <span
                      className="badge badge-accent rounded-circle w-15 h-15 p-0 font-size-10">4</span></a>
                    <a className="dropdown-item" href="pages.profile.html"><i
                      className="icon dripicons-user"></i> Profile</a>
                    <a className="dropdown-item" href="pages.my-account.html"><i
                      className="icon dripicons-gear"></i> Account
                      Settings </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#"><i className="icon dripicons-lock"></i> Lock Account</a>

                    <SignOutBtn/>

                  </div>
                </li>
                <li className="nav-item">
                  <a href="javascript:void(0)" data-toggle-state="aside-right-open">
                    <i className="icon dripicons-align-right"></i>
                  </a>
                </li>

              </ul>
              : null
            }
          </div>
        </nav>
      </header>


    </>);
  }
}

/*
const Header = () => (
  <header>
    <Link to="/">Home</Link>
    <nav>
      <Link to="/helloworld">Hello World</Link>
      <Link to="/signin">Signin</Link>
    </nav>

    <hr />
  </header>
);

*/

export default Header;
