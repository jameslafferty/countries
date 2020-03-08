import { Region } from './types/Region';

export const getRegions = async (lang = 'en') => {
  const countries: Record<string, Region>  = await import(`./data/json/${lang}/regions.json`);
  return countries;
};
