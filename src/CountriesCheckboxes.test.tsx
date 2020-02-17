import React from 'react';
import { render } from '@testing-library/react';
import { CountriesCheckboxes } from './CountriesCheckboxes';

it('renders countries checkboxes', () => {
  const { getByText } = render(<CountriesCheckboxes />);
  const checkboxes = getByText(/Hello, checkboxes/i);
  expect(checkboxes).toBeTruthy();
});
