import { z } from 'zod';

/**
 * Query string of `GET /api/hello`. The default lives in the schema rather than
 * in a controller so the browser and the server fill in the same value.
 */
export const HelloQuerySchema = z.object({
  name: z.string().trim().min(1).max(64).default('world'),
});
export type HelloQuery = z.infer<typeof HelloQuerySchema>;

export const HelloResponseSchema = z.object({
  message: z.string().min(1).max(280),
  service: z.string().min(1).optional(),
});
export type HelloResponse = z.infer<typeof HelloResponseSchema>;
