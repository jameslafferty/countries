import { continents } from './continents';

const countryContinents: Record<string, string> = {};

/**
 * Given the country name, abbreviation or ioc code, returns the continent
 * the country is on.
 * 
 * @param key 
 */
export const getContinent = (key: string): string => {
  if (countryContinents[key] == null) {
    for (const entry of Object.entries(continents)) {
      const {0: continent, 1: countries} = entry;
      for (const country of countries) {
        const { abbr, name, ioc } = country;
        countryContinents[abbr] = continent;
        countryContinents[name] = continent;
        countryContinents[ioc] = continent;
      }
    }
  }
  return countryContinents[key];
};
