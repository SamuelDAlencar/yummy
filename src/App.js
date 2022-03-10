import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import HomeProvider from './providers/HomeProvider';
import Profile from './pages/Profile';
import DetailedRecipe from './pages/DetailedRecipe';
import DetailedRecipeProvider from './providers/DetailedRecipeProvider';
import InProgressRecipe from './pages/inProgressRecipe';
import DoneRecipes from './pages/DoneRecipes';

export default function App() {
  return (
    <HomeProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Home } />
        <Route exact path="/drinks" component={ Home } />
        <DetailedRecipeProvider>
          <Route exact path="/foods/:id" component={ DetailedRecipe } />
          <Route exact path="/drinks/:id" component={ DetailedRecipe } />
          <Route exact path="/foods/:id/in-progress" component={ InProgressRecipe } />
          <Route exact path="/drinks/:id/in-progress" component={ InProgressRecipe } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
        </DetailedRecipeProvider>
        <Route exact path="/profile" component={ Profile } />
      </Switch>
    </HomeProvider>
  );
}
