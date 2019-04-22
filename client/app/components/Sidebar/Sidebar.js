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
              <a href="#">Navigation</a>
            </li>
            {
              tabs.map(function (item) {
                return <li key={item.name}><a href={'/'+item.url}><i className={item.icon}/><span>{item.name}</span></a></li>
              })
            }
          </ul>
        </div>
      </>
    );
  }
}

export default Sidebar;
