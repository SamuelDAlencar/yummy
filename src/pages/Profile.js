import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Profile() {
  const getEmailLogin = JSON.parse(localStorage.getItem('user')).email;
  const history = useHistory();

  const handleLocalStorage = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <>
      <h1 data-testid="page-title">Profile</h1>
      <h2 data-testid="profile-email">{ getEmailLogin }</h2>
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
      <Footer />
    </>
  );
}
