import Link from "next/link";
import AddLeadModal from "./AddLeadModal";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">IDIXUS CRM</div>
          <nav className="flex gap-1 text-sm font-medium">
            <Link className="rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900" href="/">
              Dashboard
            </Link>
            <Link className="rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900" href="/leads">
              Leads
            </Link>
          </nav>
        </div>
        <AddLeadModal />
      </div>
    </header>
  );
}
