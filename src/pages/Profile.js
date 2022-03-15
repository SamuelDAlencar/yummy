import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const [email, setEmail] = useState('userlogin@gmail.com');
  const history = useHistory();

  const handleLocalStorage = () => {
    history.push('/');
    localStorage.clear();
  };

  useEffect(() => {
    const getEmailLogin = JSON.parse(localStorage.getItem('user'));
    if (getEmailLogin) setEmail(getEmailLogin.email);
  }, []);

  return (
    <>
      <Header namePage="Profile" />
      <h2 data-testid="profile-email">{ email }</h2>
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
