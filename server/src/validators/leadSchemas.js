import { z } from "zod";

export const leadStageSchema = z.enum([
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost"
]);

export const createLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  stage: leadStageSchema.optional(),
  value: z.number().nonnegative().nullable().optional(),
  companyId: z.number().int().positive().nullable().optional()
});

export const updateLeadSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  stage: leadStageSchema.optional(),
  value: z.number().nonnegative().nullable().optional(),
  companyId: z.number().int().positive().nullable().optional()
});