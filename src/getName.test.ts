import { getName } from './getName';

it('should return the correct name, given an abbreviation', () => {
  expect(getName('KE')).toBe('Kenya');
  expect(getName('US')).toBe('United States');
});

it('should return the correct name, given an IOC abbreviation', () => {
  expect(getName('KEN')).toBe('Kenya');
  expect(getName('USA')).toBe('United States');
});

