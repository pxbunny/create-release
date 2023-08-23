import { getInput } from '@actions/core';

const EMPTY_ARRAY_SIZE = 0;

export type Inputs = {
  tagName: string;
  targetCommitish: string;
  name: string;
  body?: string;
  draft?: boolean;
  prerelease?: boolean;
  discussionCategoryName?: string;
  generateReleaseNotes?: boolean;
  makeLatest?: boolean;
};

function getStringInput(
  name: string,
  xd: string[] = [],
  required = false
): string {
  const input = getInput(name, { required });

  if (xd.length > EMPTY_ARRAY_SIZE && !xd.includes(input.toLowerCase())) {
    throw new Error(`${name} must be one of ${xd.join(', ')}`);
  }

  return input;
}

function getBooleanInput(name: string, required = false): boolean {
  return getStringInput(name, ['true', 'false'], required) === 'true';
}

export function getInputs(): Inputs {
  const tagName = getStringInput('tag_name', [], true);
  const targetCommitish = getStringInput('target_commitish', [], true);
  const name = getStringInput('name', [], true);
  const body = getStringInput('body');
  const draft = getBooleanInput('draft');
  const prerelease = getBooleanInput('prerelease');
  const discussionCategoryName = getStringInput('discussion_category_name');
  const generateReleaseNotes = getBooleanInput('generate_release_notes');
  const makeLatest = getBooleanInput('make_latest');

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
