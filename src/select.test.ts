import { select } from './select';

it('should return a select element with the countries as options', () => {
  const selectElement = document.createElement('div');
  selectElement.innerHTML = select();
  expect(selectElement.querySelector('option[value="KE"]')?.textContent).toBe('Kenya');
  expect(selectElement.querySelector('option[value="US"]')?.textContent).toBe('United States');
});
