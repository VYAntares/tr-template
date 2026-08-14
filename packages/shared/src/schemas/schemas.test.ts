import { describe, expect, it } from 'vitest';

import { HealthResponseSchema, HelloQuerySchema, HelloResponseSchema } from './index';

describe('HelloQuerySchema', () => {
  it('fills in the default name', () => {
    expect(HelloQuerySchema.parse({})).toEqual({ name: 'world' });
  });

  it('trims the supplied name', () => {
    expect(HelloQuerySchema.parse({ name: '  ada  ' })).toEqual({ name: 'ada' });
  });

  it('rejects an empty name', () => {
    expect(HelloQuerySchema.safeParse({ name: '   ' }).success).toBe(false);
  });

  it('rejects a name past the limit', () => {
    expect(HelloQuerySchema.safeParse({ name: 'a'.repeat(65) }).success).toBe(false);
  });
});

describe('HelloResponseSchema', () => {
  it('accepts a message on its own', () => {
    expect(HelloResponseSchema.parse({ message: 'hello' })).toEqual({ message: 'hello' });
  });

  it('keeps the service name when present', () => {
    expect(HelloResponseSchema.parse({ message: 'hello', service: 'api' })).toEqual({
      message: 'hello',
      service: 'api',
    });
  });

  it('rejects an empty message', () => {
    expect(HelloResponseSchema.safeParse({ message: '' }).success).toBe(false);
  });
});

describe('HealthResponseSchema', () => {
  const healthy = {
    status: 'ok',
    service: 'api',
    version: '0.0.0',
    uptimeSeconds: 12,
    checkedAt: '2026-01-01T00:00:00.000Z',
    dependencies: [{ name: 'database', status: 'ok', latencyMs: 3 }],
  };

  it('accepts a well-formed body', () => {
    expect(HealthResponseSchema.parse(healthy)).toEqual(healthy);
  });

  it('defaults dependencies to an empty list', () => {
    const { dependencies: _dependencies, ...withoutDependencies } = healthy;
    expect(HealthResponseSchema.parse(withoutDependencies).dependencies).toEqual([]);
  });

  it('rejects an unknown dependency name', () => {
    const parsed = HealthResponseSchema.safeParse({
      ...healthy,
      dependencies: [{ name: 'kafka', status: 'ok', latencyMs: 1 }],
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects a negative latency', () => {
    const parsed = HealthResponseSchema.safeParse({
      ...healthy,
      dependencies: [{ name: 'redis', status: 'ok', latencyMs: -1 }],
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects a non-ISO timestamp', () => {
    expect(HealthResponseSchema.safeParse({ ...healthy, checkedAt: 'yesterday' }).success).toBe(
      false,
    );
  });
});
