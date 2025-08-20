import React from 'react'; // 👈 обязательно для Vitest с JSX
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('App component', () => {
  it('renders main heading', () => {
    render(<App />);
    const heading = screen.getByText(/budget tracker/i); // или текст заголовка из твоего App
    expect(heading).toBeInTheDocument();
  });
});
