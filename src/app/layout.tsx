import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "IDIXUS CRM",
  description: "Mini CRM interne",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
