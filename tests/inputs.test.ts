import { getInputs } from '../src/inputs';

function unsetEnvVariables() {
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
  ];

  inputEnvNames.forEach((name) => {
    delete process.env[name];
  });
}

describe('getInputs function', () => {
  it('should return the correct inputs', () => {
    // Arrange
    process.env['INPUT_TAG-NAME'] = 'v1.0.0';
    process.env['INPUT_TARGET-COMMITISH'] = 'master';
    process.env['INPUT_NAME'] = 'Release v1.0.0';
    process.env['INPUT_BODY'] = 'input body';
    process.env['INPUT_DRAFT'] = 'true';
    process.env['INPUT_PRERELEASE'] = 'true';
    process.env['INPUT_DISCUSSION-CATEGORY-NAME'] = 'discussion category';
    process.env['INPUT_GENERATE-RELEASE-NOTES'] = 'true';
    process.env['INPUT_MAKE-LATEST'] = 'legacy';

    // Act
    const inputs = getInputs();
    unsetEnvVariables();

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
});

describe('getInputs function', () => {
  it('should correctly set default inputs', () => {
    // Arrange
    process.env['INPUT_TAG-NAME'] = 'v1.0.0';
    process.env['INPUT_DRAFT'] = 'false';
    process.env['INPUT_PRERELEASE'] = 'false';
    process.env['INPUT_GENERATE-RELEASE-NOTES'] = 'false';
    process.env['INPUT_MAKE-LATEST'] = 'false';

    // Act
    const inputs = getInputs();
    unsetEnvVariables();

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
    // Arrange

    // Act
    const actual = () => getInputs();
    unsetEnvVariables();

    // Assert
    expect(actual).toThrowError('Input required and not supplied: tag-name');
  });
});
