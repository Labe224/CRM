'use server';

// Server actions for leads management
"use server";

import { prisma } from "@/lib/prisma";
import { createLeadSchema, updateLeadSchema, leadStatusEnum } from "@/lib/leadSchemas";

// Helpers dates "today" en timezone locale (approche simple)
function startOfTodayLocal() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
function endOfTodayLocal() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

export type GetLeadsParams = {
  status?: string;
  q?: string;
  todayOnly?: boolean;
};

export async function getLeads(params: GetLeadsParams = {}) {
  const { status, q, todayOnly } = params;

  const where: any = {};

  if (status && leadStatusEnum.safeParse(status).success) {
    where.status = status;
  }

  if (q && q.trim().length > 0) {
    where.OR = [
      { name: { contains: q.trim(), mode: "insensitive" } },
      { company: { contains: q.trim(), mode: "insensitive" } },
    ];
  }

  if (todayOnly) {
    where.nextActionAt = {
      gte: startOfTodayLocal(),
      lte: endOfTodayLocal(),
    };
  }

  return prisma.lead.findMany({
    where,
    orderBy: [{ nextActionAt: "asc" }, { updatedAt: "desc" }],
  });
}

export async function createLead(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());

  const parsed = createLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }

  const { name, company, channel, offer, notes, owner, nextActionAt } = parsed.data;

  const nextDate =
    nextActionAt && nextActionAt.length > 0
      ? new Date(`${nextActionAt}T09:00:00`)
      : null;

  const lead = await prisma.lead.create({
    data: {
      name,
      company: company && company.length > 0 ? company : null,
      channel,
      offer,
      notes: notes && notes.length > 0 ? notes : null,
      owner: owner && owner.length > 0 ? owner : "Wann",
      nextActionAt: nextDate,
    },
  });

  return { ok: true as const, lead };
}

export async function updateLead(input: unknown) {
  const parsed = updateLeadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }

  const { id, ...data } = parsed.data;

  const lead = await prisma.lead.update({
    where: { id },
    data,
  });

  return { ok: true as const, lead };
}

export async function deleteLead(id: string) {
  if (!id) return { ok: false as const, error: "id requis" };
  await prisma.lead.delete({ where: { id } });
  return { ok: true as const };
}

// Actions rapides UX
export async function quickRelanceToday(id: string) {
  const now = new Date();
  const plus2 = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

  const lead = await prisma.lead.update({
    where: { id },
    data: {
      lastActionAt: now,
      nextActionAt: plus2,
      status: "CONTACTED",
    },
  });

  return { ok: true as const, lead };
}

export async function quickMeeting(id: string, yyyyMmDd: string) {
  const date = new Date(`${yyyyMmDd}T09:00:00`);
  const lead = await prisma.lead.update({
    where: { id },
    data: {
      status: "MEETING",
      nextActionAt: date,
    },
  });
  return { ok: true as const, lead };
}

export async function quickLost(id: string) {
  const lead = await prisma.lead.update({
    where: { id },
    data: {
      status: "LOST",
      nextActionAt: null,
    },
  });
  return { ok: true as const, lead };
}

const STATUS_ORDER = ["LEAD", "CONTACTED", "POSITIVE", "MEETING", "CLIENT", "LOST"] as const;

export async function advanceStatus(id: string) {
  const current = await prisma.lead.findUnique({ where: { id } });
  if (!current) return { ok: false as const, error: "Lead introuvable" };

  const idx = STATUS_ORDER.indexOf(current.status as any);
  const next = idx >= 0 && idx < STATUS_ORDER.length - 1 ? STATUS_ORDER[idx + 1] : current.status;

  const lead = await prisma.lead.update({
    where: { id },
    data: { status: next },
  });

  return { ok: true as const, lead };
}
