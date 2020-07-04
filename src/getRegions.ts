import { Region } from './types/Region';

export const getRegions = async (lang = 'en') => {
  const regions: Record<string, Region>  = await import(`./data/json/${lang}/regions.json`);
  return regions;
};
