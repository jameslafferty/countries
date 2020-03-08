import { Country } from './types/Country';

export const getCountries = async (lang = 'en') => {
  const countries: Record<string, Country>  = await import(`./data/json/${lang}/countries.json`);
  return countries;
};
