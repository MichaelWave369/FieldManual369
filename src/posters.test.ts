import {describe,it,expect} from 'vitest';
import {chapters} from './data';
import {posters,categories,posterAssetUrl} from './posters';

describe('Parallax curriculum archive mapping', () => {
  it('preserves 21 uniquely identified posters across all six collections', () => {
    expect(posters).toHaveLength(21);
    expect(new Set(posters.map(p=>p.number)).size).toBe(21);
    expect(new Set(posters.map(p=>p.file)).size).toBe(21);
    expect(new Set(posters.map(p=>p.category)).size).toBe(categories.length);
  });
  it('links every poster to an actual chapter and its expected file name', () => {
    const ids=new Set(chapters.map(c=>c.id));
    for(const poster of posters) {
      expect(ids.has(poster.chapterId),poster.title).toBe(true);
      expect(poster.file).toMatch(/^PBC-\d{2}-[\w-]+\.webp$/);
      expect(poster.file.startsWith('PBC-'+String(poster.number).padStart(2,'0'))).toBe(true);
    }
  });
  it('adds the nine newly recovered topics as complete chapters',()=>{
    expect(chapters).toHaveLength(19);
    expect(new Set(chapters.map(c=>c.id)).size).toBe(chapters.length);
    expect(chapters.filter(c=>c.essentials.length!==3)).toHaveLength(0);
  });
  it('uses the Vite base URL, not an absolute-root image URL',()=>{
    expect(posterAssetUrl(posters[0].file, '/FieldManual369/')).toBe('/FieldManual369/posters/'+posters[0].file);
  });
});
