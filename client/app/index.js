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

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/brokenLinks" component={BrokenChecker}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/scanner" component={SEO}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
