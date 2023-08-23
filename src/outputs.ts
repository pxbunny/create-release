import { setOutput } from '@actions/core';

import { toKebabCase } from './helpers';
import { Release } from './release';

export function setOutputs(release: Release): void {
  for (const [key, value] of Object.entries(release)) {
    const outputName = toKebabCase(key);
    setOutput(outputName, value);
  }
}
