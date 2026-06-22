// pricingCard.jsx
// Self-contained reference implementation of the glass pricing cards.
// No relative imports here on purpose so you can preview it standalone —
// when you copy it into your project, swap the pieces marked below for
// your own atoms (Heading, Paragraph, Label) if you want full consistency.

const services = [
  {
    id: "dashboard",
    badge: "Starter",
    highlighted: false,
    title: "System Dashboard",
    description:
      "Visualisasi data operasional real-time dalam satu panel kontrol yang terintegrasi dan mudah dipahami.",
    priceLabel: "MULAI DARI",
    price: "Comming",
    priceUnit: "/ bulan",
    priceNote: "Setup + lisensi termasuk",
    features: [
      "Custom dashboard & widget",
      "Integrasi sumber data",
      "Alert & notifikasi otomatis",
      "Support onboarding 30 hari",
    ],
  },
  {
    id: "agentic",
    badge: "Paling Diminati",
    highlighted: true,
    title: "AI Agentic Implementation",
    description:
      "Agen AI otonom yang bekerja di alur bisnis kamu — mengeksekusi tugas, membuat keputusan, dan melaporkan hasilnya.",
    priceLabel: "MULAI DARI",
    price: "Comming",
    priceUnit: "/ proyek",
    priceNote: "Termasuk riset & deployment",
    features: [
      "Analisis alur kerja eksisting",
      "Desain & training agen AI",
      "Integrasi API & sistem internal",
      "Monitoring & iterasi pasca-launch",
    ],
  },
  {
    id: "csai",
    badge: "Customer Ops",
    highlighted: false,
    title: "Costume Tech Solution",
    description:
      "Sistem layanan pelanggan berbasis AI yang merespons, mengklasifikasikan, dan mengeskalasi tiket secara cerdas.",
    priceLabel: "MULAI DARI",
    price: "Comming",
    priceUnit: "/ bulan",
    priceNote: "Per channel yang diaktifkan",
    features: [
      "AI responder multi-channel",
      "Klasifikasi & routing otomatis",
      "Knowledge base terintegrasi",
      "Laporan performa bulanan",
    ],
  },
];

function PlanBadge({ children, highlighted }) {
  // In your real project this can just be <Label variant="glass"> if your
  // Label atom accepts a className override for the violet highlight state.
  return (
    <span
      className={
        "inline-flex w-fit items-center rounded-full border px-4 py-1.5 text-sm font-medium " +
        (highlighted
          ? "border-violet-400/40 bg-violet-500/10 text-violet-300"
          : "border-white/15 bg-white/[0.03] text-white/70")
      }
    >
      {children}
    </span>
  );
}

function PricingCard({ service }) {
  const {
    badge,
    highlighted,
    title,
    description,
    priceLabel,
    price,
    priceUnit,
    priceNote,
    features,
  } = service;

  return (
    <div
      className={
        "flex h-full flex-col rounded-[28px] border p-8 backdrop-blur-xl transition-colors duration-300 " +
        (highlighted
          ? "border-violet-400/30 bg-white/[0.04] hover:border-violet-400/50"
          : "border-white/10 bg-white/[0.02] hover:border-white/20")
      }
    >
      <PlanBadge highlighted={highlighted}>{badge}</PlanBadge>

      {/* swap for <Heading level={3}> if it matches this size in your atom */}
      <h3 className="mt-6 text-2xl font-bold leading-snug text-white">
        {title}
      </h3>

      {/* swap for <Paragraph> if its default size/color matches */}
      <p className="mt-3 text-[15px] leading-relaxed text-white/50">
        {description}
      </p>

      <div className="mt-auto pt-10">
        <div className="h-px w-full bg-white/10" />

        <div className="pt-7">
          <span className="text-xs font-semibold tracking-wider text-white/40">
            {priceLabel}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[34px] font-extrabold text-white">
              {price}
            </span>
            <span className="text-sm text-white/40">{priceUnit}</span>
          </div>
          <p className="mt-1 text-sm text-white/40">{priceNote}</p>
        </div>

        <ul className="mt-6 space-y-3.5">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-[15px] text-white/70"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/30" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PricingCardsGrid() {
  return (
    <div className="w-full py-16">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <PricingCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}