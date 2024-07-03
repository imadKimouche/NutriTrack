import {searchIngredient} from '../../src/database/handler';

describe('db', () => {
  it('should search an ingredient by name', async () => {
    const searchText: string = 'Citron';
    const ingredients = await searchIngredient(searchText);

    expect(ingredients).toBeDefined();
  });
});
