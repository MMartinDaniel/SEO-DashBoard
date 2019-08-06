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
  {name:'My Reports',icon:'fas fa-file-contract',url:'reports'},
  {name:'Utils'},
  {name:'Broken Link Checker',icon:'fas fa-code',url:'brokenLinks'},
  // {name:'SEO checker',icon:'fas fa-universal-access',url:'scanner'},
  {name:'Missing Alternative',icon:'fas fa-low-vision',url:'alternative'},
  {name:'SiteMap Generator',icon:'fas fa-sitemap',url:'sitemap'},
  {name:'CSS & JS Minifier',icon:'fas fa-file-archive',url:'Minifier'},

];
export default App;
