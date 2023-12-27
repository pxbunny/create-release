export function toKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

export class ArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArgumentError';
  }
}

export abstract class Guard {
  static againstEmptyOrWhiteSpace(value: string | undefined, name: string): void {
    if (!value || Guard.isBlank(value)) {
      throw new ArgumentError(`${name} is empty or white space`);
    }
  }

  private static isBlank(str?: string): boolean {
    return !str || /^\s*$/.test(str);
  }
}
