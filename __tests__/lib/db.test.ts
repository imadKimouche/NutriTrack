import {searchIngredient} from '../../src/database/handler';

describe('db', async () => {
  it('should search an ingredient by name', async () => {
    const searchText: string = 'Citron';
    // TODO: rename searchIngredients
    const ingredients = await searchIngredient(searchText);
    console.log('ingredients', ingredients);

    expect(ingredients).toBeDefined();
  });
});
