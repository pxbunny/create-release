import { Guard, toKebabCase } from '../src/utils';

describe('toKebabCase function', () => {
  test.each([
    ['camelCase', 'camel-case'],
    ['camelCaseTest', 'camel-case-test'],
    ['camelCaseTestValue', 'camel-case-test-value'],
    ['camel123Case', 'camel123-case']
  ])('should correctly transform camel case to kebab case', (value, expected) => {
    const actual = toKebabCase(value);
    expect(actual).toEqual(expected);
  });

  it('should not change already kebab case strings', () => {
    const expected = 'kebab-case';
    const actual = toKebabCase(expected);
    expect(actual).toEqual(expected);
  });
});

describe('Guard class', () => {
  describe('againstEmptyOrWhiteSpace method', () => {
    it('should throw an error if the value is empty', () => {
      expect(() => Guard.againstEmptyOrWhiteSpace('', 'name')).toThrowError(
        'name is empty or white space'
      );
    });

    it('should throw an error if the value is white space', () => {
      expect(() => Guard.againstEmptyOrWhiteSpace(' ', 'name')).toThrowError(
        'name is empty or white space'
      );
    });

    it('should not throw an error if the value is not empty or white space', () => {
      expect(() => Guard.againstEmptyOrWhiteSpace('value', 'name')).not.toThrow();
    });
  });
});
