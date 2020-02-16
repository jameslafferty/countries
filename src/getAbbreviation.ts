import { continents } from './continents';

const countryAbbreviations: Record<string, string> = {};
const countryIOCs: Record<string, string> = {};

/**
 * 
 * @param country 
 */
export const getAbbreviation = (key: string, isIOC?: boolean): string => {
  const dictionary = isIOC ? countryIOCs : countryAbbreviations;
  if (dictionary[key] == null) {
    for (const entry of Object.entries(continents)) {
      const {1: countries} = entry;
      for (const country of countries) {
        const { abbr, name, ioc } = country;
        countryAbbreviations[name] = abbr;
        countryIOCs[name] = ioc;
      }
    }
  }
  return dictionary[key]; 
};
