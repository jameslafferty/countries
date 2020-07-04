import { Region } from './types/Region';

export const getSubRegions = async (lang = 'en') => {
  const subRegions: Record<string, Region>  = await import(`./data/json/${lang}/subRegions.json`);
  return subRegions;
};