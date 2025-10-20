import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MarketsPage from '../../pages/MarketsPage';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from '../../context/GlobalContext';
import * as api from '../../api';

jest.mock('../../api');

const mockedFetch = api as unknown as {
  fetchMarkets: jest.Mock;
};

mockedFetch.fetchMarkets.mockResolvedValue({
  items: [
    { symbol: 'BTC', name: 'Bitcoin', price: 30000, change24h: 1, volume24h: 1000, marketCap: 1_000_000 }
  ],
  total: 1,
  page: 1,
  limit: 20
});

test('renders markets table', async () => {
  render(
    <GlobalProvider>
      <BrowserRouter>
        <MarketsPage />
      </BrowserRouter>
    </GlobalProvider>
  );

  await waitFor(() => expect(screen.getByText(/BTC/)).toBeInTheDocument());
  expect(screen.getByText(/Bitcoin/)).toBeInTheDocument();
});
