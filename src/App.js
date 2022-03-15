import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import HomeProvider from './providers/HomeProvider';
import DetailedRecipe from './pages/DetailedRecipe';
import DetailedRecipeProvider from './providers/DetailedRecipeProvider';
import InProgressRecipe from './pages/inProgressRecipe';
import DoneRecipes from './pages/DoneRecipes';
import Explore from './pages/Explore';
import ExploreOptions from './pages/ExploreOptions';
import ExploreByIngredient from './pages/ExploreByIngredient';
import ExploreByNationalitie from './pages/ExploreByNationalitie';

export default function App() {
  return (
    <HomeProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/:id" component={ ExploreOptions } />
        <Route exact path="/explore/:id/ingredients" component={ ExploreByIngredient } />
        <Route
          exact
          path="/explore/:id/nationalities"
          component={ ExploreByNationalitie }
        />
        <DetailedRecipeProvider>
          <Route exact path="/foods" component={ Home } />
          <Route exact path="/drinks" component={ Home } />
          <Route exact path="/foods/:id" component={ DetailedRecipe } />
          <Route exact path="/drinks/:id" component={ DetailedRecipe } />
          <Route exact path="/foods/:id/in-progress" component={ InProgressRecipe } />
          <Route exact path="/drinks/:id/in-progress" component={ InProgressRecipe } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
        </DetailedRecipeProvider>
      </Switch>
    </HomeProvider>
  );
}
