import { toKebabCase } from '../src/helpers';

describe('toKebabCase function', () => {
  test.each([
    ['camelCase', 'camel-case'],
    ['camelCaseTest', 'camel-case-test'],
    ['camelCaseTestValue', 'camel-case-test-value'],
    ['camel123Case', 'camel123-case']
  ])(
    'should correctly transform camel case to kebab case',
    (value, expected) => {
      const actual = toKebabCase(value);
      expect(actual).toEqual(expected);
    }
  );

  it('should not change already kebab case strings', () => {
    const expected = 'kebab-case';
    const actual = toKebabCase(expected);
    expect(actual).toEqual(expected);
  });
});
