import LeadQuickActions from "./LeadQuickActions";

type Lead = {
  id: string;
  name: string;
  company: string | null;
  channel: string;
  offer: string;
  status: string;
  nextActionAt: Date | null;
  notes: string | null;
};

const statusColors: { [key: string]: string } = {
  LEAD: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-purple-100 text-purple-700",
  POSITIVE: "bg-green-100 text-green-700",
  MEETING: "bg-yellow-100 text-yellow-700",
  CLIENT: "bg-emerald-100 text-emerald-700",
  LOST: "bg-red-100 text-red-700",
};

export default function LeadCard({ lead }: { lead: Lead }) {
  const statusColor = statusColors[lead.status] || "bg-slate-100 text-slate-700";
  
  return (
    <div className="overflow-hidden p-4 rounded-xl border border-white/10 bg-white/40 backdrop-blur-sm shadow-lg transition-shadow duration-200 hover:shadow-2xl group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-slate-900 truncate">{lead.name}</h3>
          <div className="mt-2 text-sm text-slate-600">
            {lead.company && (
              <span className="block font-medium text-slate-700 mb-1">{lead.company}</span>
            )}
            <span className="text-slate-500">
              {lead.channel} · {lead.offer}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
              {lead.status}
            </span>
            {lead.nextActionAt && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                <span>📅</span>
                {new Date(lead.nextActionAt).toLocaleDateString('fr-FR')}
              </span>
            )}
          </div>
          {lead.notes && (
            <div className="mt-3 text-sm text-slate-700 bg-slate-50 rounded-lg p-2.5 italic border border-slate-200">
              "{lead.notes}"
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <LeadQuickActions id={lead.id} />
      </div>
    </div>
  );
}
