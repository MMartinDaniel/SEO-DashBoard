import React, { Component } from 'react';
import 'whatwg-fetch';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import LoginPage from "../Auth/LoginPage";
import {getFromStorage} from "../utils/storage";
import ReportTemplate from '../Template/ReportTemplate';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {tabs,stats} = this.props;

    return (
      <>
        <Header/>
        <div id='wrapper' className="toggled">
          <Sidebar stats={stats} tabs={tabs}/>
          <div id='page-content-wrapper'>
            <div className="'container-fluid">
              <main>
              { this.props.children}
             </main>
            </div>
          </div>
        </div>
        <Footer/>
      </>
    );
  }

}

export default Template;
