import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Sidebar extends Component {
  constructor(props) {
  super(props);
  this.state = {};
}

  render() {
    const tabs = this.props.tabs;
    return(
      <>
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <a href="#">Profile</a>
            </li>
            {
              tabs.map(function (item) {
                if(item.name === "Utils"){ return <li key={item.name} className="sidebar-brand"><a href="#">{item.name}</a> </li> } 
                return <li key={item.name}><a href={'/'+item.url}><i className={item.icon}/><span>{item.name}</span></a></li>
                ;
              })
            }
          </ul>
        </div>
      </>
    );
  }
}

export default Sidebar;
