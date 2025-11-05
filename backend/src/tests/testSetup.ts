/**
 * @summary
 * Global test environment setup and configuration
 *
 * @module tests/testSetup
 */

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

afterAll(() => {
  // Cleanup logic
});
