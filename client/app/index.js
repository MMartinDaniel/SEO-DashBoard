import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import BrokenChecker from './components/BrokenChecker/BrokenChecker';
import Signin from './components/Signin/Signin';
import LoginPage from './components/Auth/LoginPage';
import SEO from './components/SEO/SEO';
import './styles/styles.scss';
import Minifier from './components/Minifier/Minifier';
import Profile from './components/Profile/Profile';
import StaticReport from './components/StaticReport/StaticReport';
import SpellChecker from './components/SpellChecker/SpellChecker';
import Received from "./components/Received/Received"
import AlternativeTool from "./components/AlternativeTool/AlternativeTool"
import SiteMapGenerator from './components/Sitemap/Sitemap';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/brokenLinks" component={BrokenChecker}/>
        <Route path="/reports" component={Profile}/>
        <Route path="/received" component={Received}/>
        <Route path="/alternative" component={AlternativeTool}/>
        <Route path="/Sitemap" component={SiteMapGenerator}/>
        
        <Route path="/signin" component={Signin}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/minifier" component={Minifier} />
        <Route path="/scanner" component={SEO}/>
        <Route path="/report" component={StaticReport}/>
        <Route path="/SpellingCheck" component={SpellChecker}/>

        <Route component={NotFound}/>
      </Switch>
    </App>

  </Router>
), document.getElementById('app'));
