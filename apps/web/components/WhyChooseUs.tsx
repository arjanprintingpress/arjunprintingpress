const FEATURES = [
  {
    title: "75+ Years Experience",
    description: "Decades of expertise in the printing industry with a proven track record.",
    icon: (
      <>
        <circle cx="16" cy="12" r="7" />
        <path d="M11 18l-2 8 7-4 7 4-2-8" />
      </>
    ),
  },
  {
    title: "Fast Turnaround",
    description: "Quick delivery without compromising on quality and attention to detail.",
    icon: (
      <>
        <circle cx="16" cy="16" r="12" />
        <path d="M16 9v7l5 3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Custom Design",
    description: "Professional design services to match your brand and business requirements.",
    icon: (
      <>
        <path d="M16 5a11 11 0 100 22c1.7 0 2-1 1.2-2-.7-.9-.2-2 1-2h2a4 4 0 004-4c0-7.7-3.9-14-8.2-14z" />
        <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="17" cy="11" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="21" cy="15" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee on all our printing services and products.",
    icon: (
      <>
        <path d="M16 4l10 4v7c0 7-4.5 11.5-10 13-5.5-1.5-10-6-10-13V8z" />
        <path d="M12 16l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-paper-muted py-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-amber">
          Why Choose Us
        </p>
        <h2 className="mt-4 font-sans text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Why Choose Arjun Printing Press?
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 text-left sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-black/5 bg-paper p-8 shadow-sm"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-ink"
              >
                {feature.icon}
              </svg>
              <h3 className="mt-6 font-heading text-xl font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="mt-3 text-base text-ink/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
