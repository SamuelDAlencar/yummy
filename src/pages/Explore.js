import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/explore.css';

export default function Explore() {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="explore-container">
      <Header namePage="Explore" />
      <div className="container-button">
        <button
          className="explore-button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
          type="button"
        >
          Explore Foods
        </button>
        <button
          className="explore-button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
          type="button"
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}
