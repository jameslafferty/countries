import React from 'react';
import { storiesOf } from '@storybook/react'
import { CountriesSelect } from './CountriesSelect';

storiesOf('CountriesSelect', module)
  .add('basic usage', () => <CountriesSelect />);
