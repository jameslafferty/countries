import { continents } from './continents';

const dictionary: Record<string, string> = {};
/**
 * 
 * @param abbreviation 
 */
export const getName = (key: string): string => {
  if (dictionary[key] == null) {
    for (const entry of Object.entries(continents)) {
      const {1: countries} = entry;
      for (const country of countries) {
        const { abbr, name, ioc } = country;
        dictionary[ioc] = name;
        dictionary[abbr] = name;
      }
    }
  }
  return dictionary[key];
};
