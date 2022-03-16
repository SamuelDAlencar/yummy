import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import '../css/profile.css';
import Header from '../components/Header';

export default function Profile() {
  const getEmailLogin = JSON.parse(localStorage.getItem('user')).email;
  const history = useHistory();

  const handleLocalStorage = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header />
      {/* <div className="profile">
        <img
          src={ profileIcon }
          alt="profile-top-btn"
        />
        <h1 className="profile-h1" data-testid="page-title">Profile</h1>
      </div> */}
      <h2 data-testid="profile-email">{ getEmailLogin }</h2>
      <div className="container-button">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => { history.push('/done-recipes'); } }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => { history.push('/favorite-recipes'); } }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLocalStorage }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
