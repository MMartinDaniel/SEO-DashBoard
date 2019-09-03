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
  {name:'DashBoard',icon:'fas fa-home',url:'',noadmin:false},
  {name:'Mis Reportes',icon:'fas fa-file-contract',url:'reports',noadmin:false},
  {name:'Reportes Recibidos',icon:'fas fa-file-invoice',url:'received',noadmin:true},  
  {name:'Crear Usuario',icon:'fas fa-user-plus',url:'',noadmin:false},

  {name:'Herramientas'},
  {name:'Buscador enlaces rotos',icon:'fas fa-code',url:'brokenLinks',noadmin:true},
  // {name:'SEO checker',icon:'fas fa-universal-access',url:'scanner'},
  {name:'Detector Texto Alternativo',icon:'fas fa-low-vision',url:'alternative',noadmin:true},
  {name:'Generar SiteMap',icon:'fas fa-sitemap',url:'sitemap',noadmin:true},
  {name:'Minificador de CSS & JS ',icon:'fas fa-file-archive',url:'Minifier',noadmin:true},

  {name:'Corrector Ortografico',icon:'fas fa-spell-check',url:'SpellingCheck',noadmin:true},
];
export default App;
