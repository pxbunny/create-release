import { getOctokit } from '@actions/github';

import { Inputs } from './inputs';

type RepoContext = {
  owner: string;
  repo: string;
};

export async function createRelease(
  repoContext: RepoContext,
  inputs: Inputs,
  token: string
): Promise<void> {
  const { repos } = getOctokit(token).rest;
  const {
    tagName,
    targetCommitish,
    discussionCategoryName,
    generateReleaseNotes,
    makeLatest
  } = inputs;

  await repos.createRelease({
    ...repoContext,
    ...inputs,
    tag_name: tagName,
    target_commitish: targetCommitish,
    discussion_category_name: discussionCategoryName,
    generate_release_notes: generateReleaseNotes,
    make_latest: makeLatest
  });
}
