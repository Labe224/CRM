"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLead } from "@/app/actions/leads";

export default function AddLeadModal() {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setErr(null);
    const res = await createLead(formData);
    if (!res.ok) {
      setErr("Validation échouée (vérifie name/channel/offer).");
      return;
    }
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-blue-700 hover:to-blue-800"
      >
        ➕ Ajouter un lead
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl animate-in scale-in duration-200">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Ajouter un nouveau lead</h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            {err && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 font-medium">
                ⚠️ {err}
              </div>
            )}

            <form action={onSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-700">Nom du lead *</label>
                <input 
                  name="name" 
                  className="rounded-lg border border-slate-300 bg-white/90 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" 
                  placeholder="Ex: Jean Dupont" 
                  required
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-700">Entreprise</label>
                <input 
                  name="company" 
                  className="rounded-lg border border-slate-300 bg-white/90 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" 
                  placeholder="Ex: Acme Corp (optionnel)" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-slate-700">Canal</label>
                  <select name="channel" className="rounded-lg border border-slate-300 bg-white/90 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" defaultValue="LinkedIn">
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Email">Email</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-slate-700">Offre</label>
                  <select name="offer" className="rounded-lg border border-slate-300 bg-white/90 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" defaultValue="Pack">
                    <option value="UGC">UGC</option>
                    <option value="CM">CM</option>
                    <option value="Ads">Ads</option>
                    <option value="Pack">Pack</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-700">Prochaine action</label>
                <input name="nextActionAt" type="date" className="rounded-lg border border-slate-300 bg-white/90 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-700">Notes</label>
                <textarea name="notes" className="rounded-lg border border-slate-300 bg-white/90 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none" rows={3} placeholder="Ajoute tes notes ici... (optionnel)" />
              </div>

              <div className="mt-2 flex gap-3">
                <button type="submit" className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-blue-700 hover:to-blue-800">
                  ✅ Créer le lead
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
