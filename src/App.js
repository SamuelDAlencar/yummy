import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Home } />
    </Switch>
  );
}
