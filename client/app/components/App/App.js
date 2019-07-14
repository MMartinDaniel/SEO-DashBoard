import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import LoginPage from "../Auth/LoginPage";
import {getFromStorage} from "../utils/storage";
import ReportTemplate from '../Template/ReportTemplate';
import Template from '../Template/Template';
import StaticReport from '../StaticReport/StaticReport';

class App extends Component {
  constructor(props){
    super(props);
    const obj = getFromStorage('static');
    this.state = {
      stats: obj,
      report: null,
    }

    

  }
render(){
  const {stats} = this.state;
  const {children} = this.props;
  const url = window.location.pathname;
  if(url.includes("/Report")){
    return(<>
    <StaticReport children={children} stats={stats}/>
    </>);
  }else if(stats && stats.token){
    return (
      <>
         <Template tabs={TABS} stats={stats} children={children}/>
      </>);
  }else{
    return(
      <>
        <LoginPage/>
      </>
    );
  };
}

};
//const App = ({ children }) => ();
const TABS =[
  {name:'DashBoard',icon:'fas fa-home',url:''},
  {name:'Profile',icon:'fas fa-user',url:'profile'},
  {name:'Broken Link Checker',icon:'fas fa-code',url:'brokenLinks'},
  {name:'SEO checker',icon:'fas fa-universal-access',url:'scanner'},
  {name:'Minifier',icon:'fas fa-file-alt',url:'Minifier'},
  {name:'Events',icon:'fas fa-sitemap',url:'Events'},
  {name:'Statistics',icon:'far fa-chart-bar',url:'Statistics'},
  {name:'Services',icon:'fas fa-exclamation-triangle',url:'Services'},
  {name:'Contact',icon:'fas fa-file-alt',url:'Contact'},
];
export default App;
