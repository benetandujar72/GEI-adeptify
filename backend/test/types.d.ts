/// <reference types="jest" />

declare global {
  namespace jest {
    interface Matchers<R> {
      toContain: (expected: any) => R;
      toHaveProperty: (property: string, value?: any) => R;
      toBe: (expected: any) => R;
    }
  }
}

export {};
