import { getAbbreviation } from './getAbbreviation';

it('should return the correct abbreviation', () => {
  expect(getAbbreviation('Kenya')).toBe('KE');
  expect(getAbbreviation('United States')).toBe('US');
});

it('should return the correct IOC abbreviation', () => {
  expect(getAbbreviation('Kenya', true)).toBe('KEN');
  expect(getAbbreviation('United States', true)).toBe('USA');
});

