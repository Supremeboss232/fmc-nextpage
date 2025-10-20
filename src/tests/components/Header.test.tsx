import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from '../../context/GlobalContext';

describe('Header', () => {
  test('renders navigation links', () => {
    render(
      <GlobalProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </GlobalProvider>
    );
    expect(screen.getByText(/Markets/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
