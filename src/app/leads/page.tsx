import { getLeads } from "../actions/leads";
import LeadCard from "@/components/LeadCard";

const STATUSES = ["", "LEAD", "CONTACTED", "POSITIVE", "MEETING", "CLIENT", "LOST"] as const;

export default async function LeadsPage({
  searchParams,
}: {
  searchParams?: { q?: string; status?: string };
}) {
  const q = searchParams?.q ?? "";
  const status = searchParams?.status ?? "";

  const leads = await getLeads({ q, status });

  return (
    <div className="grid gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-slate-900">Leads</h1>
        <p className="text-base text-slate-600">Gérez et suivez tous vos leads</p>
      </section>

      <form className="flex flex-col gap-4 p-5 md:flex-row md:items-end md:gap-3 rounded-xl border border-white/10 bg-white/40 backdrop-blur-sm shadow-lg">
        <div className="flex-1 min-w-fit">
          <input
            name="q"
            defaultValue={q}
            placeholder="Rechercher par nom ou entreprise..."
            className="w-full rounded-lg border border-slate-300 bg-white/70 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-slate-300 bg-white/70 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "" ? "Tous statuts" : s}
            </option>
          ))}
        </select>
        <button className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-blue-700 hover:to-blue-800">
          Filtrer
        </button>
      </form>

      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700">
          <span>📌</span>
          <span>{leads.length} résultat{leads.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="grid gap-3">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead as any} />
        ))}
      </div>
    </div>
  );
}
