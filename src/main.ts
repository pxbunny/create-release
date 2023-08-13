import { getInput, setFailed, setOutput } from '@actions/core';

try {
  const input = getInput('input');

  setOutput('output', input);
} catch (error) {
  setFailed(error.message);
}
