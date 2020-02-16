import { continents } from './continents';

let markup: string;

/**
 * @returns string html markup for a select menu containing all the countries
 */
export const select = (shouldUseIOC?: boolean): string => {
  if (markup == null) {
    markup = '<select>';
    for (const entry of Object.entries(continents)) {
      const {0: continent, 1: countries} = entry;
      markup += `<optgroup label="${continent}">`;
      for (const country of countries) {
        const { abbr, name, ioc } = country;
        markup += `<option value=${shouldUseIOC ? ioc : abbr} >${name}</option>`
      }
      markup += `<optgroup>`;
    }
    markup += '</select>';
  }

  return markup;
};
