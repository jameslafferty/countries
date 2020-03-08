import { RegionCode } from './RegionCode';
import { SubregionCode } from './SubregionCode';
import { IntermediateRegionCode } from './IntermediateRegionCode';
export interface Country {
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
