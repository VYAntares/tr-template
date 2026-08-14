/**
 * @ft/shared is the contract layer.
 *
 * Every payload that crosses the network is declared once here as a Zod schema:
 * NestJS parses requests with it, Next parses form input and API responses with
 * it, and both derive their TypeScript types from the same `z.infer`. One edit,
 * both sides, and the two copies of a validation rule cannot drift apart.
 *
 * This package is a leaf. It must never import from apps/*.
 */
export * from './schemas';
