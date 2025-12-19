import { z } from "zod";

export const leadStatusEnum = z.enum([
  "LEAD",
  "CONTACTED",
  "POSITIVE",
  "MEETING",
  "CLIENT",
  "LOST",
]);

export const leadChannelEnum = z.enum(["Instagram", "LinkedIn", "Email"]);
export const leadOfferEnum = z.enum(["UGC", "CM", "Ads", "Pack"]);

export const createLeadSchema = z.object({
  name: z.string().min(1, "name requis"),
  company: z.string().optional().or(z.literal("")),
  channel: leadChannelEnum,
  offer: leadOfferEnum,
  notes: z.string().optional().or(z.literal("")),
  owner: z.string().optional(),
  nextActionAt: z.string().optional().or(z.literal("")), // yyyy-mm-dd
});

export const updateLeadSchema = z.object({
  id: z.string().min(1),
  status: leadStatusEnum.optional(),
  notes: z.string().optional().or(z.literal("")),
  lastActionAt: z.date().optional().nullable(),
  nextActionAt: z.date().optional().nullable(),
});
