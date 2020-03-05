import { RegionCode } from '../src/types/RegionCode';
import { SubregionCode } from '../src/types/SubregionCode';
import { IntermediateRegionCode } from '../src/types/IntermediateRegionCode';

const csv = require('csvtojson');
const fs = require('fs');
const { produce } = require('immer');

const files = [...process.argv].slice(2);

interface RawCountry {
  'Country or Area': string;
  'Developed / Developing Countries': 'Developed' | 'Developing';
  'Global Code': string;
  'Global Name': string;
  'Intermediate Region Code': IntermediateRegionCode | '';
  'Intermediate Region Name': string;
  'ISO-alpha3 Code': string;
  'Land Locked Developing Countries (LLDC)': 'x' | '';
  'Least Developed Countries (LDC)': 'x' | '';
  'M49 Code': string;
  'Region Code': RegionCode;
  'Region Name': string;
  'Small Island Developing States (SIDS)': 'x' | '';
  'Sub-region Code': SubregionCode;
  'Sub-region Name': string;
}

interface Country {
  intermediateRegionCode?: IntermediateRegionCode;
  isDeveloped: boolean;
  isLDC: boolean;
  isLLDC: boolean;
  isoAlpha3: string;
  isSIDS: boolean;
  m49: string;
  name: string;
  regionCode: RegionCode;
  subRegionCode: SubregionCode;
}

interface Region {
  name: string;
  m49: string;
  countries: string[];
}

interface RegionCountry {
  intermediateRegionCode?: string;
  intermediateRegionName?: string;
  m49: string;
  regionCode: string;
  regionName: string;
  subRegionCode: string;
  subRegionName: string;
}

const rawCountryToCountry = (rawCountry: RawCountry): Country => {
    const intermediateRegionCode = rawCountry['Intermediate Region Code'] || undefined;
    const isDeveloped = rawCountry['Developed / Developing Countries'] === 'Developed';
    const isLDC = rawCountry['Least Developed Countries (LDC)'] === 'x';
    const isLLDC = rawCountry['Land Locked Developing Countries (LLDC)'] === 'x';
    const isoAlpha3 = rawCountry['ISO-alpha3 Code'];
    const isSIDS = rawCountry['Small Island Developing States (SIDS)'] === 'x';
    const m49 = rawCountry['M49 Code'];
    const name = rawCountry['Country or Area'];
    const regionCode = rawCountry['Region Code'];
    const subRegionCode = rawCountry['Sub-region Code'];
    return {
      intermediateRegionCode,
      isDeveloped,
      isLDC,
      isLLDC,
      isoAlpha3,
      isSIDS,
      m49,
      name,
      regionCode,
      subRegionCode,
    };
};

const rawCountryToRegionCountry = (rawCountry: RawCountry) => ({
  intermediateRegionCode: rawCountry['Intermediate Region Code'] || undefined,
  intermediateRegionName: rawCountry['Intermediate Region Name'] || undefined,
  m49: rawCountry['M49 Code'],
  regionCode: rawCountry['Region Code'],
  regionName: rawCountry['Region Name'],
  subRegionCode: rawCountry['Sub-region Code'],
  subRegionName: rawCountry['Sub-region Name'],
});

const addCountryToRegion = (
  draftRegionList: Region[],
  country: RegionCountry,
  codeKey: 'intermediateRegionCode' | 'regionCode' | 'subRegionCode',
  nameKey: 'intermediateRegionName' | 'regionName' | 'subRegionName'
) => {
  return produce(draftRegionList, (regionList: Region[]) => {
    const m49 = country[codeKey];
    const name = country[nameKey];
    if (m49 == null || name == null) {
      return regionList;
    }
    const region = regionList.find(r => r.m49 === m49);
    if (region) {
      region.countries.push(country.m49);
      return regionList;
    }
    regionList.push({
      name,
      m49,
      countries: [ country.m49 ],
    });
    return regionList;
  });
};

files.forEach((file) => {
  csv({
    checkColumn: true,
  })
  .fromFile(file)
    .then((json: RawCountry[]) => {
      const newFileName = file
        .replace('UNSD — Methodology-', '')
        .replace(/csv/g, 'json');
      fs.writeFileSync(newFileName, JSON.stringify(json.map(rawCountryToCountry), null, 2));
      const regionCountries = json.map(rawCountryToRegionCountry);
      let intermediateRegions: Region[] = [];
      let regions: Region[] = [];
      let subRegions: Region[] = [];
      for (const country of regionCountries) {
        intermediateRegions = addCountryToRegion(intermediateRegions, country, 'intermediateRegionCode', 'intermediateRegionName');
        regions = addCountryToRegion(regions, country, 'regionCode', 'regionName');
        subRegions = addCountryToRegion(subRegions, country, 'subRegionCode', 'subRegionName');
      }
      const intermediateRegionFileName = file.replace('UNSD — Methodology-', 'intermediate-region-')
        .replace(/csv/g, 'json');
      fs.writeFileSync(intermediateRegionFileName, JSON.stringify(intermediateRegions, null, 2));
      const regionFileName = file.replace('UNSD — Methodology-', 'region-')
        .replace(/csv/g, 'json');
      fs.writeFileSync(regionFileName, JSON.stringify(regions, null, 2));
      const subRegionFileName = file.replace('UNSD — Methodology-', 'sub-region-')
        .replace(/csv/g, 'json');
      fs.writeFileSync(subRegionFileName, JSON.stringify(subRegions, null, 2));
    });
});
