"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { advanceStatus, quickLost, quickMeeting, quickRelanceToday } from "@/app/actions/leads";

export default function LeadQuickActions({ id }: { id: string }) {
  const [meetingDate, setMeetingDate] = useState("");
  const router = useRouter();

  async function run(fn: () => Promise<any>) {
    await fn();
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => run(() => quickRelanceToday(id))}
        className="rounded-md border px-2 py-1 text-xs font-medium hover:bg-gray-50"
        title="Relancé aujourd'hui : lastActionAt=now, nextActionAt=+2j, status=CONTACTED si était LEAD"
      >
        Relance aujourd’hui
      </button>

      <div className="flex items-center gap-2 rounded-md border px-2 py-1">
        <input
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          className="text-xs"
        />
        <button
          disabled={!meetingDate}
          onClick={() => run(() => quickMeeting(id, meetingDate))}
          className="text-xs font-medium disabled:opacity-40"
        >
          RDV pris
        </button>
      </div>

      <button
        onClick={() => run(() => quickLost(id))}
        className="rounded-md border px-2 py-1 text-xs font-medium hover:bg-gray-50"
      >
        Perdu
      </button>

      <button
        onClick={() => run(() => advanceStatus(id))}
        className="rounded-md bg-black px-2 py-1 text-xs font-medium text-white"
      >
        Avancer →
      </button>
    </div>
  );
}
