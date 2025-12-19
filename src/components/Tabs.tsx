"use client";

export default function Tabs({
  active,
  onChange,
}: {
  active: "today" | "pipeline";
  onChange: (t: "today" | "pipeline") => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange("today")}
        className={`rounded-md px-3 py-2 text-sm font-medium ${
          active === "today" ? "bg-black text-white" : "border bg-white"
        }`}
      >
        Today
      </button>
      <button
        onClick={() => onChange("pipeline")}
        className={`rounded-md px-3 py-2 text-sm font-medium ${
          active === "pipeline" ? "bg-black text-white" : "border bg-white"
        }`}
      >
        Pipeline
      </button>
    </div>
  );
}
