import { Region } from './types/Region';

export const getIntermediateRegions = async (lang = 'en') => {
  const countries: Record<string, Region>  = await import(`./data/json/${lang}/intermediateRegions.json`);
  return countries;
};
