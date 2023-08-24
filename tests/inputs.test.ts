import { getInputs } from '../src/inputs';

const inputEnvNames = [
  'INPUT_TAG-NAME',
  'INPUT_TARGET-COMMITISH',
  'INPUT_NAME',
  'INPUT_BODY',
  'INPUT_DRAFT',
  'INPUT_PRERELEASE',
  'INPUT_DISCUSSION-CATEGORY-NAME',
  'INPUT_GENERATE-RELEASE-NOTES',
  'INPUT_MAKE-LATEST'
] as const;

function setInput(name: (typeof inputEnvNames)[number], value: string) {
  process.env[name] = value;
}

describe('getInputs function', () => {
  afterEach(() => {
    inputEnvNames.forEach((name) => {
      delete process.env[name];
    });
  });

  it('should return the correct inputs', () => {
    // Arrange
    setInput('INPUT_TAG-NAME', 'v1.0.0');
    setInput('INPUT_TARGET-COMMITISH', 'master');
    setInput('INPUT_NAME', 'Release v1.0.0');
    setInput('INPUT_BODY', 'input body');
    setInput('INPUT_DRAFT', 'true');
    setInput('INPUT_PRERELEASE', 'true');
    setInput('INPUT_DISCUSSION-CATEGORY-NAME', 'discussion category');
    setInput('INPUT_GENERATE-RELEASE-NOTES', 'true');
    setInput('INPUT_MAKE-LATEST', 'legacy');

    // Act
    const inputs = getInputs();

    // Assert
    expect(inputs).toEqual({
      tagName: 'v1.0.0',
      targetCommitish: 'master',
      name: 'Release v1.0.0',
      body: 'input body',
      draft: true,
      prerelease: true,
      discussionCategoryName: 'discussion category',
      generateReleaseNotes: true,
      makeLatest: 'legacy'
    });
  });

  it('should correctly set default inputs', () => {
    // Arrange
    setInput('INPUT_TAG-NAME', 'v1.0.0');
    setInput('INPUT_DRAFT', 'false');
    setInput('INPUT_PRERELEASE', 'false');
    setInput('INPUT_GENERATE-RELEASE-NOTES', 'false');
    setInput('INPUT_MAKE-LATEST', 'false');

    // Act
    const inputs = getInputs();

    // Assert
    expect(inputs).toEqual({
      tagName: 'v1.0.0',
      targetCommitish: undefined,
      name: undefined,
      body: undefined,
      draft: false,
      prerelease: false,
      discussionCategoryName: undefined,
      generateReleaseNotes: false,
      makeLatest: 'false'
    });
  });

  it('should throw an error if the tag name is not provided', () => {
    const actual = () => getInputs();
    expect(actual).toThrowError('Input required and not supplied: tag-name');
  });
});
