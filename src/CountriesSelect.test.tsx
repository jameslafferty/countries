import React from 'react';
import { render } from '@testing-library/react';
import { CountriesSelect } from './CountriesSelect';

it('renders countries checkboxes', () => {
  const { getByText } = render(<CountriesSelect />);
  const select = getByText(/Hello, select/i);
  expect(select).toBeTruthy();
});
