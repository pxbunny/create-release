import { setFailed } from '@actions/core';
import { context } from '@actions/github';

import { getInputs } from './inputs';
import { createRelease } from './release';

(async function run(): Promise<void> {
  try {
    const inputs = getInputs();
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      throw new Error('token not set');
    }

    await createRelease(context.repo, inputs, token);
  } catch (error) {
    setFailed(error.message);
  }
})();
