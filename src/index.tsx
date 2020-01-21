import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { Root } from "./root";

import './styles/main.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Root} />
      <Route exact path="/watch" component={Root} />
    </Switch>
  </Router>,
  document.getElementById('root')
);