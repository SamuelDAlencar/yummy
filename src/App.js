import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import HomeProvider from './providers/HomeProvider';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <HomeProvider>
        <Route path="/foods" component={ Home } />
      </HomeProvider>
    </Switch>
  );
}
