import { setFailed } from '@actions/core';
import { context } from '@actions/github';

import { getInputs } from './inputs';
import { setOutputs } from './outputs';
import { createRelease } from './release';

(async function run(): Promise<void> {
  try {
    const inputs = getInputs();
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      throw new Error('token not set');
    }

    const release = await createRelease(context.repo, inputs, token);
    setOutputs(release);
  } catch (error) {
    setFailed(error.message);
  }
})();
