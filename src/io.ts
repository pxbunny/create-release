import { getInput, setOutput } from '@actions/core';

import { Release } from './release';
import { toKebabCase } from './utils';

const EMPTY_ARRAY_SIZE = 0;

export type Inputs = {
  tagName: string;
  targetCommitish?: string;
  name?: string;
  body?: string;
  draft: boolean;
  prerelease: boolean;
  discussionCategoryName?: string;
  generateReleaseNotes: boolean;
  makeLatest: string;
};

export type InputsWithToken = Inputs & {
  token?: string;
};

function getStringInput(
  name: string,
  accepted: string[] = [],
  required = false
): string | undefined {
  const input = getInput(name, { required });

  if (!input) {
    return undefined;
  }

  if (accepted.length > EMPTY_ARRAY_SIZE && !accepted.includes(input.toLowerCase())) {
    throw new Error(`${name} must be one of ${accepted.join(', ')}`);
  }

  return input;
}

function getBooleanInput(name: string, required = false): boolean {
  return getStringInput(name, ['true', 'false'], required) === 'true';
}

export function getInputs(): InputsWithToken {
  const token = getStringInput('token');
  const tagName = getStringInput('tag-name', [], true)!;
  const targetCommitish = getStringInput('target-commitish');
  const name = getStringInput('name');
  const body = getStringInput('body');
  const draft = getBooleanInput('draft');
  const prerelease = getBooleanInput('prerelease');
  const discussionCategoryName = getStringInput('discussion-category-name');
  const generateReleaseNotes = getBooleanInput('generate-release-notes');
  const makeLatest = getStringInput('make-latest', ['true', 'false', 'legacy'])!;

  return {
    token,
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

export function setOutputs(release: Release): void {
  for (const [key, value] of Object.entries(release)) {
    const outputName = toKebabCase(key);
    setOutput(outputName, value);
  }
}
