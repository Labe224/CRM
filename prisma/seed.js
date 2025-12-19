const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.lead.count();
  if (count > 0) return;

  const now = new Date();
  const plusDays = (d) => new Date(now.getTime() + d * 24 * 60 * 60 * 1000);

  await prisma.lead.createMany({
    data: [
      {
        name: "Alpha Barry",
        company: "IDIXUS",
        channel: "LinkedIn",
        offer: "Pack",
        status: "LEAD",
        nextActionAt: plusDays(0),
        notes: "Premier contact à faire aujourd’hui.",
      },
      {
        name: "Sophie Martin",
        company: "Studio Vert",
        channel: "Instagram",
        offer: "UGC",
        status: "CONTACTED",
        lastActionAt: now,
        nextActionAt: plusDays(2),
        notes: "Relancée, attendre réponse.",
      },
      {
        name: "Nabil Ahmed",
        company: "N-Consult",
        channel: "Email",
        offer: "Ads",
        status: "POSITIVE",
        nextActionAt: plusDays(1),
        notes: "Intéressé, proposer créneau.",
      },
      {
        name: "Camille Leroy",
        company: "Maison L",
        channel: "Instagram",
        offer: "CM",
        status: "MEETING",
        nextActionAt: plusDays(3),
        notes: "RDV planifié (à confirmer).",
      },
      {
        name: "Oumar Diallo",
        company: "O-Tech",
        channel: "LinkedIn",
        offer: "Pack",
        status: "LOST",
        notes: "Pas le bon timing.",
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
