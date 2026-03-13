import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(2),
  website: z.string().url().optional().or(z.literal("")),
  industry: z.string().optional()
});

export const updateCompanySchema = z.object({
  name: z.string().min(2).optional(),
  website: z.string().url().optional().or(z.literal("")),
  industry: z.string().optional()
});