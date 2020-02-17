import * as fs from "fs";
import fetch from "node-fetch";

interface Currency {
  code: string;
  name: string;
  symbol: string;
}
interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}
interface RestCountry {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: Currency[];
  languages: Language[];
  translations: {
    [key: string]: string;
  };
  flag: URL["href"];
  regionalBlocs: [
    {
      acronym: string;
      name: string;
      otherAcronyms: string[];
      otherNames: string[];
    }
  ];
  cioc: string;
}

type MapAny = { [key: string]: any };

function writeFile(name: string, data: object) {
  fs.writeFile(
    `src/data/${name}.json`,
    JSON.stringify(data),
    { encoding: "utf8" },
    () => ({})
  );
}

fetch("https://restcountries.eu/rest/v2/all").then(async res => {
  let countries: RestCountry[] = await res.json();
  //TODO preprocess
  let alpha2: MapAny = {};
  let alpha3: MapAny = {};

  for (let country of countries) {
    alpha2[country.alpha2Code] = country;
    alpha3[country.alpha3Code] = country;
  }

  writeFile("alpha2", alpha2);
  writeFile("alpha3", alpha3);
  //Write original response to data.json file
  writeFile("data", countries);
});
