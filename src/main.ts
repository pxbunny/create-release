import { setFailed } from '@actions/core';
import { context } from '@actions/github';

import { getInputs, setOutputs } from './io';
import { createRelease } from './release';
import { Guard } from './utils';

(async (): Promise<void> => {
  try {
    const inputs = getInputs();
    const token = process.env.GITHUB_TOKEN;
    Guard.againstEmptyOrWhiteSpace(token, 'GITHUB_TOKEN');

    const release = await createRelease(context.repo, inputs, token!);
    setOutputs(release);
  } catch (error) {
    setFailed(error.message);
  }
})();
