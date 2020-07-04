import React from 'react';
import { CountriesCheckboxes } from './CountriesCheckboxes';

export default {
  component: CountriesCheckboxes,
  title: 'Countries Checkboxes',
};

export const basicUsage =  () => <CountriesCheckboxes />;
export const localizedUsage = () => <CountriesCheckboxes locale='ar' />;
