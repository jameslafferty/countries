import React, { useEffect, useState } from 'react';
import { getCountries } from './getCountries';
import { Country } from './types/Country';
import { IntermediateRegionCode } from './types/IntermediateRegionCode';
import { RegionCode } from './types/RegionCode';
import { SubregionCode } from './types/SubregionCode';
import { getRegions } from './getRegions';

type CheckboxValueField = 'isoAlpha3' | 'm49' | 'name';

type SupportedLocale = 'ar' | 'en' | 'es' | 'fr' | 'ru' | 'zh';

interface CountriesCheckboxesStateProps {
  excludeIntermediateRegions: IntermediateRegionCode[];
  includeIntermediateRegions: IntermediateRegionCode[];
  excludeRegions: RegionCode[];
  includeRegions: RegionCode[];
  excludeSubregions: SubregionCode[];
  includeSubregions: SubregionCode[];
  checkboxValueField: CheckboxValueField;
  locale: SupportedLocale;
}

const excludeIntermediateRegions: IntermediateRegionCode[] = [];
const includeIntermediateRegions: IntermediateRegionCode[] = [];
const excludeRegions: RegionCode[] = [];
const includeRegions: RegionCode[] = [];
const excludeSubregions: SubregionCode[] = [];
const includeSubregions: SubregionCode[] = [];

const DEFAULT_PROPS = {
  excludeIntermediateRegions,
  includeIntermediateRegions,
  excludeRegions,
  includeRegions,
  excludeSubregions,
  includeSubregions,
  checkboxValueField: 'm49' as CheckboxValueField,
  locale: 'en' as SupportedLocale,
};

interface CountryCheckboxProps {
  inputName: string;
  label: string;
  value: string;
}
const CountryCheckbox: React.FC<CountryCheckboxProps> = (props) => {
  const {
    inputName,
    label,
    value,
  } = props;
  return (
    <label>
      <input
        name={inputName}
        type="checkbox"
        value={value}
      />
      <span>
        {label}
      </span>
    </label>
  );
};

const countryToCheckboxProps = (country: Country, checkboxValueField: CheckboxValueField = 'm49'): CountryCheckboxProps => ({
  inputName: '',
  label: country.name,
  value: country[checkboxValueField],
});

type CountriesCheckboxesProps = Partial<CountriesCheckboxesStateProps>;
export const CountriesCheckboxes: React.FC<CountriesCheckboxesProps> = (props = DEFAULT_PROPS) => {
  const {
    // excludeRegions,
    // includeRegions,
    // excludeSubregions,
    // includeSubregions,
    checkboxValueField,
    locale,
  } = {
    ...DEFAULT_PROPS,
    ...props,
  };
  useEffect(() => {
    const fetchCountries  = async () => {
      const r = await getRegions(locale);
      const c = await getCountries(locale);
      if (c == null) {
        throw new Error('Countries could not be found.');
      }
      Object.entries(r).map((entry) => {
        const { 0: code, 1: region} = entry;
        if (code === 'default') {
          return null;
        }
        const countries = region.countries.map(m49 => c[m49]);
        const { name, m49 } = region;
        return {
          countries,
          m49,
          name,
        }
      })
        .filter(r => r != null);
      updateCountries(Object.values(c));

    };
    if (countries == null) {
      fetchCountries();
    }
  });
  const [countries, updateCountries] = useState<Country[]>();
  // const [regions, updateRegions] = useState<Region[]>();
  // const [subRegions, updateSubRegions] = useState<Region[]>();
  return (
    <div>
      {countries == null ? <></> : countries.map(c => countryToCheckboxProps(c, checkboxValueField)).map((p, i) => <CountryCheckbox key={i} {...p}  />)}
    </div>
  );
};
