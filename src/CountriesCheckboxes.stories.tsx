import React from 'react';
import { storiesOf } from '@storybook/react'
import { CountriesCheckboxes } from './CountriesCheckboxes';

storiesOf('CountriesCheckboxes', module)
  .add('basic usage', () => <CountriesCheckboxes />);
