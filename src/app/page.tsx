import { getLeads } from "./actions/leads";
import KanbanBoard from "@/components/KanbanBoard";

export default async function Page() {
  const todayLeads = await getLeads({ todayOnly: true });
  const allLeads = await getLeads({});

  return (
    <div className="grid gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-base text-slate-600">Relances à faire aujourd'hui</p>
      </section>

      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">📋 À faire aujourd'hui</h2>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">{todayLeads.length} lead{todayLeads.length !== 1 ? 's' : ''}</div>
        </div>
        <div className="grid gap-3">
          {todayLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border border-white/10 bg-white/40 backdrop-blur-sm shadow-lg">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-lg font-medium text-slate-600">Rien à relancer aujourd'hui</p>
              <p className="text-sm text-slate-500 mt-1">Vous êtes à jour!</p>
            </div>
          ) : (
            todayLeads.map((lead) => (
              <div key={lead.id} className="p-4 rounded-xl border border-white/10 bg-white/40 backdrop-blur-sm shadow-lg border-l-4 border-l-blue-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-bold text-lg text-slate-900">{lead.name}</div>
                    <div className="text-sm text-slate-600 mt-1">
                      {lead.company && <span className="font-medium text-slate-700">{lead.company}</span>}
                      {lead.company && ' · '}
                      <span>{lead.channel}</span>
                      {' · '}
                      <span className="font-medium">{lead.offer}</span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">{lead.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">📈 Pipeline des leads</h2>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-700">{allLeads.length} total</div>
        </div>
        <KanbanBoard leads={allLeads} />
      </section>
    </div>
  );
}
