import LeadCard from "./LeadCard";

const COLUMNS = ["LEAD", "CONTACTED", "POSITIVE", "MEETING", "CLIENT", "LOST"] as const;

type Lead = any;

const statusEmojis: { [key: string]: string } = {
  LEAD: "🎯",
  CONTACTED: "📞",
  POSITIVE: "👍",
  MEETING: "📅",
  CLIENT: "🤝",
  LOST: "❌",
};

const statusBgColors: { [key: string]: string } = {
  LEAD: "bg-blue-50",
  CONTACTED: "bg-purple-50",
  POSITIVE: "bg-green-50",
  MEETING: "bg-yellow-50",
  CLIENT: "bg-emerald-50",
  LOST: "bg-red-50",
};

const statusBorderColors: { [key: string]: string } = {
  LEAD: "border-blue-200",
  CONTACTED: "border-purple-200",
  POSITIVE: "border-green-200",
  MEETING: "border-yellow-200",
  CLIENT: "border-emerald-200",
  LOST: "border-red-200",
};

export default function KanbanBoard({ leads }: { leads: Lead[] }) {
  const grouped = Object.fromEntries(COLUMNS.map((s) => [s, [] as Lead[]]));
  for (const l of leads) grouped[l.status]?.push(l);

  return (
    <div className="grid gap-4 md:grid-cols-6 overflow-x-auto pb-4">
      {COLUMNS.map((status) => (
        <div
          key={status}
          className={`rounded-xl border-2 p-4 min-h-96 flex flex-col bg-white/10 backdrop-blur-sm ${statusBorderColors[status]}`}
        >
          <div className="mb-4 flex items-center justify-between sticky top-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">{statusEmojis[status]}</span>
              <div className="font-bold text-slate-900">{status}</div>
            </div>
            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white font-bold text-xs text-slate-700 shadow-sm">
              {grouped[status].length}
            </div>
          </div>
          <div className="grid gap-3 flex-1">
            {grouped[status].length === 0 ? (
              <div className="flex items-center justify-center h-32 text-center">
                <p className="text-sm text-slate-500">Aucun lead</p>
              </div>
            ) : (
              grouped[status].map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
