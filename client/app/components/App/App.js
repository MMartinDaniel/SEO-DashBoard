import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import LoginPage from "../Auth/LoginPage";
import {getFromStorage} from "../utils/storage";

class App extends Component {
  constructor(props){
    super(props);
    const obj = getFromStorage('static');
    this.state = {
      stats: obj,
    }

  }
render(){
  const {stats} = this.state;
  if(stats && stats.token){
    return (
      <>
        <Header/>
        <div id='wrapper' className="toggled">
          <Sidebar tabs={TABS}/>
          <div id='page-content-wrapper'>
            <div className="'container-fluid">
              <main>
              {React.cloneElement(this.props.children, { stats: stats })}
              </main>
            </div>
          </div>
        </div>
        <Footer/>
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
