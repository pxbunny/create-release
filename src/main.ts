import { setFailed } from '@actions/core';
import { context } from '@actions/github';

import { getInputs, setOutputs } from './io';
import { createRelease } from './release';
import { Guard } from './utils';

(async (): Promise<void> => {
  try {
    const { token: inputToken, ...inputs } = getInputs();
    const envToken = process.env.GITHUB_TOKEN;
    const token = inputToken ?? envToken;
    Guard.againstEmptyOrWhiteSpace(token, 'token');

    const release = await createRelease(context.repo, inputs, token!);
    setOutputs(release);
  } catch (error) {
    setFailed(error.message);
  }
})();
