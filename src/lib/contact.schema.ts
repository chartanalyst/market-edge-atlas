import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  organisation: z.string().trim().max(200).optional().default(""),
  topic: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(5000),
});

export type ContactPayload = z.infer<typeof contactSchema>;
