import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';
import '../css/profile.css';

export default function Profile() {
  const getEmailLogin = JSON.parse(localStorage.getItem('user')).email;
  const history = useHistory();

  const handleLocalStorage = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div className="container-profile">
      <h1 className="profile-h1" data-testid="page-title">Profile</h1>
      <div className="container-image-profile">
        <img
          className="image-profile"
          src={ profileIcon }
          alt="profile-top-btn"
        />
        <inpu
          name="lar"
          className="profile-picture-button"
          type="button"
        >
          Profile Picture
        </inpu>
      </div>
      <h2
        className="profile-email"
        data-testid="profile-email"
      >
        { getEmailLogin }

      </h2>
      <div className="container-button">
        <button
          className="profile-button"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => { history.push('/done-recipes'); } }
        >
          Done Recipes
        </button>
        <button
          className="profile-button"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => { history.push('/favorite-recipes'); } }
        >
          Favorite Recipes
        </button>
        <button
          className="button-logout"
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
