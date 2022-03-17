import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

it('Testando1...', () => {
  renderWithRouter(<App />);
  const aboutTitle = screen.getByText(/entrar/i);
  expect(aboutTitle).toBeInTheDocument();
});

it('Testando2...', () => {
  const inputText = 'receba@gmail.com';
  renderWithRouter(<App />);
  const inputLogin = screen.getByTestId('email-input');
  expect(inputLogin).toBeInTheDocument();
  userEvent.type(inputLogin, inputText);
  expect(inputLogin).toHaveValue(inputText);
});

it('Testando3...', () => {
  const inputText = '1234567';
  renderWithRouter(<App />);
  const inputPassword = screen.getByTestId(/password-input/i);
  expect(inputPassword).toBeInTheDocument();
  userEvent.type(inputPassword, inputText);
  expect(inputPassword).toHaveValue(inputText);
});

it('Testando4...', () => {
  const inputTextLog = 'yessss@gmail.com';
  const inputTextPass = '1234567';
  const { history } = renderWithRouter(<App />);
  const inputPassword = screen.getByTestId(/password-input/i);
  const inputLogin = screen.getByTestId(/email-input/i);
  expect(inputPassword).toBeInTheDocument();
  expect(inputLogin).toBeInTheDocument();
  userEvent.type(inputLogin, inputTextLog);
  userEvent.type(inputPassword, inputTextPass);
  expect(inputLogin).toHaveValue(inputTextLog);
  expect(inputPassword).toHaveValue(inputTextPass);
  const btnEntrar = screen.getByTestId(/login-submit-btn/i);
  userEvent.click(btnEntrar);
  expect(history.location.pathname).toBe('/foods');
});

it('Testando5...', () => {
  const inputTextLog = 'luvadepedreiro@gmail.com';
  const inputTextPass = '1234567';
  const { history } = renderWithRouter(<App />);
  const inputPassword = screen.getByTestId(/password-input/i);
  const inputLogin = screen.getByTestId(/email-input/i);
  expect(inputPassword).toBeInTheDocument();
  expect(inputLogin).toBeInTheDocument();
  userEvent.type(inputLogin, inputTextLog);
  userEvent.type(inputPassword, inputTextPass);
  expect(inputLogin).toHaveValue(inputTextLog);
  expect(inputPassword).toHaveValue(inputTextPass);
  const btnEntrar = screen.getByTestId(/login-submit-btn/i);
  userEvent.click(btnEntrar);
  expect(history.location.pathname).toBe('/foods');
  const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
  userEvent.click(drinkIcon);
  expect(history.location.pathname).toBe('/drinks');
  console.log(drinkIcon);
});

it('Testando6...', () => {
  const inputTextLog = 'siiiii@gmail.com';
  const inputTextPass = '1234567';
  const { history } = renderWithRouter(<App />);
  const inputPassword = screen.getByTestId(/password-input/i);
  const inputLogin = screen.getByTestId(/email-input/i);
  expect(inputPassword).toBeInTheDocument();
  expect(inputLogin).toBeInTheDocument();
  userEvent.type(inputLogin, inputTextLog);
  userEvent.type(inputPassword, inputTextPass);
  expect(inputLogin).toHaveValue(inputTextLog);
  expect(inputPassword).toHaveValue(inputTextPass);
  const btnEntrar = screen.getByTestId(/login-submit-btn/i);
  userEvent.click(btnEntrar);
  expect(history.location.pathname).toBe('/foods');
  const exploreIcon = screen.getByTestId(/explore-bottom-btn/i);
  userEvent.click(exploreIcon);
  expect(history.location.pathname).toBe('/explore');
});

it('Testando7...', () => {
  const inputTextLog = 'chanc@gmail.com';
  const inputTextPass = '1234567';
  const { history } = renderWithRouter(<App />);
  const inputPassword = screen.getByTestId(/password-input/i);
  const inputLogin = screen.getByTestId(/email-input/i);
  expect(inputPassword).toBeInTheDocument();
  expect(inputLogin).toBeInTheDocument();
  userEvent.type(inputLogin, inputTextLog);
  userEvent.type(inputPassword, inputTextPass);
  expect(inputLogin).toHaveValue(inputTextLog);
  expect(inputPassword).toHaveValue(inputTextPass);
  const btnEntrar = screen.getByTestId(/login-submit-btn/i);
  userEvent.click(btnEntrar);
  expect(history.location.pathname).toBe('/foods');
  const exploreIcon = screen.getByTestId(/explore-bottom-btn/i);
  userEvent.click(exploreIcon);
  expect(history.location.pathname).toBe('/explore');
  const btnFoods = screen.getByTestId('explore-foods');
  userEvent.click(btnFoods);
  const exploreNationality = screen.getByTestId('explore-by-nationality');
  expect(exploreNationality).toBeInTheDocument();
});
