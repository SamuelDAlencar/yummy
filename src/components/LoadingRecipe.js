import React from 'react';
import loader from '../images/loader.gif';
import loader2 from '../images/loader2.gif';

export default function LoadingRecipe() {
  return (
    <section
      style={ {
        display: 'flex',
        opacity: '0.5',
      } }
    >
      <img
        style={ {
          margin: '0',
          width: '50%',
        } }
        alt="loader"
        src={ loader }
      />
      <section
        style={ {
          display: 'flex',
          flexDirection: 'column',
          padding: '10% 0 0 10%',
        } }
      >
        <img
          style={ {
            margin: '0 0 10%',
            width: '30%',
          } }
          alt="loader"
          src={ loader2 }
        />
        <img
          style={ {
            margin: '5% 0 0',
            width: '30%',
          } }
          alt="loader"
          src={ loader2 }
        />
        <img
          style={ {
            margin: '0',
            width: '30%',
          } }
          alt="loader"
          src={ loader2 }
        />
      </section>
    </section>
  );
}
