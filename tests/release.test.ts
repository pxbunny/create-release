import { Release, createRelease } from '../src/release';

const createReleaseMock = jest.fn().mockReturnValue({
  data: {
    id: 1,
    node_id: 'node_id',
    url: 'url',
    html_url: 'html_url',
    assets_url: 'assets_url',
    upload_url: 'upload_url',
    tarball_url: 'tarball_url',
    zipball_url: 'zipball_url',
    tag_name: 'tag_name',
    target_commitish: 'target_commitish',
    name: 'name',
    body: 'body',
    draft: true,
    prerelease: false
  }
});

jest.mock('@actions/github', () => ({
  getOctokit: jest.fn(() => ({
    rest: {
      repos: {
        createRelease: createReleaseMock
      }
    }
  }))
}));

describe('createRelease function', () => {
  const repoContext = {
    owner: 'owner',
    repo: 'repo'
  };

  const inputs = {
    tagName: 'v1.0.0',
    targetCommitish: 'master',
    name: 'Release v1.0.0',
    body: 'input body',
    draft: true,
    prerelease: false,
    discussionCategoryName: 'discussion category',
    generateReleaseNotes: true,
    makeLatest: 'legacy'
  };

  it('should create a release', async () => {
    const release = await createRelease(repoContext, inputs, 'token');

    expect(release).toEqual({
      id: 1,
      nodeId: 'node_id',
      url: 'url',
      htmlUrl: 'html_url',
      assetsUrl: 'assets_url',
      uploadUrl: 'upload_url',
      tarballUrl: 'tarball_url',
      zipballUrl: 'zipball_url',
      tagName: 'tag_name',
      targetCommitish: 'target_commitish',
      name: 'name',
      body: 'body',
      draft: true,
      prerelease: false
    } as Release);
  });

  it('should call an API with specific values', async () => {
    await createRelease(repoContext, inputs, 'token');

    expect(createReleaseMock).toHaveBeenCalledWith({
      ...repoContext,
      tag_name: 'v1.0.0',
      target_commitish: 'master',
      name: 'Release v1.0.0',
      body: 'input body',
      draft: true,
      prerelease: false,
      discussion_category_name: 'discussion category',
      generate_release_notes: true,
      make_latest: 'legacy'
    });
  });
});
