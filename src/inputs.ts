import { getInput } from '@actions/core';

const EMPTY_ARRAY_SIZE = 0;

export type Inputs = {
  tagName: string;
  targetCommitish?: string;
  name?: string;
  body?: string;
  draft: boolean;
  prerelease: boolean;
  discussionCategoryName: string;
  generateReleaseNotes: boolean;
  makeLatest: string;
};

function getStringInput(
  name: string,
  accepted: string[] = [],
  required = false
): string {
  const input = getInput(name, { required });

  if (
    accepted.length > EMPTY_ARRAY_SIZE &&
    !accepted.includes(input.toLowerCase())
  ) {
    throw new Error(`${name} must be one of ${accepted.join(', ')}`);
  }

  return input;
}

function getBooleanInput(name: string, required = false): boolean {
  return getStringInput(name, ['true', 'false'], required) === 'true';
}

export function getInputs(): Inputs {
  const tagName = getStringInput('tag_name', [], true);
  const targetCommitish = getStringInput('target_commitish');
  const name = getStringInput('name');
  const body = getStringInput('body');
  const draft = getBooleanInput('draft');
  const prerelease = getBooleanInput('prerelease');
  const discussionCategoryName = getStringInput('discussion_category_name');
  const generateReleaseNotes = getBooleanInput('generate_release_notes');
  const makeLatest = getStringInput('make_latest', ['true', 'false', 'legacy']);

  return {
    tagName,
    targetCommitish,
    name,
    body,
    draft,
    prerelease,
    discussionCategoryName,
    generateReleaseNotes,
    makeLatest
  };
}
