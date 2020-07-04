import { getRegions } from './getRegions';

it('should default to English', async () => {
  const regions = await getRegions();
  expect(regions['002'].name).toBe('Africa');
  expect(regions['019'].name).toBe('Americas');
});

it('should return the correct region name in Arabic', async () => {
  const regions = await getRegions('ar');
  expect(regions['002'].name).toBe('أفريقيا');
  expect(regions['019'].name).toBe('الأمريكتان');
});

it('should return the correct region name in English', async () => {
  const regions = await getRegions('en');
  expect(regions['002'].name).toBe('Africa');
  expect(regions['019'].name).toBe('Americas');
});

it('should return the correct region name in Spanish', async () => {
  const regions = await getRegions('es');
  expect(regions['002'].name).toBe('África');
  expect(regions['019'].name).toBe('Américas');
});

it('should return the correct region name in French', async () => {
  const regions = await getRegions('fr');
  expect(regions['002'].name).toBe('Afrique');
  expect(regions['019'].name).toBe('Amériques');
});

it('should return the correct region name in Russian', async () => {
  const regions = await getRegions('ru');
  expect(regions['002'].name).toBe('Африка');
  expect(regions['019'].name).toBe('Северная и Южная Америка');
});

it('should return the correct region name in Chinese', async () => {
  const regions = await getRegions('zh');
  expect(regions['002'].name).toBe('非洲');
  expect(regions['019'].name).toBe('美洲');
});
