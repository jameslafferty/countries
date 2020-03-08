import { RegionCode } from '../src/types/RegionCode';
import { SubregionCode } from '../src/types/SubregionCode';
import { IntermediateRegionCode } from '../src/types/IntermediateRegionCode';
import { Country } from '../src/types/Country';
import { Region } from '../src/types/Region';

const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
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

const m49ArrayToM49Dictionary = (m49Array: (Region |  Country)[]) => {
  const m49Dictionary: Record<string, Region | Country> = {};
  for (const m49 of m49Array) {
    if (m49Dictionary[m49.m49] != null) {
      throw new Error(`${JSON.stringify(m49)} already exists!`);
    }
    m49Dictionary[m49.m49] = { ...m49 };
  }
  return m49Dictionary;
};

const getNewFileName = (originalFileName: string, targetFile: string) => originalFileName.replace('UNSD — Methodology-', '')
  .replace(/csv/g, 'json')
  .replace('raw-data', 'src/data')
  .replace('.json', `/${targetFile}.json`);

const writeFile = (originalFileName: string, targetFile: string, data: string) => {
  const newFileName = getNewFileName(originalFileName, targetFile);
  const directoryName = path.dirname(newFileName);
  if (!fs.existsSync(directoryName)) {
    fs.mkdirSync(directoryName, {
      recursive: true,
    });
  }
  fs.writeFileSync(newFileName, data);
}

files.forEach((file) => {
  csv({
    checkColumn: true,
  })
  .fromFile(file)
    .then((json: RawCountry[]) => {
      const regionCountriesArray = json.map(rawCountryToRegionCountry);
      let intermediateRegionsArray: Region[] = [];
      let regionsArray: Region[] = [];
      let subRegionsArray: Region[] = [];
      for (const country of regionCountriesArray) {
        intermediateRegionsArray = addCountryToRegion(intermediateRegionsArray, country, 'intermediateRegionCode', 'intermediateRegionName');
        regionsArray = addCountryToRegion(regionsArray, country, 'regionCode', 'regionName');
        subRegionsArray = addCountryToRegion(subRegionsArray, country, 'subRegionCode', 'subRegionName');
      }
      writeFile(file, 'countries', JSON.stringify(
        m49ArrayToM49Dictionary(
          json.map(rawCountryToCountry
        )
      ), null, 2));
      writeFile(file, 'intermediateRegions', JSON.stringify(
        m49ArrayToM49Dictionary(intermediateRegionsArray), null, 2));
      writeFile(file, 'regions', JSON.stringify(
        m49ArrayToM49Dictionary(regionsArray), null, 2));
      writeFile(file, 'subRegions', JSON.stringify(
        m49ArrayToM49Dictionary(subRegionsArray), null, 2));
    });
});
