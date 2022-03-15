import React from 'react';
import loader from '../images/loader.gif';
import '../css/loading.css';

export default function Loading() {
  return (
    <section className="loading-section">
      <img
        alt="loading-gif"
        src={ loader }
        className="loading-img"
      />
    </section>
  );
}
