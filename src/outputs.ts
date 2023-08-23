import { setOutput } from '@actions/core';

import { toSnakeCase } from './helpers';
import { Release } from './release';

export function setOutputs(release: Release): void {
  for (const [key, value] of Object.entries(release)) {
    const outputName = toSnakeCase(key);
    setOutput(outputName, value);
  }
}
