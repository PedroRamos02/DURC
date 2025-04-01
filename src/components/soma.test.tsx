import soma from "./soma";

describe('Soma', () => {
  test('o resultado da soma 1 + 2 deverá ser igual a 3', () => {
    expect(soma(1, 2)).toBe(3);
  })
})