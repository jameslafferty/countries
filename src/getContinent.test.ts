import { getContinent } from './getContinent'

it('should return the correct continent for a country', () => {
  expect(getContinent('Kenya')).toBe('Africa');
  expect(getContinent('United States')).toBe('North America');
});
