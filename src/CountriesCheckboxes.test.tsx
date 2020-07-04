import { act, render } from '@testing-library/react';
import React from 'react';
import { CountriesCheckboxes } from './CountriesCheckboxes';

it('renders countries checkboxes', async () => {
  let component;
  await act(async () => {
    component = render(<CountriesCheckboxes />);
  });
  const { getByText } = component;
  const checkbox = getByText(/Bulgaria/i);
  expect(checkbox).toBeTruthy();
});
