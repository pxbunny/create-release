import { getOctokit } from '@actions/github';

import { Inputs } from './inputs';

type RepoContext = {
  owner: string;
  repo: string;
};

export type Release = {
  id: number;
  nodeId: string;
  url: string;
  htmlUrl: string;
  assetsUrl: string;
  uploadUrl: string;
  tarballUrl?: string;
  zipballUrl?: string;
  tagName: string;
  targetCommitish: string;
  name?: string;
  body?: string;
  draft: boolean;
  prerelease: boolean;
  createdAt: string;
  publishedAt?: string;
};

export async function createRelease(
  repoContext: RepoContext,
  inputs: Inputs,
  token: string
): Promise<Release> {
  const { repos } = getOctokit(token).rest;
  const {
    tagName,
    targetCommitish,
    discussionCategoryName,
    generateReleaseNotes,
    makeLatest
  } = inputs;

  const { data } = await repos.createRelease({
    ...repoContext,
    ...inputs,
    tag_name: tagName,
    target_commitish: targetCommitish,
    discussion_category_name: discussionCategoryName,
    generate_release_notes: generateReleaseNotes,
    make_latest: makeLatest
  });

  const {
    node_id,
    html_url,
    assets_url,
    upload_url,
    tarball_url,
    zipball_url,
    tag_name,
    target_commitish,
    created_at,
    published_at
  } = data;

  return {
    ...data,
    nodeId: node_id,
    htmlUrl: html_url,
    assetsUrl: assets_url,
    uploadUrl: upload_url,
    tarballUrl: tarball_url ?? undefined,
    zipballUrl: zipball_url ?? undefined,
    tagName: tag_name,
    targetCommitish: target_commitish,
    createdAt: created_at,
    publishedAt: published_at ?? undefined
  } as Release;
}
