import { getSubRegions } from './getSubRegions';

it('should default to English', async () => {
  const subRegions = await getSubRegions();
  expect(subRegions['202'].name).toBe('Sub-Saharan Africa');
  expect(subRegions['021'].name).toBe('Northern America');
});

it('should return the correct region name in Arabic', async () => {
  const subRegions = await getSubRegions('ar');
  expect(subRegions['202'].name).toBe('أفريقيا جنوب الصحراء الكبرى');
  expect(subRegions['021'].name).toBe('أمريكا الشمالية');
});

it('should return the correct region name in English', async () => {
  const subRegions = await getSubRegions('en');
  expect(subRegions['202'].name).toBe('Sub-Saharan Africa');
  expect(subRegions['021'].name).toBe('Northern America');
});

it('should return the correct region name in Spanish', async () => {
  const subRegions = await getSubRegions('es');
  expect(subRegions['202'].name).toBe('África Subsahariana');
  expect(subRegions['021'].name).toBe('América septentrional');
});

it('should return the correct region name in French', async () => {
  const subRegions = await getSubRegions('fr');
  expect(subRegions['202'].name).toBe('Afrique subsaharienne');
  expect(subRegions['021'].name).toBe('Amérique septentrionale');
});

it('should return the correct region name in Russian', async () => {
  const subRegions = await getSubRegions('ru');
  expect(subRegions['202'].name).toBe('Африка к югу от Сахары');
  expect(subRegions['021'].name).toBe('Северная Америка');
});

it('should return the correct region name in Chinese', async () => {
  const subRegions = await getSubRegions('zh');
  expect(subRegions['202'].name).toBe('撒哈拉以南非洲');
  expect(subRegions['021'].name).toBe('北美');
});
