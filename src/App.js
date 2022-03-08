import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import HomeProvider from './providers/HomeProvider';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <HomeProvider>
        <Route path="/foods" component={ Home } />
        <Route path="/drinks" component={ Home } />
        <Route exact path="/profile" component={ Profile } />
      </HomeProvider>
    </Switch>
  );
}
